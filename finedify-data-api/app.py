# finedify-data-api/app.py
import streamlit as st
import yfinance as yf

# Get the stock symbol from the URL query parameters (e.g., ?symbol=RELIANCE)
symbol = st.query_params.get("symbol")

if not symbol:
    st.json({"error": "Please provide a stock symbol in the URL. e.g., ?symbol=TCS"})
else:
    try:
        # Append .NS for National Stock Exchange stocks
        stock = yf.Ticker(f"{symbol.upper()}.NS")
        info = stock.info
        
        # Check if we got valid data
        if not info or 'currentPrice' not in info:
            st.json({"error": f"Invalid symbol or no data available for {symbol}.NS"})
        else:
            # Extract only the data we need and return it as JSON
            quote = {
                "symbol": info.get('symbol', 'N/A'),
                "name": info.get('shortName', 'N/A'),
                "price": info.get('currentPrice', 0)
            }
            st.json(quote)
            
    except Exception as e:
        st.json({"error": str(e)})