import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     email:{
        type: String,
        required: true,
        unique: true,
    },
     age:{
        type: Number,
        required: true
    },
     course:{
        type: String,
        required: true
    },
     fees:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default : "active"
    }
 
})

export const Student = mongoose.model("Student", studentSchema )