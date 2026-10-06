const express = require("express");

const router = express.Router();

const {
    getUser,
    postUser
} = require("../controllers/userController");


// ==========================================
// GET ALL USERS
// ==========================================

router.get("/getUser", getUser);


// ==========================================
// CREATE USER
// ==========================================

router.post("/postUser", postUser);


module.exports = router;