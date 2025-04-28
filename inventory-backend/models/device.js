const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true, // This field is required
    },
    serialNumber: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Available", "Issued", "Under Maintenance", "Retired"],
        required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
    },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;