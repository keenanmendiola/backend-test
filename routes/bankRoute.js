const router = require("express").Router();
const bankService = require("../services/bankService");

router.post("/withdraw", bankService.withdraw);
router.post("/deposit", bankService.deposit);

module.exports = router;
