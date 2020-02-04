import mongoose from 'mongoose';

//Création du schema
const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    user_role:{
        type: Number,
        default: 1
    },
    addresses: [{
        address: String,
        city: String,
        zip_code: String
    }]
});

const User = mongoose.model('User', userSchema);
export default User;