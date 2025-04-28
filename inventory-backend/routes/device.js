const express = require("express")
const { createDevice, getDevices, getDeviceById, updateDevice } = require("../controllers/device")

const router = express.Router()

router.post("/", createDevice)
router.get("/", getDevices)
router.get("/:id", getDeviceById)
router.patch("/:id", updateDevice)

module.exports = router
