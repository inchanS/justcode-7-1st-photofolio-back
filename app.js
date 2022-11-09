const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const multer = require('multer');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};


const createApp = () => {
  const app = express();
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(routes);
  app.use(multer);
  app.use(morgan('combined'));
  app.use(cookieParser())

  app.use((err, req, res, next) => {
    const { status, message } = err;
    console.error(err);
    res.status(status || 500).json({ message });
  });

  return app;
};

module.exports = { createApp };
