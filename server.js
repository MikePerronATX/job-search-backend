const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/jobs', async (req, res) => {
  const search = req.query.search || '';
  try {
    const response = await axios.get(
      `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(search)}`
    );
    res.json({ jobs: response.data.jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
