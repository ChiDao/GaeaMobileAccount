var passport = require('passport');

exports.testGet = function(req, res){
	console.log("get data")
	res.json({data:"get data"});
};

exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.json({state: 'Error', info:info}); }
    if (!user) { return res.json({state: 'User not founcd。', info:info}); }
    return res.json({state: 'Success', info:info});
  })(req, res);
};