const express = require("express")
const { createIssueRecord, getIssueRecords, returnDevice } = require("../controllers/issueRecord")

const router = express.Router()

router.post("/", createIssueRecord)
router.get("/", getIssueRecords)
router.patch("/return/:id", returnDevice)

module.exports = router
