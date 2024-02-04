const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./userdb.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create a table (if it doesn't exist)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phoneNumber TEXT,
  email TEXT,
  review TEXT,
  reviewType TEXT
)`, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Table 'users' is ready.");
  }
});

// Remember to close the database when your app closes
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});



// Routes
app.post('/api/users', (req, res) => {
  console.log(req)
    const { name, phoneNumber, email, review, reviewType } = req.body;
    const sql = `INSERT INTO users (name, phoneNumber, email, review, reviewType) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [name, phoneNumber, email, review, reviewType], function(err) {
      if (err) {
        return console.error(err.message);
      }
      res.status(201).json({ id: this.lastID });
    });
  });
  

  app.get('/api/reviews/analysis', (req, res) => {
    const sqlGood = `SELECT COUNT(*) AS count FROM users WHERE reviewType = 'good'`;
    const sqlBad = `SELECT COUNT(*) AS count FROM users WHERE reviewType = 'bad'`;
  
    db.get(sqlGood, [], (err, rowGood) => {
      if (err) {
        return console.error(err.message);
      }
      db.get(sqlBad, [], (err, rowBad) => {
        if (err) {
          return console.error(err.message);
        }
        res.json({ good: rowGood.count, bad: rowBad.count });
      });
    });
  });
  

app.listen(4000, () => {
  console.log(`Server is running on port: ${4000}`);
});
