import { Schema, model } from "mongoose";

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, "Name is mandatory"]
    },
    status : {
        type: Boolean,
        default: true,
        required: true,

    },
    user : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    }
})

export default model('Category', RoleSchema)