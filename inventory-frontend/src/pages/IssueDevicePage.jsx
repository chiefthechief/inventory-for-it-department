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
        <div className="max-w-6xl mx-auto p-6">
            <ToastContainer />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Issue Device</h1>

                {/* ✅ Link to Device List Page */}
                <Link
                    to="/devices"
                    className="text-blue-600 hover:underline"
                >
                    View Device List
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Device Selection */}
                <div>
                    <label htmlFor="deviceId" className="block font-semibold">
                        Select Device
                    </label>
                    <select
                        id="device"
                        name="device"
                        value={formData.device}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
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
                <div>
                    <label htmlFor="personName" className="block font-semibold">
                        Person's Name
                    </label>
                    <input
                        type="text"
                        id="personName"
                        name="personName"
                        value={formData.personName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Contact Info */}
                <div>
                    <label htmlFor="contactInfo" className="block font-semibold">
                        Contact Info
                    </label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Purpose */}
                <div>
                    <label htmlFor="purpose" className="block font-semibold">
                        Purpose
                    </label>
                    <input
                        type="text"
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Issue Date */}
                <div>
                    <label htmlFor="issueDate" className="block font-semibold">
                        Issue Date
                    </label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                        Issue Device
                    </button>
                </div>
            </form>
        </div>
    )
}

export default IssueDevicePage