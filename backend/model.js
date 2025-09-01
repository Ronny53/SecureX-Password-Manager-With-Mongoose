import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    id: {type: String, required: true},
    site: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

export const PassWord = mongoose.model('PassOP', passwordSchema, 'passwords');