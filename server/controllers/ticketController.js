const Ticket = require('../models/Ticket');
exports.createTicket = async (req, res) => {
    try {
      const {  description, status, priority, type } = req.body;
     console.log(req.user._id);
      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: "User information is missing" });
      }
     
      const newTicket = new Ticket({

        description,
        status,
        priority,
        type,
        createdBy: req.user._id,
      });
  
      const ticket = await newTicket.save();
      res.status(201).json(ticket);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.getTickets = async (req, res) => {
  try {
    console.log(req.user._id,"id");
    const tickets = await Ticket.find({createdBy:req.user._id}).populate("createdBy", "name").sort({ createdAt: -1 });
    console.log(tickets);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};