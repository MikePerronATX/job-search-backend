// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/jobs', async (req, res) => {
  const search = req.query.search || '';
  const location = req.query.location || '';

  try {
    const response = await axios.get(
      `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(search)}`
    );
    let jobs = response.data.jobs;

    // Only try to filter if jobs actually exist
    if (location && jobs && jobs.length > 0) {
      jobs = jobs.filter(
        (job) =>
          job.candidate_required_location &&
          job.candidate_required_location
            .toLowerCase()
            .includes(location.toLowerCase())
      );
    }

    res.json({ jobs });
  } catch (error) {
    console.error(
      'Error in /jobs route:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
