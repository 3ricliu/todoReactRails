var _todo = [],
    _callbacks = [];

var TodoStore = {

  all: function(){
    return _todo;
  },

  fetch: function(){
    $.get("/api/todeauxes", {}, function(todos){
      _todo = todos;
      TodoStore.changed();
    });
  },

  create: function(todo){
    $.post("/api/todeauxes", todo, function(newTodo){
      _todo.push(newTodo);
      TodoStore.changed();
    });
  },

  destroy: function(id){
    // var idx;
    // for(var i = 1; i < _todo.length; i++){
    //   if(id === i) {
    //     idx = i;
    //     break;
    //   }
    // }
    // if(!idx){return;}

    $.ajax({
      url: ("/api/todeauxes/" + id),
      type: 'DELETE',
      headers: {"Id": id},
      success: (function(dId) {
        // debugger;
        _todo.splice(dId.id-1, 1);
        TodoStore.changed();
      })
    });

    // $.delete(("/api/todeauxes/" + id), id, function(dId) {
    //   _todo.splice(dId, 1);
    //   TodoStore.changed();
    // });
  },

  toggleDone: function(id) {
    // var idx;
    // for(var i = 1; i < _todo.length; i++){
    //   if(id === i) {
    //     idx = i;
    //     break;
    //   }
    // }
    // if(!idx){return;}


    $.ajax({
      url: ("/api/todeauxes/" + id + '?' + $.param({"done" : true})),
      type: 'PATCH',
      headers: {"Id": id, "done": true},
      success: (function(uId) {
        // debugger;
        _todo[uId.id - 1]['done'] = true;
        TodoStore.changed();
      })
    });


    /// need to have update/patch request
  },
  addChangedHandler: function(cb) {
    _callbacks.push(cb);
  },
  removeChangedHandler: function(cb) {
    var idx;
    for (var i = 0; i < _callbacks.length; i++) {
      if (cb === _callbacks[i]) {
        idx = i;
        break;
      }
    }

    if(!idx){return;}

    _callbacks.splice(idx, 1);
  },

  changed: function(){
    _callbacks.forEach (function(cb){
      cb();
    });
  }
};

module.exports = TodoStore;
