const Job = require('bidding/models/Job'); const Bid = require('../models/Bid'); const User = require('../models/User');

exports.placeBid = async (req, res) => { try { const { jobId, workerId, amount } = req.body; const bid = new Bid({ job: jobId, worker: workerId, amount }); await bid.save();

const job = await Job.findById(jobId);
job.bids.push(bid._id);
await job.save();

// Check if worker is new (low rating or jobsCompleted < 3)
const worker = await User.findById(workerId);
const isNew = worker.jobsCompleted < 3;

// Auto assign job if new worker bids lowest
const bids = await Bid.find({ job: jobId }).populate('worker');
const lowestBid = bids.reduce((min, b) => b.amount < min.amount ? b : min, bids[0]);

if (lowestBid.worker.jobsCompleted < 3) {
  job.assignedTo = lowestBid.worker._id;
  job.status = 'assigned';
  await job.save();
}

res.status(201).json({ message: 'Bid placed', bid });

} catch (err) { res.status(500).json({ error: 'Failed to place bid' }); } };

