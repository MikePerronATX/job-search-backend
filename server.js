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
      `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(search)}`
    );

    let jobs = response.data.jobs;

    // Filter jobs by location if provided
    if (location) {
      jobs = jobs.filter((job) =>
        job.candidate_required_location
          .toLowerCase()
          .includes(location.toLowerCase())
      );
    }

    res.json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
