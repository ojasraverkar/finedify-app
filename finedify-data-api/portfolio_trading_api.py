from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import yfinance as yf
import sqlite3

app = FastAPI()

# --- Models ---
class Trade(BaseModel):
    ticker: str
    action: str  # 'buy' or 'sell'
    quantity: int
    price: float
    brokerage: float

class PortfolioItem(BaseModel):
    ticker: str
    quantity: int
    buy_price: float
    invested: float

class Transaction(BaseModel):
    ticker: str
    action: str
    quantity: int
    price: float
    date: str
    brokerage: float

# --- Database Setup ---
DB_PATH = 'portfolio_trading.db'

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# --- API Endpoints ---
@app.get('/api/stocks/quote')
def get_stock_quote(ticker: str):
    stock = yf.Ticker(ticker)
    data = stock.history(period='1d')
    if data.empty:
        raise HTTPException(status_code=404, detail='Ticker not found')
    price = data['Close'].iloc[-1]
    return {'ticker': ticker, 'price': price}

@app.get('/api/stocks/history')
def get_stock_history(ticker: str, range: str = '1mo'):
    stock = yf.Ticker(ticker)
    data = stock.history(period=range)
    if data.empty:
        raise HTTPException(status_code=404, detail='Ticker not found')
    return data.reset_index().to_dict(orient='records')

@app.get('/api/indices')
def get_indices():
    indices = {'NIFTY 50': '^NSEI', 'SENSEX': '^BSESN', 'BankNifty': '^NSEBANK'}
    result = {}
    for name, symbol in indices.items():
        stock = yf.Ticker(symbol)
        data = stock.history(period='1d')
        result[name] = float(data['Close'].iloc[-1]) if not data.empty else None
    return result

@app.get('/api/portfolio')
def get_portfolio():
    conn = get_db()
    items = conn.execute('SELECT * FROM portfolio').fetchall()
    return [dict(row) for row in items]

@app.post('/api/portfolio/add')
def add_to_portfolio(item: PortfolioItem):
    conn = get_db()
    conn.execute('INSERT INTO portfolio (ticker, quantity, buy_price, invested) VALUES (?, ?, ?, ?)',
                 (item.ticker, item.quantity, item.buy_price, item.invested))
    conn.commit()
    return {'status': 'added'}

@app.post('/api/trade')
def trade_stock(trade: Trade):
    # Simulate buy/sell, update portfolio and transaction history
    conn = get_db()
    # Brokerage calculation
    brokerage = trade.brokerage
    # Update portfolio
    if trade.action == 'buy':
        conn.execute('INSERT INTO portfolio (ticker, quantity, buy_price, invested) VALUES (?, ?, ?, ?)',
                     (trade.ticker, trade.quantity, trade.price, trade.quantity * trade.price + brokerage))
    elif trade.action == 'sell':
        conn.execute('DELETE FROM portfolio WHERE ticker = ?', (trade.ticker,))
    # Add transaction
    conn.execute('INSERT INTO transactions (ticker, action, quantity, price, date, brokerage) VALUES (?, ?, ?, ?, DATE("now"), ?)',
                 (trade.ticker, trade.action, trade.quantity, trade.price, brokerage))
    conn.commit()
    return {'status': 'trade completed'}

@app.get('/api/transactions')
def get_transactions():
    conn = get_db()
    txns = conn.execute('SELECT * FROM transactions ORDER BY date DESC').fetchall()
    return [dict(row) for row in txns]

@app.get('/api/analytics')
def get_analytics():
    # Dummy analytics, implement real logic as needed
    return {
        'performance_vs_nifty': 0.05,
        'daily_returns': [],
        'weekly_returns': [],
        'volatility': 0.12,
        'sharpe_ratio': 1.1
    }

@app.get('/api/export')
def export_portfolio():
    # Export portfolio and transactions to CSV
    import pandas as pd
    conn = get_db()
    portfolio = conn.execute('SELECT * FROM portfolio').fetchall()
    transactions = conn.execute('SELECT * FROM transactions').fetchall()
    pf_df = pd.DataFrame([dict(row) for row in portfolio])
    tx_df = pd.DataFrame([dict(row) for row in transactions])
    pf_csv = pf_df.to_csv(index=False)
    tx_csv = tx_df.to_csv(index=False)
    return {'portfolio_csv': pf_csv, 'transactions_csv': tx_csv}
