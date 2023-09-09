const {User} = require('../models')
const { UserResource } = require('../resources')

class UserController {
    constructor() {
    }
    
    async get(req, res) {
        try{          
            var users = await User.find({  });
            return res.status(200).json({users: UserResource.collection(users)});

        }catch(e){
            return res.status(503).json({error: e?.message});
        }
    }
 

}

module.exports = new UserController();