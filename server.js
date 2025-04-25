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

  // Optional agent to fix strict SSL issues
  const agent = new https.Agent({ rejectUnauthorized: false });

  try {
    const response = await axios.get(
      `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(
        search
      )}`,
      { httpsAgent: agent }
    );
    res.json({ jobs: response.data.jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
