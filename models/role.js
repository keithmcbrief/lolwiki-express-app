const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 10 },
});

RoleSchema.virtual('url').get(function () {
  return `/catalog/role/${this._id}`;
});

module.exports = mongoose.model('Role', RoleSchema);
