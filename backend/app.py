from flask import Flask, jsonify, request
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

from models import StockData

stock_data = StockData('C:/Users/premv/Stock-app/backend/stock-data.csv')

@app.route('/stocks', methods=['GET'])
def list_stocks():
    """
    Endpoint to list all stock data.
    """
    return jsonify(stock_data.list_all())

@app.route('/stocks/<string:asset>', methods=['GET'])
def get_stock(asset):
    """
    Endpoint for getting details of a specific stock.
    """
    return jsonify(stock_data.get_asset(asset))

@app.route('/stocks/<string:asset>/returns', methods=['GET'])
def calculate_returns(asset):
    """
    Endpoint for calculating the cumulative returns for a stock in the date range.
    """
    start_date = request.args.get('start_date')
    
    end_date = request.args.get('end_date')

    return jsonify(stock_data.calculate_cumulative_returns(asset, start_date, end_date))

if __name__ == '__main__':
    app.run(debug=True)

