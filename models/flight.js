import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {
    type: Number,
    min: 0
  }
})

const flightSchema = new Schema ({
  airline: {
    type: String,
    required: true,
    enum: ['Delta', 'Qatar', 'Turkish', 'Etihad', 'Spirit']
  },
  airport: [String],
  flightNo: {
    type: Number, default: '', required: true
  },
  departure: {
    type: Date,
    default: function () {
      return new Date().setFullYear(new Date().getFullYear() + 1)
    },
    required: true 
  },
  tickets: [ticketSchema],
  meals: [{type:Schema.Types.ObjectId, ref: "Meal"}]
}, {

})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
