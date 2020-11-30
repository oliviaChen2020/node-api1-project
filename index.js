const express = require('express');

const shortid = require('shortid');

const server = express();

// configure our server (PLUG FUNCTIONALITY)
server.use(express.json()); // adds the ability to read the body of the request as JSON

// fake data, all users in an Array

let users = [
  {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: 'Jane Doe', // String, required
    bio: "Not Tarzan's Wife, another Jane", // String, required
  },
];

// endpoints coding starts here

// POST request to '/api/users, save new user to the db, code status 400/201

// GET request to '/api/users, fetching all users from the db status code 500

// GET request '/api/users/:id fetching a user with their unique id

// DELETE request '/api/users/:id' to delete a user with their unique id status code 500

//PUT request '/api/users/:id' to update a user with their unique id status code 500

server.listen(5000, () => {
  console.log('listening on port 5000');
});
