import mongoose, { Schema } from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: String,
  airport: String,
  flightNo: Number,
  departure: Date,
}, {
  timestamps: true
})

const Flight = mongoose.Model('Flight', flightSchema)

export {
  Flight
}
