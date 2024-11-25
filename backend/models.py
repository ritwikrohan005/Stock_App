import pandas as pd

class StockData:
    def __init__(self, csv_path):
        #  loading csv file
        self.data = pd.read_csv(csv_path)
        self.data['date'] = pd.to_datetime(self.data['date'])

    def list_all(self):
        # Returns complete data as a list of dictionaries.
        return self.data.to_dict(orient='records')

    def get_asset(self, asset):
        # Filters and returns data of a specific asset.
        self.data['asset'] = self.data['asset'].str.strip()
        filtered_data = self.data[self.data['asset'].str.lower() == asset.lower()]
        return filtered_data.to_dict(orient='records')

    def calculate_cumulative_returns(self, asset, start_date, end_date):
        # Calculates the cumulative returns of a specific asset within the given date range.
        filtered_data = self.data[(self.data['asset'].str.strip().str.lower() == asset.lower()) &
                                  (self.data['date'] >= start_date) &
                                  (self.data['date'] <= end_date)]
        filtered_data['cumulative_return'] = filtered_data['close_usd'].pct_change().cumsum()

        filtered_dict = filtered_data.to_dict(orient='records')
        filtered_dict[0]['cumulative_return'] = None
        return filtered_dict
