# Stock-App
Developed a RESTful API service in Python that simulates interaction with a database through data models and serves financial data to a simple frontend application using  React.

#Backend

**To get all the stocks information use the below URL**

http://127.0.0.1:5000/stocks

**To get the specific asset information use the below URL**

http://127.0.0.1:5000/stocks/{name of the asset}

**for instance:** http://127.0.0.1:5000/stocks/Apple

**To get the cumulative returns use the below URL**
http://127.0.0.1:5000/stocks/{name of the asset}/returns?start_date={mm/dd/yyyy}&end_date={mm/dd/yyyy}
**for instance:** http://127.0.0.1:5000/stocks/Amazon%20Com/returns?start_date=12/1/1999&end_date=12/9/1999

**FrontEnd**
Run npm start command
