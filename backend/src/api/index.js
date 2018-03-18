const { Router } = require('express');
const mongoose = require('mongoose');

const router = new Router();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

/**
 * @api {get} / Hello World
 * @apiName GetHome
 * @apiGroup Static Pages
 * @apiDescription Cette URL affiche un simple message Hello World
 *
 * Il est possible d'écrire des messages sur plusieurs lignes dans la description.
 * @apiSuccessExample {html} Success-Response:
 *     HTTP/1.1 200 OK
 *     Hello, World!
 */
// router.get('/', (req, res) => res.send('Hello, World!'));

/**
 * @api {get} /:name Say hello to a specific name
 * @apiName GetName
 * @apiGroup Static Pages
 * @apiDescription Cette URL affiche un message Hello personnalisé
 *
 * @apiParam  {String} name Nom de la personne à saluer
 * @apiParamExample  {String} Request-Example:
     name: Nymous
 *
 * @apiSuccessExample {html} Success-Response:
     HTTP/1.1 200 OK
     Hello, Nymous!
 */
// router.get('/:name', (req, res) => res.send(`Hello, ${req.params.name}!`));


router.use('/sessions', require('./sessions'));

router.use('/users', (req, res) => {
  console.log(`Retrieving info from user ${req.user.username}`);
  const userName = req.user.username;
  const userRole = req.user.role;
  const userNom = req.user.nom;
  const userPrenom = req.user.prenom;
  const userEmail = req.user.email;

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
});

module.exports = router;
