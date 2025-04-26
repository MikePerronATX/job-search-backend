import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/jobs', async (req, res) => {
  const { search = '', location = '' } = req.query;

  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query: `${search} ${location}`,
        page: '1',
        num_pages: '1',
        country: 'us',
        date_posted: 'all',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });

    res.json({ jobs: response.data.data });
  } catch (error) {
    console.error(
      'Error fetching jobs:',
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
