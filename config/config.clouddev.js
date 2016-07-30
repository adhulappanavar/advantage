var config = require('./config.global');

config.env = 'prod';
config.hostname = 'prod.host.localhost';
config.mongo.db = 'prod_mongo_db';

config.mongo.uri = 'mongodb://advantagedbadmin:advantage123@ds033015.mlab.com:33015/advantagedb';

module.exports = config;