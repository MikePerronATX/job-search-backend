const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/jobs', async (req, res) => {
  const search = req.query.search || '';
  const location = req.query.location || '';

  try {
    const response = await axios.get(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(
        search
      )}`
    );

    // Filter jobs manually by location (case-insensitive)
    const filteredJobs = response.data.jobs.filter((job) =>
      job.candidate_required_location
        .toLowerCase()
        .includes(location.toLowerCase())
    );

    res.json({ jobs: filteredJobs });
  } catch (error) {
    console.error('Error fetching from Remotive:', error.message);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
