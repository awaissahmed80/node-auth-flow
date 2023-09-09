const Resource = require( "./resource.class" );

class AuthResource extends Resource{

    toArray(obj){
        return {
            _id: obj?.id || null,
            fname: obj.first_name || null,
            lname: obj.last_name || null,
            email: obj.email_address || null,                 
            created_at: obj.created_at
        } 
    }

}

module.exports = new AuthResource();