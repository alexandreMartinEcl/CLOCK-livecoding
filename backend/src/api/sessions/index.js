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
    "sessions": [sessionSchema, sessionSchema, ...]
  }
 *
 * @apiError (401) session there are no sessions
 */
router.get('/', sessionController.findAll);

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} sessions/:hash get-one-session
 * @apiDescription récupère la session au hash code envoyé
 * @apiName get-one-session
 * @apiGroup Session
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {sessionSchema} session la session demandé
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "session": {
        "created": "2018-03-22T08:18:23.095Z",
        "users": [
            {
                "html": "",
                "css": "",
                "js": "",
                "user": {
                    "_id": "5ab367455813230018e9e8c0",
                    "username": "amartin",
                    "role": "etudiant",
                    "nom": "nom",
                    "prenom": "prenom",
                    "email": "nom.prenom.@gmail.com"
                },
                "_id": "5ab367455813230018e9e8c1"
            }
        ],
        "_id": "5ab367455813230018e9e8c2",
        "creator": {
            "_id": "5ab367455813230018e9e8bf",
            "username": "nom.prenom",
            "role": "etudiant",
            "nom": "nom",
            "prenom": "prenom",
            "email": "nom.prenom@gmail.com"
        },
        "name": "CLOCK sa mère",
        "hash": "zqEtPX",
        "__v": 0
    }
}
 *
 * @apiError (401) session session does not exist
 */
router.get('/:hash', sessionController.findOne);

router.get('/users/:hash', codeController.findAllUsersOfSession);

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} sessions/code/:hash get-all-users-of-session
 * @apiDescription récupère l'ensemble des users d'une sessuib
 * @apiName get-all-users-of-session
 * @apiGroup User
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {result} result object contenant hash, creator, created, name, users, code
 * @apiSuccess {String} result.hash hash code de la session
 * @apiSuccess {userSchema} result.creator objet user du créateur de la session
 * @apiSuccess {date} cresult.reated date de création de la session
 * @apiSuccess {String} result.name nom de la session
 * @apiSuccess {array[usersSchema]} result.usesrs array des userSchema de la session
 * @apiSuccess {code} result.code tableau contenant le cade
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "result": {
        "hash": "zqEkPX",
        "creator": userSchema,
        "created": "2018-03-22T08:18:23.095Z",
        "name": "CLOCK sa mère",
        "users": [userSchema, userSchema, ...],
        "code": {
            "hmtl": "<html>\n  <p>\n      Eloïse arrêtes tes bêtises\n  </p>\n</html>\n\n",
            "css": "p {\n  color: green;\n}",
            "js": ""
        }
    }
}
 *
 * @apiError (401) session session does not exist
 */
router.get('/code/:hash', codeController.findUserSessionInfo);

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} sessions/code/:hash/: get-one-user-of-session
 * @apiDescription récupère les informations d'un utilisateur d'une session
 * @apiName get-all-users-of-session
 * @apiGroup User
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiParam {String} username user name de l'utilisateur dont on veut récuperer les informations
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {object} result objet contenant, result et user
 * @apiSuccess {object} result.user object contenant html, css, js, user
 * @apiSuccess {String} result.user.html code html de l'utilisateur
 * @apiSuccess {String} result.user.js code js de l'utilisateur
 * @apiSuccess {String} result.user.css code css de l'utilisateur
 * @apiSuccess {userSchema} result.user.user userSchema de l'utilisateur
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "result": {
        "success": true,
        "user": {
            "html": "",
            "css": "p {\n  color: red;\n}",
            "js": "",
            "user": {
                "_id": "5ab367455813230018e9e8c0",
                "username": "amartin",
                "role": "etudiant",
                "nom": "Martin",
                "prenom": "Alexandre",
                "email": "alexandre.martin.ecl@gmail.com"
            },
            "_id": "5ab367455813230018e9e8c1"
        }
    }
}
 *
 * @apiError (401) session session does not exist
 */
router.get('/code/:hash/:username', codeController.findUserCode);

// post requests
router.post('/', sessionController.create);

// put requests
router.put('/user/:hash', sessionController.insertNewUser);

// router.put('/code/:hash', codeController.updateCodeInSession);
router.put('/code/:hash/:username', codeController.updateCodeInSession);

// delete requests
router.delete('/:hash', sessionController.delete);
router.delete('/:hash/user', sessionController.removeUser);

module.exports = router;
