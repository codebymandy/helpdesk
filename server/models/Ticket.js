const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
   
    description: { type: String, required: true },
    status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    type: { type: String, enum: ["Bug", "Feature Request", "Support"], default: "Support" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
