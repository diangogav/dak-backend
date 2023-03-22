import mongoose, { Schema } from "mongoose";

const playerDuelStatisticsSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  eventId: {
    type: String,
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
  matchWins: {
    type: Number,
    required: true
  },
  matchLosses: {
    type: Number,
    required: true
  },
  matchesPlayed: {
    type: Number,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  playerClan: {
    type: String,
    required: true
  }
})

const PlayerDuelStatisticsModel = mongoose.models.Duel || mongoose.model('PlayerDuelStatistics', playerDuelStatisticsSchema)

export default PlayerDuelStatisticsModel