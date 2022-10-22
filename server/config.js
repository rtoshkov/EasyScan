const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
}