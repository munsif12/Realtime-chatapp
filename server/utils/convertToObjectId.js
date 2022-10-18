const mongoose = require("mongoose");
const ConvertToObjectId = (id) => {
    return mongoose.Types.ObjectId(id);
}
module.exports = ConvertToObjectId;