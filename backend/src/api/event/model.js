import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema({
  name: {
    type: String
  },
  dateStart: {
    type: Date
  },
  time: {
    type: Date
  },
  location: {
    type: String
  },
  type: {
    type: String
  },
  createdBy:{
    type:String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

eventSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      dateStart: this.dateStart,
      time: this.time,
      location: this.location,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Event', eventSchema)

export const schema = model.schema
export default model
