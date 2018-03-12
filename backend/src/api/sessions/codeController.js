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

module.exports.findUserSessionInfo = (req, res) => {
  console.log(`Getting all info relative to user ${req.params.userid} in session ${req.params.hash}`);
  const result = {};
  Session.find({ hash: req.params.hash }, (err, session) => {
    if (err) {
      return res.send(err);
    }
    result.users = [];
    return session[0].users.map((usr) => {
      if (usr.user.userid === req.params.userid) {
        result.code = {
          hmtl: usr.html,
          css: usr.css,
          js: usr.js,
        };
      }
      return result.users.push(usr.user);
    });
  });
  return res.send(result);
}; // findUserSessionInfo

module.exports.putNewCodeForUserWithinSession = (req, res) => {
  let usersUpdate = {};
  Session.find({ hash: req.params.hash }, (err, session) => {
    if (err) {
      return res.send(err);
    }
    usersUpdate = Object.assign({}, session);
    return usersUpdate.users.map((obj) => {
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
