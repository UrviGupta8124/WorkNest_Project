const Job = require('bidding/models/Job'); const User = require('../models/User'); const notifyWorkers = require('../utils/notifyWorkers');

exports.createJob = async (req, res) => { try { const { category, description, budget, location, userId } = req.body; const job = new Job({ category, description, budget, location, createdBy: userId }); await job.save();

// Find nearby and category-matched workers
const workers = await User.find({ isWorker: true, location });
notifyWorkers(workers, job);

res.status(201).json({ message: 'Job posted successfully', job });

} catch (err) { res.status(500).json({ error: 'Failed to post job' }); } };

