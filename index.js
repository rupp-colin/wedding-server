'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose.js');

const guestRouter = require('./routes/guests.js');

const app = express();

// json parser
app.use(express.json());

// logging middleware
app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);
// deals with cors
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// mount routers
app.use('/guests', guestRouter);
app.get('/test', (req, res, next) => {
  res.send('API is getting');
});

//error handler
app.use((err, req, res, next) => {
  if(err.status) {
    const errBody = Object.assign({}, err, {message: err.message});
    res.status(err.status).json(errBody);
  } else {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };

// test comment for deployment purposes
