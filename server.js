const express = require('express');
const db = require('./db');
const app = express();

const cors=require("cors")



app.use(express.json());
app.use(cors());
// Route to fetch all users
app.post('/movies', async (req, res) => {
  const { page = 1, limit = 10 } = req.body;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query(
      'SELECT * FROM movie ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    res.json(rows);
  } catch (err) {
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
