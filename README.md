# Tiketku
Tiketku App Backend using React-Native

<h1 align="center">ExpressJS - Tiketku App Backend App RESTfull API</h1>

Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name note, and Import file [note.sql](note.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT = 8282
JWT_KEY = "the secret"

DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""
DB_NAME = "hotelku"
```

## End Point
**1. GET**
* `/v1/hotel`
* `/v1/hotel?search=lorem&sort=ASC&limit=5&page=1`
* `/v1/hotel/:id` (Get note by id)
* `/v1/hotelimg`


**2. POST**
* `/v1/hotel`
    * ``` { "hotel_name": "Hotel Santika", "hotel_location": "Bogor", "hotel_price": 200000 } ```

* `/v1/hotelimg`
    * ``` { "id_hotel": "1", image: "roomsantika1.jpg" } ```

**3. PATCH**
* `/v1/hotel/:id` (Update note by id)
   * ``` { "hotel_name": "Hotel Santika", "hotel_location": "Bogor", "hotel_price": 200000 } ```

**4. DELETE**
* `/v1/hotel/:id` (Delete note by id)
* `/v1/hotelimg/:id` (Delete note by id)
