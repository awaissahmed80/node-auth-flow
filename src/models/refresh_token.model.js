const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({        
        user_id:{
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },     
        token:{
            type: String,
            required: true,
        },
        expires_at:{
            type: Date,
            required: true            
        }
    },
    {
        timestamps: false
    }
);

module.exports = RefreshToken =  mongoose.model("refresh_token", RefreshTokenSchema);