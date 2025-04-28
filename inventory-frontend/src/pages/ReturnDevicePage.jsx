import { useState, useEffect } from "react"
import axios from "axios"
import { FaUndo } from "react-icons/fa"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom" // ✅ import Link

const ReturnDevicePage = () => {
    const [issuedDevices, setIssuedDevices] = useState([])

    useEffect(() => {
        fetchIssuedDevices()
    }, [])

    const fetchIssuedDevices = async () => {
        try {
            const response = await axios.get("https://inventory-for-it-department.onrender.com/issue")
            const issued = response.data.filter(record => record.status === "Issued")
            setIssuedDevices(issued)
        } catch (error) {
            console.error("Failed to fetch issued devices", error)
        }
    }

    const handleReturnDevice = async (id) => {
        try {
            await axios.patch(`https://inventory-for-it-department.onrender.com/issue/return/${id}`)
            toast.success("Device returned successfully!")
            fetchIssuedDevices()
        } catch (error) {
            console.error("Failed to return device", error)
            toast.error("Failed to return device.")
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <ToastContainer />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Return Issued Devices</h1>

                {/* ✅ Link to Device List Page */}
                <Link
                    to="/devices"
                    className="text-blue-600 hover:underline"
                >
                    View Device List
                </Link>
            </div>

            <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Device</th>
                        <th className="p-2 border">Issued To</th>
                        <th className="p-2 border">Issue Date</th>
                        <th className="p-2 border">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {issuedDevices.map(record => (
                        <tr key={record._id}>
                            <td className="p-2 border">{record.device?.type} - {record.device?.brand}</td>
                            <td className="p-2 border">{record.personName}</td>
                            <td className="p-2 border">{new Date(record.issueDate).toLocaleDateString()}</td>
                            <td className="p-2 border text-center">
                                <button
                                    onClick={() => handleReturnDevice(record._id)}
                                    className="text-blue-600 hover:text-blue-800 flex items-center justify-center"
                                >
                                    <FaUndo />
                                </button>
                            </td>
                        </tr>
                    ))}

                    {issuedDevices.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">No issued devices found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ReturnDevicePage