const Resource = require( "./resource.class" );

class UserResource extends Resource{

    toArray(obj){
        return {
            _id: obj?.id || null,
            first_name: obj.first_name || null,
            last_name: obj.last_name || null,
            email: obj.email_address || null,             
            created_at: obj.created_at
        } 
    }

}

module.exports = new UserResource();