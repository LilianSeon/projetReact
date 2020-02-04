import mongoose from 'mongoose';

//Création du schema
const commentSchema = new mongoose.Schema({

    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    articleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;