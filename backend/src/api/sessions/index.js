const { Router } = require('express');

const router = new Router();

const sessionController = require('./sessionController');

const codeController = require('./codeController.js');

// get requests
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} sessions get-all-sessions
 * @apiDescription récupère l'ensemble des sessions disponibles
 * @apiName get-all-sessions
 * @apiGroup Session
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {array[Session]} sessions array contenant les sessions
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "sessions": [session1, session2, ...]
  }
 *
 * @apiError (401) There are no sessions
 */
router.get('/', sessionController.findAll);
router.get('/:hash', sessionController.findOne);

router.get('/users/:hash', codeController.findAllUsersOfSession);
router.get('/code/:hash', codeController.findUserSessionInfo);
router.get('/code/:hash/:username', codeController.findUserCode);

// post requests
router.post('/', sessionController.create);

// put requests
router.put('/user/:hash', sessionController.insertNewUser);

router.put('/code/:hash', codeController.updateCodeInSession);

// delete requests
router.delete('/:hash', sessionController.delete);
router.delete('/:hash/user', sessionController.removeUser);

module.exports = router;
