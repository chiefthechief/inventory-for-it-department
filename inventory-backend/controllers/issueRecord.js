const IssueRecord = require("../models/issueRecord")
const Device = require("../models/device")

const createIssueRecord = async (req, res) => {
    try {
        const issueRecord = new IssueRecord(req.body)
        issueRecord.status = "Issued"

        // Fetch the device being issued
        const device = await Device.findById(issueRecord.device)
        if (!device) {
            return res.status(404).json({ message: "Device not found" })
        }

        // Update device status
        device.status = "Issued"

        // Save both records
        await issueRecord.save()
        await device.save()

        res.status(201).json(issueRecord)
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
}

const getIssueRecords = async (req, res) => {
    try {
        const records = await IssueRecord.find().populate("device").sort({ issueDate: -1 })
        res.status(200).json(records)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const returnDevice = async (req, res) => {
    try {
        const { id } = req.params
        const issueRecord = await IssueRecord.findById(id).populate("device")
        if (!issueRecord) {
            return res.status(404).json({ message: "Issue record not found" })
        }

        const device = issueRecord.device
        device.status = "Available"
        await device.save()

        issueRecord.status = "Available"
        issueRecord.returnDate = new Date()
        await issueRecord.save()

        return res.status(200).json({ message: "Device returned successfully" })
    } catch (error) {
        console.error("Failed to return device:", error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createIssueRecord,
    getIssueRecords,
    returnDevice
}