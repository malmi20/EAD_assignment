const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const busDetailsSchema = new Schema(
  {
    bus_no: {
      type: String,
      required: true,
    },

    driver_id: {
      type: String,
      required: true,
    },

    driver_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("busdetails", busDetailsSchema);
