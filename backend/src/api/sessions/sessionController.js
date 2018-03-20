const Session = require('./sessionModel');

module.exports = {};

module.exports.findAll = (req, res) => {
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
  const {
    username, role, nom, prenom, email,
  } = req.user;

  Session.update(
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
}; // inseertNewUser

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
