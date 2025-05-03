const express = require('express'); const dotenv = require('dotenv'); const connectDB = require('./config/db'); const jobRoutes = require('./routes/jobRoutes'); const bidRoutes = require('./routes/bidRoutes');

dotenv.config(); connectDB();

const app = express(); app.use(express.json());

app.use('/api/jobs', jobRoutes); app.use('/api/bids', bidRoutes);

const PORT = process.env.PORT || 5000; app.listen(PORT, () => console.log(Server running on port $ {PORT}));