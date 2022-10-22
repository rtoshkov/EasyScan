const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
const attachToken = require('./middleware/attachToken.js')

const {DATABASE_ADDRESS, PORT} = require('./config');

const inventoryFileController = require('./controllers/inventoryFile');
const userController = require('./controllers/users');

launch();

async function launch() {
    try {
        await mongoose.connect(DATABASE_ADDRESS, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log('Database connected');
    } catch (err) {
        console.log('Connection to database failed ', err);
        process.exit(1)
    }
}

const app = express();
app.use(cors());
app.use(express.json())
app.use(attachToken());

app.use('/inventory-file', inventoryFileController);
app.use('/user', userController);


app.get('/', async (req, res) => {
    res.json({message: 'Under Construction'});
})

app.listen(PORT, () => console.log(`Rest Service running on port ${PORT}`));

