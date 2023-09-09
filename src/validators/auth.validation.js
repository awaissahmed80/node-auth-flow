const  niv = require('./validator')

const loginRequest = async (req, res, next) => {
    var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            email_address: 'required|string|email',                        
            password: 'required'
        });
        validator.niceNames({
            email_address: 'Email Address',            
            password: 'Password'
        })

        let isValid = await validator.check();
        if(!isValid){
            return res.status(400).json({error: validator.errors, message: 'Invalid login details'}).end();
        }
        next()
}

const registerRequest = async (req, res, next) => {
    var form_data = req.body;
        const validator = new niv.Validator(form_data, {
            first_name: "required|string",
            last_name: "required|string",            
            email_address: 'required|string|email',                        
            password: 'required|same:confirm_password',
            confirm_password: "required|same:password"
        });
        validator.niceNames({
            first_name: "First Name",
            last_name: "Last Name",            
            email_address: 'Email Address',            
            password: 'Password',
            confirm_password: 'Confirm Password',
        })

        let isValid = await validator.check();
        if(!isValid){
            return res.status(400).json({error: validator.errors, message: 'Form validation failed.'}).end();
        }
        next()
}

module.exports = {
    loginRequest,
    registerRequest
}