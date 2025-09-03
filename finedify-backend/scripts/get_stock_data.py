# finedify-backend/scripts/get_stock_data.py
import yfinance as yf
import sys
import json

def get_indian_stock_data(symbol):
    try:
        # Append .NS for National Stock Exchange stocks
        stock = yf.Ticker(f"{symbol.upper()}.NS")
        info = stock.info
        
        # Check if we got valid data
        if not info or 'currentPrice' not in info:
            return {"error": "Invalid symbol or no data available"}

        # Extract only the data we need
        quote = {
            "symbol": info.get('symbol', 'N/A'),
            "name": info.get('shortName', 'N/A'),
            "price": info.get('currentPrice', 0),
            "dayHigh": info.get('dayHigh', 0),
            "dayLow": info.get('dayLow', 0)
        }
        return quote
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Get the stock symbol from the command-line argument
    stock_symbol = sys.argv[1]
    data = get_indian_stock_data(stock_symbol)
    # Print the data as a JSON string so Node.js can read it
    print(json.dumps(data))