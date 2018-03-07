const Session = require('./sessionModel');

module.exports = {};

module.exports.findAllUsersOfSession = (req, res) => {
  Session.find({ hash: req.params.hash }, (err, session) => {
    if (err) {
      return res.send(err);
    }
    const users = session[0].users.map(obj => obj.user);
    return res.send(users);
  });
}; // findAllUsersOfSession

module.exports.findUserCodeWithinSession = (req, res) => {
  Session.find({ hash: req.params.hash }, (err, session) => {
    if (err) {
      return res.send(err);
    }
    const users = session[0].users.filter(obj => obj.user.lastName === req.params.lastName)[0];
    const result = {
      html: users.html,
      css: users.css,
      js: users.js,
    };
    return res.send(result);
  });
}; // findUserCodeWithinSession

module.exports.putNewCodeForUserWithinSession = (req, res) => {
  let usersUpdate = {};
  Session.find({ hash: req.params.hash }, (err, session) => {
    if (err) {
      return res.send(err);
    }
    usersUpdate = Object.assign({}, session);
    return usersUpdate.users.reduce((obj) => {
      if (obj.user.userid === req.params.userid) {
        const newUserWithCode = Object.assign({}, obj);
        newUserWithCode.html = req.params.code.html;
        newUserWithCode.css = req.params.code.css;
        newUserWithCode.js = req.params.code.js;
        return newUserWithCode;
      }
      return obj;
    });
  });

  Session.findOneAndUpdate(
    { hash: req.params.hash },
    { $set: { users: usersUpdate } },
    { new: true },
    (err, session) => {
      if (err) {
        console.log(err);
      }
      console.log(session);
    },
  );
}; // putNewCodeForUserWithinSession
