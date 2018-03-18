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
  console.log(`Creating session with user, having this email: ${req.user.username}`);
  const userName = req.user.username;
  const userRole = req.user.role;
  const userNom = req.user.nom;
  const userPrenom = req.user.prenom;
  const userEmail = req.user.email;

  const session = new Session({
    creator: {
      userName, userRole, userNom, userPrenom, userEmail,
    },
  });
  session.save((err) => {
    if (err) {
      return res.send(err);
    }
    return res.send({
      success: true,
      session,
    });
  });
}; // create

module.exports.insertNewUser = (req, res) => {
  const userName = req.user.username;
  const userRole = req.user.role;
  const userNom = req.user.nom;
  const userPrenom = req.user.prenom;
  const userEmail = req.user.email;

  Session.update(
    { hash: req.params.hash },
    {
      $push: {
        users: {
          user: {
            userName,
            userRole,
            userNom,
            userPrenom,
            userEmail,
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
          username: userName,
          role: userRole,
          nom: userNom,
          prenom: userPrenom,
          email: userEmail,
        },
      });
    },
  );
}; // inseertNewUser

module.exports.removeUser = (req, res) => {
  const userName = req.user.username;
  const userRole = req.user.role;
  const userNom = req.user.nom;
  const userPrenom = req.user.prenom;
  const userEmail = req.user.email;
  Session.update(
    { hash: req.params.hash },
    {
      $pull: {
        users: {
          user: {
            userName,
            userRole,
            userNom,
            userPrenom,
            userEmail,
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
          username: userName,
          role: userRole,
          nom: userNom,
          prenom: userPrenom,
          email: userEmail,
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
