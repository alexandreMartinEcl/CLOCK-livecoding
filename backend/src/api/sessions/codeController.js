const Session = require('./sessionModel');
const fs = require('fs');
// const archiver = require('archiver');
const cp = require('child_process');

module.exports = {};

module.exports.findAllUsersOfSession = (req, res) => {
  Session.find({ hash: req.params.hash }, (err, session) => {
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
    const users = session.users.map(obj => obj.user);
    return res.send({
      success: true,
      users,
    });
  });
}; // findAllUsersOfSession

module.exports.findUserSessionInfo = (req, res) => {
  console.log(`Getting all info relative to user ${req.user.username} in session ${req.params.hash}`);
  const result = {};
  Session.find({ hash: req.params.hash }, (err, session) => {
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
    return res.send({
      success: true,
      result,
    });
  });
}; // findUserSessionInfo

module.exports.findUserCode = (req, res) => {
  console.log(`Getting code from ${req.params.username} for user ${req.user.username} in session ${req.params.hash}`);
  const result = {};
  Session.find({ hash: req.params.hash }, (err, session) => {
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
    result.success = true;

    session.users.forEach((usr) => {
      if (usr.user.username === req.params.username) {
        result.user = usr;
      }
    });
    return res.send({
      success: true,
      result,
    });
  });
}; // findUserSessionInfo

module.exports.updateCodeInSession = (req, res) => {
  console.log(`Updating the code for user ${req.user.username} in session ${req.params.hash}`);
  const { html, css, js } = req.body;
  let updatedUsers = {};
  Session.find({ hash: req.params.hash }, (err, session) => {
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

    updatedUsers = session.users.map((userWithCode) => {
      if (userWithCode.user.username === req.user.username) {
        const newUserWithCode = Object.assign({}, userWithCode);
        newUserWithCode.html = html;
        newUserWithCode.css = css;
        newUserWithCode.js = js;
        return newUserWithCode;
      }
      return userWithCode;
    });

    return Session.findOneAndUpdate(
      { hash: req.params.hash },
      { $set: { users: updatedUsers } },
      { new: true },
      (err2, session2) => {
        if (err2) {
          return res.send(err2);
        }
        if (!session2) {
          return res.status(401)
            .send({
              success: false,
              message: 'Session does not exist',
            });
        }
        return res.send({
          success: true,
        });
      },
    );
  });
}; // updateCodeInSession

module.exports.downloadUserCode = (req, res) => {
  console.log(`Downloading the code for user ${req.user.username} in session ${req.params.hash}`);
  const { html, css, js } = req.body;

  // build filename
  const dt = new Date();
  const fileName = `${dt.getFullYear()}_${(dt.getMonth() + 1)}_${dt.getDate()}_${req.params.hash}_${req.user.username}`;

  // function that will write the files down in temp folder before zippping
  const writeFile = (newFileName, extension, str) => fs.writeFile(`/tmp/${newFileName}/${newFileName}.${extension}`, str, (err) => { // eslint-disable-line
  // need to disable next line because this fucker won't understand
  // that I don't want to return anything on success
    if (err) {
      return res.status(400)
        .send({
          success: false,
          message: 'Failure while building zip archive',
        });
    }
    console.log(`The file ${newFileName}.${extension} was saved!`);
  }); // writeFile

  const baseHtmlTemplate = '<!doctype html>\n' +
    '<html>\n\t' +
    '<head>\n\t\t' +
    '<meta charset="utf-8">\n\t\t' +
    '<title>Test</title>\n\t' +
    '</head>\n\t' +
    '<body>\n\t\t' +
    '\n\t' +
    '</body>\n' +
    '</html>';
  const htmlFile = baseHtmlTemplate.replace('\n\t</body>', `${html.replace('\n', '\n\t\t')}\n\t</body>`);
  htmlFile.replace('</head>\n\t', `<link rel="stylesheet" href="./${fileName}.css" />\n\t</head>\n\t`);
  htmlFile.replace('</head>\n\t', `<script src="./${fileName}.js"></script>\n\t</head>\n\t`);

  writeFile(fileName, 'html', htmlFile);
  writeFile(fileName, 'css', css);
  writeFile(fileName, 'js', js);

  // delete folder once the deed is done
  cp.exec(`rm -Rf /tmp/${fileName}`);
}; // downloadUserCode
