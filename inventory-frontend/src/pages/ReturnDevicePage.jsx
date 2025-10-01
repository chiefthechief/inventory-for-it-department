import { useState, useEffect } from "react"
import axios from "axios"
import { FaUndo } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom" // ✅ import Link

const ReturnDevicePage = () => {
    const [issuedDevices, setIssuedDevices] = useState([])
    const [loading, setLoading] = useState(true)
    const [returningId, setReturningId] = useState("")
    const [confirmId, setConfirmId] = useState("")

    useEffect(() => {
        fetchIssuedDevices()
    }, [])

    const fetchIssuedDevices = async () => {
        try {
            setLoading(true)
            const response = await axios.get("https://inventory-for-it-department.onrender.com/issue")
            const issued = response.data.filter(record => record.status === "Issued")
            setIssuedDevices(issued)
        } catch (error) {
            console.error("Failed to fetch issued devices", error)
        } finally {
            setLoading(false)
        }
    }

    const handleReturnDevice = async (id) => {
        try {
            setReturningId(id)
            // Optimistic update
            setIssuedDevices(prev => prev.filter(r => r._id !== id))
            await axios.patch(`https://inventory-for-it-department.onrender.com/issue/return/${id}`)
            toast.success("Device returned successfully!")
            // Refresh in background to ensure consistency
            fetchIssuedDevices()
        } catch (error) {
            console.error("Failed to return device", error)
            toast.error("Failed to return device.")
            // Re-sync list if error
            fetchIssuedDevices()
        } finally {
            setReturningId("")
            setConfirmId("")
        }
    }

    return (
        <div className="container">
            <ToastContainer />

            <div className="header">
                <h1>Return Issued Devices</h1>
                <div className="action-buttons">
                    <Link to="/devices" className="btn btn-secondary">View Device List</Link>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 className="card-title">Issued Devices</h2>
                </div>
                <div className="table-container">
                    {loading ? (
                        <div className="empty-state"><p>Fetching data...</p></div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                        <th>Device</th>
                                        <th>Issued To</th>
                                        <th>Issue Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {issuedDevices.map(record => (
                                        <tr key={record._id}>
                                            <td>{record.device?.type} - {record.device?.brand}</td>
                                            <td>{record.personName}</td>
                                            <td>{new Date(record.issueDate).toLocaleDateString()}</td>
                                            <td className="table-data-center">
                                                <button
                                                    onClick={() => setConfirmId(record._id)}
                                                    className="btn btn-secondary"
                                                    title="Return device"
                                                    disabled={returningId === record._id}
                                                >
                                                    {returningId === record._id ? "Returning..." : <FaUndo />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {issuedDevices.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="empty-state">
                                                <div className="empty-state-icon">🔁</div>
                                                <p>No issued devices found.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                    )}
                </div>
            </div>
            {confirmId && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3 className="modal-title">Confirm Return</h3>
                        <p className="modal-text">Are you sure you want to mark this device as returned?</p>
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setConfirmId("")}>Cancel</button>
                            <button className="btn btn-primary" onClick={() => handleReturnDevice(confirmId)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReturnDevicePage