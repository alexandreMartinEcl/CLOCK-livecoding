const { Router } = require('express');

const router = new Router();

const sessionController = require('./sessionController');

const codeController = require('./codeController.js');

// get requests
router.get('/', sessionController.findAll);
router.get('/:hash', sessionController.findOne);

router.get('/users/:hash', codeController.findAllUsersOfSession);
router.get('/code/:hash', codeController.findUserSessionInfo);
router.get('/code/:hash/:username', codeController.findUserCode);
router.get('/download/:hash/:username', codeController.downloadUserCode);

// post requests
router.post('/', sessionController.create);

// put requests
router.put('/user/:hash', sessionController.insertNewUser);

router.put('/code/:hash', codeController.updateCodeInSession);

// delete requests
router.delete('/:hash', sessionController.delete);
router.delete('/:hash/user', sessionController.removeUser);

module.exports = router;
