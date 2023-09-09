const validator = require('node-input-validator');
const models = require('../models');

validator.extend('unique', async ({ value, args }) => {
    // default field is email in this example
    
    const ModelName = args[0];
    const filed = args[1];
    let condition = {};
    condition[filed] = value;
    if (args[2]) {
        // condition['id'] = { [Op.ne]: args[2]};
        condition['_id'] = { $ne: mongoose.Types.ObjectId(args[2]) };

    }

    let recordExist = await models[ModelName].findOne({ ...condition });    
    // email already exists
    if (recordExist) {
        return false;
    }

    return true;
});

validator.extend('strong_password', ({ value }) => {
    // default field is email in this example
        
    const passwordRequirements = [
        /^(?=.*[a-z])/,
        /^(?=.*[A-Z])/,
        /^(?=.*\d)/,
        /^(?=.*[!@#$%^&*()_+[\]{}|;:'",.<>?~\\/-])/,
        /^.{8,}$/,
      ];  
    const isValid =  passwordRequirements.every((regex) => regex.test(value));

    // email already exists
    if (!isValid) {
        return false;
    }

    return true;
});

validator.extendMessages({
    required: ':attribute is required.',
    email: ':attribute must be a valid email address.',
    strong_password: 'The :attribute should be minimum  8 characters and must include at least one uppercase letter, one number, and one special character',    
  }, 'en');

module.exports = validator
