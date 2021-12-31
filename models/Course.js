import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    link: {
        type: String,
        required: false,
    }
})


export default mongoose.models.Course || mongoose.model('Course', CourseSchema)