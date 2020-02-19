import mongoose, { Schema } from 'mongoose'

const user2Schema = new Schema({
  name:{
    type:String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phoneNumber: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

user2Schema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('User2', user2Schema)

export const schema = model.schema
export default model
