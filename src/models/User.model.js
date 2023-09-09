const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const RefreshToken = require('./refresh_token.model')
const dayjs = require('dayjs')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type:String,
            required: true
        },
        email_address: {
            type: String,
            requried: false
        },
        password: {
            type: String,
            requried: false,
            select: false
        },        
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    }
);



UserSchema.methods.getTokens = async function(){
    try{

        const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: '60min' });
        const refresh_token = jwt.sign({id: this._id }, process.env.SECRET_KEY, { expiresIn: '45d' });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 45);
        let new_token = new RefreshToken({
                                token: refresh_token,
                                user_id: this._id,
                                expires_at: expiresAt
                            });
         await new_token.save();
         return Promise.resolve({access_token: token, refresh_token})
        
    }catch(e){
         return Promise.reject(e);
    }
}

UserSchema.statics.refreshToken = async function (refresh_token) {
    try{
        
        const decoded = jwt.verify(refresh_token, process.env.SECRET_KEY);        
        let db_token = await RefreshToken.findOne({token: refresh_token, user_id: decoded?.id})        

        
        if(db_token){            
            let time_now = dayjs();
            let expires_at = dayjs(db_token.expires_at)
            
            if(expires_at.isAfter(time_now)){
                const token = jwt.sign({ id: decoded?.id }, process.env.SECRET_KEY, { expiresIn: '60min' });
                return Promise.resolve({access_token: token});
            }
            throw('Token has been expired')
        }
        else{
            throw('Session has expired')
        }
    }
    catch(error){
        return Promise.reject(error)
    }
}

UserSchema.methods.logout = async function (refresh_token) {
    try{
        RefreshToken.deleteOne({ token: refresh_token })
        .then(() =>Promise.resolve())
        .catch((err) =>  Promise.reject(err))

    }
    catch(error){
        return Promise.reject(error)
    }
}

UserSchema.statics.login = async function ({email_address, password}) {
    try{
        const res_user = await this.findOne({email_address: email_address}).select('+password').exec()        
        if(res_user){
            let result = await bcrypt.compare(password, res_user?.password);                        
            if(result){                    
                var tokens = await res_user.getTokens()                     
                if(tokens){
                    var {access_token, refresh_token} = tokens                    
                    return Promise.resolve({user: res_user, access_token, refresh_token})
                }            
                throw('Invalid Request')
            }
            throw("Invalid Login details 001")
        }
        throw("Invalid Login details 002")

    }
    catch(error){
        return Promise.reject(error)
    }
}


module.exports = User = mongoose.model("user", UserSchema);