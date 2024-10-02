const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignedBusRouteDetailsSchema = new Schema({
  bus_no: {
    type: Schema.Types.ObjectId,
    ref: "busdetails",
    required: true,
  },
  route_id: {
    type: Schema.Types.ObjectId,
    ref: "routes",
    required: true,
  },
  start_date_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("assignedBusRouteDetails", assignedBusRouteDetailsSchema);
