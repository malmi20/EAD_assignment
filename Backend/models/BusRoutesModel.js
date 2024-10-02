const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routesSchema = new Schema({
  route_id: {
    type: String,
    required: true,
  },

  from: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("routes", routesSchema);
