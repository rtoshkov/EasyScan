const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, minlength: [3, 'Username should be at least 3 characters long']},
    hashedPassword: {type: String, required: true},
})

userSchema.index({username: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
})

const User = model('User', userSchema);

module.exports = User;