const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { AuthResource } = require('../resources')
const salt = bcrypt.genSaltSync(10);

class AuthController {
    constructor() {
    }
    
    async login(req, res) {
        let {email_address, password } = req?.body
        try{               
            User.login({email_address, password})
                .then((user) => {
                    return res.status(200).json({
                        user: AuthResource.item(user.user),
                        access_token: user?.access_token,
                        refresh_token: user?.refresh_token
                    })
                })
                .catch((err) => {                    
                    return res.status(401).json({error: err});
                })            
        }catch(e){
            return res.status(401).json({error: e?.message});
        }
    }

    async register(req, res) {
        
        try{   

            let new_user = new User({
                ...req?.body,
                password: bcrypt.hashSync(req?.body?.password, salt)
            })       
            
            new_user.save()
                .then(async (user) => {
                    const tokens = await user.getTokens()
                    return res.status(200).json({
                        user: AuthResource.item(user),
                        access_token: tokens?.access_token,
                        refresh_token: tokens?.refresh_token
                    })
                })
                .catch((err) => {                                   
                    return res.status(401).json({error: err});
                })            
        }catch(e){            
            return res.status(401).json({error: e?.message});
        }
    }

    async refresh_token(req, res){
        let { refresh_token } = req?.body
        try{            
            User.refreshToken(refresh_token)
                .then((data) => {
                    return res.status(200).json({                        
                        access_token: data?.access_token,                        
                    })
                })
                .catch((err) => {                    
                    return res.status(401).json({error: err});
                })            
        }
        catch(e){
            return res.status(401).json({error: e?.message});
        }
    }

}

module.exports = new AuthController();