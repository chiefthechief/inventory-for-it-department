import { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, Link } from "react-router-dom"  // ✅ import Link

const IssueDevicePage = () => {
    const [formData, setFormData] = useState({
        device: "",
        personName: "",
        contactInfo: "",
        purpose: "",
        issueDate: "",
        status: "Issued"
    })

    const [availableDevices, setAvailableDevices] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAvailableDevices = async () => {
            try {
                const response = await axios.get("https://inventory-for-it-department.onrender.com/devices?status=Available")
                setAvailableDevices(response.data.devices)
            } catch (error) {
                console.error("Failed to fetch available devices:", error)
            }
        }
        fetchAvailableDevices()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("https://inventory-for-it-department.onrender.com/issue", formData)
            console.log("Device issued successfully:", response.data)

            toast.success("Device issued successfully!", {
                position: "top-center",
                autoClose: 2500
            })

            setTimeout(() => {
                navigate("/devices")
            }, 2600)
        } catch (error) {
            console.error("Failed to issue device:", error)
            toast.error("Failed to issue device. Please check the form and try again.", {
                position: "top-center"
            })
        }
    }

    return (
        <div className="container">
            <ToastContainer />

            <div className="header">
                <h1>Issue Device</h1>
                <div className="action-buttons">
                    <Link to="/devices" className="btn btn-secondary">View Device List</Link>
                </div>
            </div>

            <div className="card form-card">
                <div className="card-header">
                    <h2 className="card-title">Issue Details</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Device Selection */}
                    <div className="form-group">
                        <label htmlFor="device">Select Device</label>
                        <select
                            id="device"
                            name="device"
                            value={formData.device}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a device</option>
                            {availableDevices.map((device) => (
                                <option key={device._id} value={device._id}>
                                    {device.type} - {device.brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Person Name */}
                    <div className="form-group">
                        <label htmlFor="personName">Person's Name</label>
                        <input
                            type="text"
                            id="personName"
                            name="personName"
                            value={formData.personName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Contact Info */}
                    <div className="form-group">
                        <label htmlFor="contactInfo">Contact Info</label>
                        <input
                            type="text"
                            id="contactInfo"
                            name="contactInfo"
                            value={formData.contactInfo}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Purpose */}
                    <div className="form-group">
                        <label htmlFor="purpose">Purpose</label>
                        <input
                            type="text"
                            id="purpose"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Issue Date */}
                    <div className="form-group">
                        <label htmlFor="issueDate">Issue Date</label>
                        <input
                            type="date"
                            id="issueDate"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <Link to="/devices" className="btn btn-secondary">Cancel</Link>
                        <button type="submit" className="btn btn-primary">Issue Device</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IssueDevicePage