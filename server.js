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
    const remotiveResponse = await axios.get(
      `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(search)}`
    );
    const jobsData = remotiveResponse.data;

    if (!jobsData || !Array.isArray(jobsData.jobs)) {
      console.error('Unexpected Remotive API response:', jobsData);
      return res
        .status(500)
        .json({ error: 'Unexpected Remotive API response.' });
    }

    let jobs = jobsData.jobs;

    // Apply location filtering if a location was provided
    if (location) {
      jobs = jobs.filter((job) => {
        const candidateLocation = job.candidate_required_location || '';
        return candidateLocation.toLowerCase().includes(location.toLowerCase());
      });
    }

    res.json({ jobs });
  } catch (error) {
    console.error('Backend error:', error.message);
    if (error.response) {
      console.error('Remotive API error response:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to fetch jobs from Remotive.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
