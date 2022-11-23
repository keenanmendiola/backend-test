const router = require("express").Router();
const authService = require("../services/authService");

router.post("/register", authService.registration);
router.post("/login", authService.login);

module.exports = router;
