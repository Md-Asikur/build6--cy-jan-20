const express =require('express');
const categoryCtrl = require('../controllers/categoryCtrl');

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router()

router.route('/category')
  .get(categoryCtrl.getCategories)
  .post(isAuthenticatedUser, categoryCtrl.createCategory)

router.route('/category/:id')
  .patch(isAuthenticatedUser, authorizeRoles("admin"), categoryCtrl.updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), categoryCtrl.deleteCategory)

module.exports= router;