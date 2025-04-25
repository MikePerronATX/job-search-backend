const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/jobs', async (req, res) => {
  const search = req.query.search || '';
  const url = `https://remotive.io/api/remote-jobs?search=${encodeURIComponent(
    search
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
