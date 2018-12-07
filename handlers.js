let handlers = {};

handlers.home = function (data, callback) {
  callback(200, {'location':'home'});
};

handlers.users = function (data, callback) {
  let methods = ['get', 'post', 'delete', 'put'];

  if(methods.indexOf(data.method) > -1){
    handlers._users[data.method](data, callback);
  }else {
    callback(400);
  }
};


handlers._users = {};

handlers._users.get = function (data, callback) {
  callback(200, {'location': 'users', 'method': 'get'})
}

handlers._users.post = function (data, callback) {
  callback(200, {'location': 'users', 'method': 'post'})
}

handlers.notFound = function (data, callback) {
  callback(404);
};

module.exports = handlers;
