const mongoose = require("mongoose")

const issueRecordSchema = new mongoose.Schema({
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
        required: true
    },
    personName: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Issued", "Available"],
        default: "Issued"
    },
    purpose: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("IssueRecord", issueRecordSchema)