CRUD application with React.js

CRUD logic completed with react. Adding books to the library with titles and ratings. Data is stored on a local json server and routes tested with Postman.

Technologies used:

- React.js - UI and logic
- Reactstrap and Bootstrap - for styling
- Axios - to complete requests to the server
- Postman - to test our routes and requests
- JSON server - our local database:

  - create your local server by first installing JSON server on your machine:
  - setup instructions are here: https://github.com/typicode/json-server

  1. npm install -g json-server
  2. on your Desktop (or anywhere on your machine) create a file db.json
  3. start json server in terminal with this command: json-server --watch db.json
     - json server will find db.json file, since it was installed globaly. The file can be anywhere.
  4. add info to your db.json file just so you have some data to test GET request (copy paste below info and save it):
     {
     "books": [
     { "id": 1, "title": "Book Name", "rating": "5.5" },
     { "id": 2, "title": "Book Test", "rating": "3.5" }
     ]
     }

  - STARTING THE APPLICATION -

- if you haven't already - start your json server with: json-server --watch db.json

  - open db.json just so you can see the changes when the info is added or removed - pretty cool stuff :)

- Start your React application with yarn start.

* it will ask you to continue to a different localhost, not the 3000, since JSON server is now using the 3000 port
* hit 'y' and then 'enter'
* React application will start and we will see the list of books that are in our database

- go to Postman and in GET request plug in the URL: localhost:3000/books

* you should be able to see the application starting with the list of two books that are in the database.
* from here on, you can test the rest of it's functionality.
