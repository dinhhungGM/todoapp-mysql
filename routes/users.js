const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const verifyToken = require("../middlewares/verifyToken");

router.get("/",  verifyToken, usersController.getAllUsers);

module.exports = router
