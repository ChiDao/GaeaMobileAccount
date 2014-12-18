var clients = [
    { id: '1', name: '刀塔传奇', clientId: 'abc123', clientSecret: 'ssh-secret' },
    { id: '2', name: '自由之战', clientId: 'xyz123', clientSecret: 'ssh-password' }
];


exports.find = function(id, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.id === id) {
      return done(null, client);
    }
  }
  return done(null, null);
};

exports.findByClientId = function(clientId, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.clientId === clientId) {
      return done(null, client);
    }
  }
  return done(null, null);
};
