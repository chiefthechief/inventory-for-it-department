import { useState, useEffect } from "react"
import axios from "axios"

const IssueRecordPage = () => {
    const [issueRecords, setIssueRecords] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchIssueRecords = async () => {
            try {
                const response = await axios.get("http://localhost:5000/issue")
                setIssueRecords(response.data)
            } catch (error) {
                setError("Error fetching issue records.")
                console.error(error)
            }
        }

        fetchIssueRecords()
    }, [])

    return (
        <div>
            <h1>Issue Records</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {issueRecords.length === 0 ? (
                <p>No issue records found.</p>
            ) : (
                <ul>
                    {issueRecords.map((record) => (
                        <li key={record._id}>
                            <h3>Device: {record.device.name}</h3>
                            <p>Issued to: {record.personName}</p>
                            <p>Contact: {record.contactInfo}</p>
                            <p>Issued on: {new Date(record.issueDate).toLocaleDateString()}</p>
                            {record.returnDate && (
                                <p>Returned on: {new Date(record.returnDate).toLocaleDateString()}</p>
                            )}
                            <p>Status: {record.device.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default IssueRecordPage