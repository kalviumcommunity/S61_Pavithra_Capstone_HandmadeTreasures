const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    Product: [    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});
// Hash password before saving to the database
adminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;

