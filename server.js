// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Homework', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  var search = req.query.q;
  var array = [];
  todos.forEach(function (currentValue, index) {
    if (currentValue.task == search) {
      array.push(currentValue);
    }
  });
  res.send({todos: array});
});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var myTodo = req.body;
  var newID = todos.length + 1;
  myTodo._id = newID;
  todos.push(myTodo);
  res.json(myTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  var myID = req.params.id;
  todos.forEach(function (currentValue, index) {
    if (currentValue._id == myID) {
      res.json(currentValue);
    }
  });
});

app.put('/api/todos/:id', function update(req, res) {
  var myID = req.params.id;
  var myBody = req.body;
  todos.forEach(function (currentValue, index) {
    if (currentValue._id == myID) {
      myBody._id = parseInt(myID);
      todos[index] = myBody;
      res.json(myBody);
    }
  });
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var myID = req.params.id;
  todos.forEach(function (currentValue, index) {
    if (currentValue._id == myID) {
      todos.splice(index, 1);
      res.json(currentValue);
    }
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
