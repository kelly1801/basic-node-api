import { Schema, model } from "mongoose";

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, "Role is mandatory"]
    }
})

export default model('Role', RoleSchema)