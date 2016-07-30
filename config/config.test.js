var config = require('./config.global');

config.env = 'test';
config.hostname = 'test.host.localhost';
config.mongo.db = 'test_mongo_db';

module.exports = config;