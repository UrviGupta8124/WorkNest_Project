const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({ category: String, description: String, budget: Number, location: String, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }], assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, status: { type: String, default: 'open' } });

module.exports = mongoose.model('Job', JobSchema);

