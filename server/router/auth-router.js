const express = require('express');

const router = express.Router();
const authControllers = require('../controllers/auth-controller');
const authMiddleWare = require('../middlewares/auth-middleware')
const { signUpSchema, loginSchema } = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');
// app.get('/', (req, res) => {
//     res.status(200).send('Welcome to mern page');
// });

router.route('/').get(authControllers.home);

router.route('/register').post(validate(signUpSchema), authControllers.register);  //adding validation using zod

router.route('/login').post(validate(loginSchema), authControllers.login);

router.route('/user').get(authMiddleWare, authControllers.user);

module.exports = router;