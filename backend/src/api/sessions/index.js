const { Router } = require('express');

const router = new Router();

const sessionController = require('./sessionController');

const codeController = require('./codeController.js');

// get requests
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} /sessions get-all-sessions
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
 * @api {get} /sessions/:hash get-one-session
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

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} /sessions/users/:hash get-all-users-of-session
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
 * @apiSuccess {array[userSchema]} arrayUsers array des users de la sesison
 * @apiSuccessExample {json} Success-Response:
 *{
    "success": true,
    "result": [userSchema, userSchema ...]
}
 *
 * @apiError (401) session session does not exist
 */
router.get('/users/:hash', codeController.findAllUsersOfSession);

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {get} /sessions/code/:hash find-use-session-info
 * @apiDescription récupère les informations des users de la session
 * @apiName find-use-session-info
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
 * @api {get} /sessions/code/:hash/:username get-user-code
 * @apiDescription récupère les informations d'un utilisateur d'une session
 * @apiName get-user-code
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
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {post} /sessions create-session
 * @apiDescription Création d'une session
 * @apiName create-session
 * @apiGroup Session
 * @apiSuccess {Boolean} succes succès
 * @apiSuccess {sessionSchema} result l'objet session créé
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "result": {
        "creator": {
            "username": "lhulot",
            "role": "etudiant",
            "nom": "Hulot",
            "prenom": "Louis",
            "email": "louishulot@hotmail.fr",
            "_id": "5aba4faee534b8001826eaf1"
        },
        "users": [
            {
                "user": {
                    "username": "lhulot",
                    "role": "etudiant",
                    "nom": "Hulot",
                    "prenom": "Louis",
                    "email": "louishulot@hotmail.fr",
                    "_id": "5aba4faee534b8001826eaf2"
                },
                "html": "",
                "css": "",
                "js": "",
                "_id": "5aba4faee534b8001826eaf3"
            }
        ],
        "name": "",
        "hash": "MGTdcB",
        "created": "2018-03-27T12:46:59.307Z",
        "_id": "5aba4faee534b8001826eaf4",
        "__v": 0
    }
}
 */
router.post('/', sessionController.create);

// put requests
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {put} /session/user/:hash insert-new-user
 * @apiDescription insertion d'un nouvel utilisteur pour la session
 * @apiName insert-new-user
 * @apiGroup Session
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {object} result objet contenant : hash, creator, created, name, users, code
 * @apiSuccess {String} result.hash hash code de la session
 * @apiSuccess {userSchema} result.creator créateur de la session
 * @apiSuccess {date} result.created date de création de la session
 * @apiSuccess {String} result.name nom de la session
 * @apiSuccess {array[userSchme]} result.users array des users de la session
 * @apiSuccess {array[String]} result.code array contenant les codes de l'utilisateur courant
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "result": {
        "hash": "zqEkPX",
        "creator": {userSchema},
        "created": "2018-03-22T08:18:23.095Z",
        "name": "CLOCK sa mère",
        "users": [userSchema, userSchema ...],
        "code": {
            "html": "<html>\n  <p>\n      Eloïse arrêtes tes bêtises\n  </p>\n</html>\n\n",
            "css": "p {\n  color: green;\n}",
            "js": ""
        }
    }
}
 *
 * @apiError (401) session session does not exist
 */
router.put('/user/:hash', sessionController.insertNewUser);

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {put} /session/code/:hash update-code-in-session
 * @apiDescription mise à jour du code de l'utilisateur
 * @apiName update-code-in-session
 * @apiGroup Session
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {object} result objet contenant : hash, creator, created, name, users, code
 * @apiSuccess {String} result.hash hash code de la session
 * @apiSuccess {userSchema} result.creator créateur de la session
 * @apiSuccess {date} result.created date de création de la session
 * @apiSuccess {String} result.name nom de la session
 * @apiSuccess {array[userSchme]} result.users array des users de la session
 * @apiSuccess {array[String]} result.code array contenant les codes de l'utilisateur courant
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "result": {
        "hash": "zqEkPX",
        "creator": {userSchema},
        "created": "2018-03-22T08:18:23.095Z",
        "name": "CLOCK sa mère",
        "users": [userSchema, userSchema ...],
        "code": {
            "html": "<html>\n  <p>\n      Eloïse arrêtes tes bêtises\n  </p>\n</html>\n\n",
            "css": "p {\n  color: green;\n}",
            "js": ""
        }
    }
}
 *
 * @apiError (401) session session does not exist
 */
router.put('/code/:hash/:username', codeController.updateCodeInSession);

// delete requests
/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {delete} /session/:hash delete-session
 * @apiDescription Supression session
 * @apiName delete-session
 * @apiGroup Session
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {String} message message de succès
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "result": 'session supprimée'
}
 *
 * @apiError (401) session session does not exist
 */
router.delete('/:hash', sessionController.delete);

/**
 * @apiVersion 1.0.0-SNAPSHOT
 * @api {delete} /session/:hash/user delete-user-in-session
 * @apiDescription Supression utilisateur
 * @apiName delete-user-in-session
 * @apiGroup Session
 * @apiHeader {String} Authorization JWT token
 * @apiHeaderExample {json} Header-Example:
 * {
 * "Authorization":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTZmMDlkYzM1YmZkZTBm"
 * }
 * @apiParam {String} hash hash code de la session
 * @apiSuccess {Boolean} success succès
 * @apiSuccess {userSchemea} user utilisateur supprimé
 * @apiSuccessExample {json} Success-Response:
 * {
    "success": true,
    "result": [userDeleted]
}
 *
 * @apiError (401) session session does not exist
 */
router.delete('/:hash/user', sessionController.removeUser);

module.exports = router;
