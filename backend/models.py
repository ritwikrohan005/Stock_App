import pandas as pd

class StockData:
    def __init__(self, csv_path):
        """
        Initialize the StockData class by loading the CSV file into a pandas DataFrame.
        """
        self.data = pd.read_csv(csv_path)
        self.data['date'] = pd.to_datetime(self.data['date'])

    def list_all(self):
        """
        Return all stock data as a list of dictionaries.
        """
        return self.data.to_dict(orient='records')

    def get_asset(self, asset):
        """
        Filter and return data for a specific asset.
        """
        # filtered_data = self.data[self.data['asset'] == asset]
        self.data['asset'] = self.data['asset'].str.strip()
        filtered_data = self.data[self.data['asset'].str.lower() == asset.lower()]

        return filtered_data.to_dict(orient='records')

    def calculate_cumulative_returns(self, asset, start_date, end_date):
        """
        Calculate and return cumulative returns for a specific asset within a date range.
        """
        filtered_data = self.data[(self.data['asset'] == asset) &
                                  (self.data['date'] >= start_date) &
                                  (self.data['date'] <= end_date)]
        filtered_data['cumulative_return'] = filtered_data['close_usd'].pct_change().cumsum()
        return filtered_data.to_dict(orient='records')
