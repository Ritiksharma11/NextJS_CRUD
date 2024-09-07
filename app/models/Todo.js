import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    }
}, { timestamps: true })

const todoModel = mongoose.models.Todo || mongoose.model('Todo', TodoSchema)

export default todoModel

