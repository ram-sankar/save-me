const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 15,
        unique: true
    },
    content: {
        type: String,
        minlength: 1,
        maxlength: 500,
    }
});

const Path = mongoose.model('path', pathSchema);

exports.Path = Path;