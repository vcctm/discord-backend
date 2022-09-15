const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || process.env.API_PORT;   

const app = express();
app.use(express.json());
app.use(cors());

console.log('Starting our server');

// regioster the routes
app.use('/api/auth', authRoutes);

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {dbName: 'discord-clone'})
.then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server up and running port: ${PORT}`); 
  }); 
})
.catch((err) => {
  console.log('database connection failed. Server not started ❌');
  console.log(err); 
})