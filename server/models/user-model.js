const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// creating user-model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,

    },
    email: {
        type: String,
        require: true,

    },
    phone: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

//secure password using bcrypt in user-model
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    try {
        const saltAround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltAround);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }

});

// Compare the password

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//json web token

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                userEmail: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        );
    } catch (error) {
        console.error(error);
    }
}

//creating a collection in db
const User = mongoose.model('User', userSchema);


module.exports = User;