const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
    {
        bus_id: {
            type: String,
            require: true,
        },
        date: {
            type: Date,
            require: true,
        },
        total: {
            type: Number,
            require: true,
        },

    },
    {timestamps: true}
)
module.exports = mongoose.model('payment', paymentSchema);