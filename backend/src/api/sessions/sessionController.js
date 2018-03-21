const Session = require('./sessionModel');

module.exports = {};

module.exports.findAll = (req, res) => {
  console.log('Retrieving all sessions');
  Session.find({}, (err, sessions) => {
    if (err) {
      return res.send(err);
    }
    if (!sessions) {
      return res.status(401)
        .send({
          success: false,
          message: 'There are no sessions',
        });
    }
    return res.send({
      success: true,
      sessions,
    });
  });
}; // findAll

module.exports.findOne = (req, res) => {
  Session.findOne(
    { hash: req.params.hash },
    (err, session) => {
      if (err) {
        return res.send(err);
      }
      if (!session) {
        return res.status(401)
          .send({
            success: false,
            message: 'Session does not exist',
          });
      }
      return res.send({
        success: true,
        session,
      });
    },
  );
}; // findOne

module.exports.create = (req, res) => {
  console.log(`Creating session with user, having this username: ${req.user.username}`);
  //  const result = {};
  const {
    username, role, nom, prenom, email,
  } = req.user;

  const session = new Session({
    creator: {
      username, role, nom, prenom, email,
    },
    users: [{
      user: {
        username,
        role,
        nom,
        prenom,
        email,
      },
    }],
    name: req.body.sessionName || '',
  });
  session.save((err) => {
    if (err) {
      return res.send(err);
    }

    /*
    result.hash = session.hash;
    result.creator = session.creator;
    result.created = session.created;
    result.name = session.name;
    result.users = session.users;
    */
    return res.send({
      success: true,
      result: session,
    });
  });
}; // create

module.exports.insertNewUser = (req, res) => {
  console.log(`Inserting new user ${req.user.username} in session ${req.params.hash} if not already present`);
  const {
    username, role, nom, prenom, email,
  } = req.user;
  const result = {};

  Session.findOne({ hash: req.params.hash }, (err, session) => {
    if (err) {
      return res.send(err);
    }
    if (!session) {
      return res.send({
        success: false,
        message: 'Session does not exist',
      });
    }
    result.hash = session.hash;
    result.creator = session.creator;
    result.created = session.created;
    result.name = session.name;

    result.users = [];
    session.users.forEach((usr) => {
      if (usr.user.username === req.user.username) {
        result.code = {
          hmtl: usr.html,
          css: usr.css,
          js: usr.js,
        };
      }
      return result.users.push(usr.user);
    });

    if (!result.code) {
      return Session.findOneAndUpdate(
        { hash: req.params.hash },
        {
          $push: {
            users: {
              user: {
                username,
                role,
                nom,
                prenom,
                email,
              },
            },
          },
        },
        (err2, session2) => {
          if (err2) {
            return res.send(err2);
          }
          if (!session2) {
            return res.send({
              success: false,
              message: 'Session does not exist',
            });
          }
          result.code = {
            html: '',
            css: '',
            js: '',
          };
          result.users.push({
            username,
            role,
            nom,
            prenom,
            email,
          });
          return res.send({
            success: true,
            result,
          });
        },
      );
    }
    return res.send({
      success: true,
      result,
    });
  });
}; // insertNewUser

module.exports.removeUser = (req, res) => {
  const {
    username, role, nom, prenom, email,
  } = req.user;
  Session.update(
    { hash: req.params.hash },
    {
      $pull: {
        users: {
          user: {
            username,
            role,
            nom,
            prenom,
            email,
          },
        },
      },
    },
    { runValidators: true },
    (err) => {
      if (err) {
        return res.send(err);
      }
      return res.send({
        success: true,
        user: {
          username,
          role,
          nom,
          prenom,
          email,
        },
      });
    },
  );
}; // removeUser

module.exports.delete = (req, res) => {
  Session.deleteOne(
    { hash: req.params.hash },
    (err) => {
      if (err) {
        return res.send(err);
      }
      return res.send({
        success: true,
        message: 'session supprimée',
      });
    },
  );
}; // delete
