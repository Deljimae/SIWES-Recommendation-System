const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models')
const apiRoutes = require('./src/routes/api');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Database Conneciton
async function connectToDatabase() {
  try {

    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase()

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});