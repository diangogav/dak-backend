import mongoose, { Model, Schema } from "mongoose";

const duelSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
    required: true
  },
  player: {
    type: String,
    required: true
  },
  matchType: {
    type: Number,
    required: true
  },
  wins: {
    type: Number,
    required: true
  },
  defeats: {
    type: Number,
    required: true
  },
  playerWon: {
    type: Boolean,
    required: true
  },
  opponent: {
    type: String,
    required: true
  },
  playerClan: {
    type: String,
    required: true
  },
  opponentClan: {
    type: String,
    required: true
  },
  playerPoints: {
    type: Number,
    required: true
  },
  opponentPoints: {
    type: Number,
    required: true
  },
})

const DuelModel = mongoose.models.Duel || mongoose.model('Duel', duelSchema)

export default DuelModel