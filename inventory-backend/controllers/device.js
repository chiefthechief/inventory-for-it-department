const Device = require("../models/device")

const createDevice = async (req, res) => {
    try {
        const newDevice = new Device(req.body)
        await newDevice.save()
        res.status(201).json(newDevice)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Failed to add device" })
    }
}

const getDevices = async (req, res) => {
    try {
        const { status } = req.query
        let query = {}

        if (status) {
            query.status = status
        }

        const devices = await Device.find(query)
        res.status(200).json({ devices })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id)
        if (!device) {
            return res.status(404).json({ message: "Device not found" })
        }
        res.status(200).json(device)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateDevice = async (req, res) => {
    try {
        const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!device) {
            return res.status(404).json({ message: "Device not found" })
        }
        res.status(200).json(device)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createDevice,
    getDevices,
    getDeviceById,
    updateDevice
}
