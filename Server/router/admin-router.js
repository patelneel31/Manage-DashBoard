const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../midddlewares/auth-middleware");
const adminMiddleware = require("../midddlewares/admin-middleware");

// Protected routes
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  adminController.getAllUsers
);

router.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  adminController.getUserById
);

router.put(
  "/users/edit/:id",
  authMiddleware,
  adminMiddleware,
  adminController.updateUser
);

router.delete(
  "/users/delete/:id",
  authMiddleware,
  adminMiddleware,
  adminController.deleteUserById
);

router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

module.exports = router;
