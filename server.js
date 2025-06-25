const express = require('express');
const db = require('./db');
const app = express();

const cors=require("cors")



app.use(express.json());
app.use(cors());
// Route to fetch all users
app.get('/movies', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM movie');
    res.json(rows);
  } catch (err) {
    console.error('Error querying DB:', err);
    res.status(500).send('Server error');
  }
});
app.post('/movie', async (req, res) => {
  const { search = '' } = req.body;
  

  try {
    const [rows] = await db.query(
      `SELECT * FROM movie WHERE title LIKE ?`,
      [`%${search}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error querying DB:', err);
    res.status(500).send('Server error');
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
