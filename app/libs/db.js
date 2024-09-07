import mongoose from 'mongoose'

const DBconf = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/crud");
        console.log("MongoDB is connected successfully");
    } catch (error) {
        console.log('MongoDB error: ', error);
    }
}

export default DBconf;