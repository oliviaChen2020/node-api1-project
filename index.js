console.log('Hello world!!!!');
const express = require('express');
const port = process.env.PORT || 5000;
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

// helper functions

const User = {
  getUsers() {
    return users;
  },
  getUserById(id) {
    return users.find((user) => user.id === id);
  },
  createNewUser(user) {
    const newUser = { id: shortid.generate(), ...user };
    users.push(newUser);
    return newUser;
  },
  updateUser(id, changes) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      return null;
    } else {
      const update = { id, ...changes };
      users = users.map((u) => {
        if (u.id === id) return update;
        return u;
      });
      return update;
    }
  },
  deleteUser(id) {
    const user = users.find((user) => user.id === id);
    if (user) {
      users = users.filter((u) => u.id !== id);
      console.log(users);
    }
    return user;
  },
};

// GET request all users

server.get('/api/users', (req, res) => {
  const users = User.getUsers();
  res.status(200).json(users);
});

// // GET request '/api/users/:id fetching a user with their unique id

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const user = User.getUserById(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({
      errorMessage: `The user with the specified ID ${id} does not exist.`,
    });
  }
});

// POST request to '/api/users, save new user to the db, code status 400/201

server.post('/api/users', (req, res) => {
  const userFromClient = req.body;
  console.log(userFromClient);
  if (!userFromClient.name || !userFromClient.bio) {
    res
      .status(400)
      .json({ errormessage: 'Please provide name and bio for the user.' });
  } else {
    const newlyCreatedUser = User.createNewUser(userFromClient);
    res.status(201).json(newlyCreatedUser);
  }
});

// DELETE request '/api/users/:id' to remove a user with their unique id

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  const deleted = User.deleteUser(id);
  if (deleted) {
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      message: `The user with the specified ID ${id} does not exist.`,
    });
  }
});

//PUT request '/api/users/:id' to update a user with their unique id status code 500
server.put('/api/users/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  const updatedUser = User.updateUser(id, changes);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({
      message: `The user with the specified ID ${id} does not exist.`,
    });
  }
});

server.get('*', (req, res) => {
  res.status(404).json({ message: 'Page Not found' });
});

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
