const dotenv = require('dotenv');
dotenv.config();

const KEY = require('./google.json');

module.exports = {
    DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    SHEETS: {TELUS_INVENTORY: process.env.TELUS_INVENTORY,},
    KEY,
}