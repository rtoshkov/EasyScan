const dotenv = require('dotenv');
dotenv.config();

const KEY = require(process.env.GOOGLE_CREDENTIALS);

module.exports = {
    DATABASE_ADDRESS: process.env.DATABASE_ADDRESS,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    SHEETS: {
        TELUS_INVENTORY: process.env.TELUS_INVENTORY,
        INFINITY_INVENTORY: process.env.INFINITY_INVENTORY,
        PLOVDIV_INVENTORY: process.env.PLOVDIV_INVENTORY,
    },
    KEY,
    NOTION_KEY: process.env.NOTION_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
}