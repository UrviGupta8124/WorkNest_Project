const BidSchema = new mongoose.Schema({ job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' }, worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number, createdAt: { type: Date, default: Date.now } });

module.exports = mongoose.model('Bid', BidSchema);
