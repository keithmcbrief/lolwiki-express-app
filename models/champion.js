const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChampionSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  role: [{ type: Schema.Types.ObjectId, ref: 'Role', required: true }],
});

ChampionSchema.virtual('url').get(function () {
  return `/champion/${this._id}`;
});

module.exports = mongoose.model("Champion", ChampionSchema)
