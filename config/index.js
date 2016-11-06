var env = process.env.NODE_ENV || 'clouddev'
  , cfg = require('./config.'+env);

module.exports = cfg;