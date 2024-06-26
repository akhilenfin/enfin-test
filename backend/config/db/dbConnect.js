const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        console.log(process.env);
            mongoose.set('strictQuery', true)
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log('Database is connected successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;