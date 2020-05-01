import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Entre un username'
    },
    password: {
        type: String,
        required: 'Entre un password'
    }
})

UserSchema.methods.comparePassword = function(mdp) {
    return bcrypt.compareSync(mdp, this.password)
}
