import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const DeviceListPage = () => {
    const [devices, setDevices] = useState([])
    const [recentActivities, setRecentActivities] = useState([])

    useEffect(() => {
        fetchDevices()
        fetchRecentActivities()
    }, [])

    const fetchDevices = async () => {
        try {
            const response = await axios.get("https://inventory-for-it-department.onrender.com/devices")
            setDevices(response.data.devices)
        } catch (error) {
            console.error("Failed to fetch devices", error)
        }
    }

    const fetchRecentActivities = async () => {
        try {
            const response = await axios.get("https://inventory-for-it-department.onrender.com/issue")
            const sortedActivities = response.data.sort(
                (a, b) => new Date(b.issueDate) - new Date(a.issueDate)
            )
            setRecentActivities(sortedActivities.slice(0, 8))
        } catch (error) {
            console.error("Failed to fetch issue records", error)
        }
    }

    const totalDevices = devices.length
    const availableDevices = devices.filter(d => d.status === "Available").length
    const issuedDevices = devices.filter(d => d.status === "Issued").length
    const maintenanceDevices = devices.filter(d => d.status === "Under Maintenance").length
    const retiredDevices = devices.filter(d => d.status === "Retired").length

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
                <div className="space-x-4">
                    <Link to="/devices/add">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add New Device</button>
                    </Link>
                    <Link to="/devices/issue">
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Issue Device</button>
                    </Link>
                    <Link to="/devices/return">
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition">Return Device</button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-600 text-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Devices</h2>
                    <p className="text-3xl">{totalDevices}</p>
                </div>
                <div className="bg-green-600 text-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Available</h2>
                    <p className="text-3xl">{availableDevices}</p>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Maintenance</h2>
                    <p className="text-3xl">{maintenanceDevices}</p>
                </div>
                <div className="bg-red-600 text-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Issued</h2>
                    <p className="text-3xl">{issuedDevices}</p>
                </div>
                <div className="bg-red-600 text-white p-6 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Retired</h2>
                    <p className="text-3xl">{retiredDevices}</p>
                </div>
            </div>

            {/* Device List */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Device List</h2>
                <div className="bg-white shadow rounded overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">Device Type</th>
                                <th className="px-4 py-2">Serial No.</th>
                                <th className="px-4 py-2">Brand</th>
                                <th className="px-4 py-2">Model</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Date Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map(device => (
                                <tr key={device._id} className="border-t">
                                    <td className="px-4 py-2">{device.type}</td>
                                    <td className="px-4 py-2">{device.serialNumber}</td>
                                    <td className="px-4 py-2">{device.brand}</td>
                                    <td className="px-4 py-2">{device.model}</td>
                                    <td className="px-4 py-2 capitalize">{device.status}</td>
                                    <td className="px-4 py-2">{new Date(device.dateAdded).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {devices.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">No devices in inventory</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="overflow-x-auto mt-6">
                <h2 className="text-xl font-semibold mb-3">Recent Activities</h2>
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Device</th>
                            <th className="p-2 border">Issued To</th>
                            <th className="p-2 border">Purpose</th>
                            <th className="p-2 border">Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentActivities.map(record => (
                            <tr key={record._id} className="text-center">
                                <td className="p-2 border">{record.device?.type} - {record.device?.brand}</td>
                                <td className="p-2 border">{record.personName}</td>
                                <td className="p-2 border">{record.purpose}</td>
                                <td className="p-2 border">{new Date(record.issueDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DeviceListPage