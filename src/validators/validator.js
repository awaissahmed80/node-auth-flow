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

module.exports = validator
