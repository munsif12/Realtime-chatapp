const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        const success = await mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`😀 Success: Database connected successfully.`);
    } catch (error) {
        console.log(`🤔 Error: Database connection error ${error.message}.`);
    }
}
module.exports = connectToDatabase;