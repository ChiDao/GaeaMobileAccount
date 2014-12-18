var users = [
    { id: '1', username: 'zakk', password: '123', name: '一韬' },
    { id: '2', username: 'wiki', password: '123', name: '骄阳' },
    { id: '3', username: 'rui', password: '123', name: '何福睿' }
];


exports.find = function(id, done) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.id === id) {
      return done(null, user);
    }
  }
  return done(null, null);
};

exports.findByUsername = function(username, done) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return done(null, user);
    }
  }
  return done(null, null);
};
