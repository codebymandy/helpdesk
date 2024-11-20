const express = require("express");
const {createTicket , getTickets} = require("../controllers/TicketController");
const {protect} = require("../middleware/sing_auth")
const router = express.Router();
router.post("/create", protect, createTicket);
router.get("/get" ,protect, getTickets);
module.exports = router;