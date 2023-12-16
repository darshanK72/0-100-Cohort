/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const e = require('express');
const path = require('path');
const port = 3000;

function findIndex(arr, id) {
  if (arr.length == 0) {
    return undefined;
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return arr[i];
    }
  }
  return undefined;
}


// console.log(findIndex([{ id: 1 }, { id: 2 }], 3))

const app = express();

// app.listen(port,() => {
//   console.log("Server is running at localhost:3000");
// })


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  fs.readFile(path.join(__dirname, '/todos.json'), (err, data) => {
    if (err) {
      return res.status(404).send('File Not Found');
    }
    else {
      return res.status(200).json(JSON.parse(data));
    }
  })
})

app.get('/todos/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '/todos.json'), (err, data) => {
    if (err) {
      return res.status(404).send('File Not Found');
    }
    else {
      const todos = JSON.parse(data);
      const id = req.params.id;
      const out = findIndex(todos, id);
      if (out === undefined) {
        return res.status(404).send('todo not found');
      }
      else {
        return res.status(200).send(out);
      }
    }
  })
})

app.post('/todos', (req, res) => {

  const todo = {
    id: Math.floor(Math.random() * 10000),
    title: req.body.title,
    description: req.body.description
  }

  fs.readFile(path.join(__dirname, '/todos.json'), (err, data) => {
    if (err) {
      return res.status(404).send('File Not Found');
    }
    else {
      const todos = JSON.parse(data);
      todos.push(todo);

      fs.writeFile(path.join(__dirname, '/todos.json'), JSON.stringify(todos), (err, data) => {
        if (err) {
          return res.status(404).send('File Not Found');
        }
        else {
          return res.status(201).json(todo);
        }
      })
    }
  })
})

app.put('/todos/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '/todos.json'), (err, data) => {
    if (err) {
      return res.status(404).send('File Not Found');
    }
    else {
      const todos = JSON.parse(data);
      const id = req.params.id;
      const body = req.body;

      let out = findIndex(todos, id);

      if (out == undefined) {
        return res.status(404).send('todo not found');
      }
      else {

        const newtodos = todos.map((todo) => {
          if (todo.id == out.id) {
            // console.log(body);
            // console.log(out);
            out = { ...out, ...body };
            // console.log(out);
            return out;
          }
          return todo;
        })

        fs.writeFile(path.join(__dirname, '/todos.json'), JSON.stringify(newtodos), (err, data) => {
          if (err) {
            return res.status(404).send('File Not Found');
          }
          else {
            return res.status(200).json(out);
          }
        })
      }
    }
  })
})


app.delete('/todos/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '/todos.json'), (err, data) => {
    if (err) {
      return res.status(404).send('File Not Found');
    }
    else {
      const todos = JSON.parse(data);
      const id = req.params.id;
      const out = findIndex(todos, id);

      if (out == undefined) {
        return res.status(404).send('todo not found');
      }
      else {

        const newtodos = todos.filter((todo) => todo.id != id)

        fs.writeFile(path.join(__dirname, '/todos.json'), JSON.stringify(newtodos), (err, data) => {
          if (err) {
            return res.status(404).send('File Not Found');
          }
          else {
            return res.status(200).json(out);
          }
        })
      }
    }
  })
})


module.exports = app;