const UserSchema = new mongoose.Schema({ name: String, phone: String, location: String, isWorker: { type: Boolean, default: false }, rating: { type: Number, default: 0 }, jobsCompleted: { type: Number, default: 0 }, createdAt: { type: Date, default: Date.now } });

module.exports = mongoose.model('User', UserSchema);
