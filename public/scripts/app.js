// wait for DOM to load before running JS
$(document).ready(function() {

	var app = new App();
  app.setup();
  // app.getTodos();


});

function App(){
}

App.prototype.setup = function () {
    // base API route
    this.baseUrl = '/api/todos';

    // array to hold todo data from API
    this.allTodos = [];

    // element to display list of todos
    this.$todosList = $('#todos-list');

    // form to create new todo
    this.$createTodo = $('#create-todo');
    var self = this;
    this.$createTodo.on('submit', function (event) {
      self.createTodoClicked(event);
    });

    // compile handlebars template
    this.source = $('#todos-template').html();
    this.template = Handlebars.compile(this.source);


    this.getTodos();

};

App.prototype.render = function() {
  // empty existing todos from view
  console.log(this.allTodos);
  this.$todosList.empty();

  // pass `allTodos` into the template function
  var todosHtml = this.template({ todos: this.allTodos });

  // append html to the view
  this.$todosList.append(todosHtml);
};

App.prototype.getTodos = function() {
  // GET all todos on page load
  var self = this;
  $.ajax({
    method: "GET",
    url: this.baseUrl,
    success: function onIndexSuccess(json) {
      console.log(json);

      // set `allTodos` to todo data (json.data) from API
      self.allTodos = json.todos;

      // render all todos to view
      self.render();
    }
  });
};


App.prototype.createTodoClicked = function (event) {
  var self = this;
  event.preventDefault();

  // serialze form data
  var newTodo = $(this.$createTodo).serialize();
  console.log(newTodo);

  // POST request to create new todo
  $.ajax({
    method: "POST",
    url: self.baseUrl,
    data: newTodo,
    success: function onCreateSuccess(json) {
      console.log(json);

      // add new todo to `allTodos`
      self.allTodos.push(json);

      // render all todos to view
      self.render();
    }
  });

  this.$createTodo[0].reset();
  this.$createTodo.find('input').first().focus();

}
