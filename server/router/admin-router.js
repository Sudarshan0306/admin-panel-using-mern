const express = require('express');
const adminController = require('../controllers/admin-controller');
const authMiddleWare = require('../middlewares/auth-middleware');
const adminMiddleWare = require('../middlewares/admin-middleware');
const router = express.Router();

router.route('/users').get(authMiddleWare, adminMiddleWare, adminController.getAllUsers);
router.route('/users/:id').get(authMiddleWare, adminController.getUserById);
router.route('/users/update/:id').patch(authMiddleWare, adminController.updateUserById);
router.route('/users/delete/:id').delete(authMiddleWare, adminController.deleteUserById);
router.route('/contacts').get(authMiddleWare, adminMiddleWare, adminController.getAllContacts);
router.route('/contacts/delete/:id').delete(authMiddleWare, adminMiddleWare, adminController.deleteContactById);

module.exports = router;