import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const DeviceListPage = () => {
    const [devices, setDevices] = useState([])
    const [recentActivities, setRecentActivities] = useState([])
    const [activeTab, setActiveTab] = useState("devices")
    const [loadingDevices, setLoadingDevices] = useState(true)
    const [loadingActivities, setLoadingActivities] = useState(true)
    const [visibleDevicesCount, setVisibleDevicesCount] = useState(10)
    const [visibleActivitiesCount, setVisibleActivitiesCount] = useState(10)

    useEffect(() => {
        fetchDevices()
        fetchRecentActivities()
    }, [])

    const fetchDevices = async () => {
        try {
            setLoadingDevices(true)
            const response = await axios.get("https://inventory-for-it-department.onrender.com/devices")
            setDevices(response.data.devices)
        } catch (error) {
            console.error("Failed to fetch devices", error)
        } finally {
            setLoadingDevices(false)
        }
    }

    const fetchRecentActivities = async () => {
        try {
            setLoadingActivities(true)
            const response = await axios.get("https://inventory-for-it-department.onrender.com/issue")
            const sortedActivities = response.data.sort(
                (a, b) => new Date(b.issueDate) - new Date(a.issueDate)
            )
            setRecentActivities(sortedActivities)
        } catch (error) {
            console.error("Failed to fetch issue records", error)
        } finally {
            setLoadingActivities(false)
        }
    }

    const totalDevices = devices.length
    const availableDevices = devices.filter(d => d.status === "Available").length
    const issuedDevices = devices.filter(d => d.status === "Issued").length
    const maintenanceDevices = devices.filter(d => d.status === "Under Maintenance").length
    const retiredDevices = devices.filter(d => d.status === "Retired").length

    return (
        <div className="container">
            {(loadingDevices || loadingActivities) && (
                <div className="progress"><div className="progress-bar" /></div>
            )}
            {/* Header */}
            <div className="header">
                <h1>Inventory Dashboard</h1>
                <div className="action-buttons">
                    <Link to="/devices/add" className="btn btn-primary">
                        Add New Device
                    </Link>
                    <Link to="/devices/issue" className="btn btn-success">
                        Issue Device
                    </Link>
                    <Link to="/devices/return" className="btn btn-warning">
                        Return Device
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-value">{totalDevices}</div>
                    <div className="stat-label">Total Devices</div>
                </div>
                <div className="stat-card available">
                    <div className="stat-value">{availableDevices}</div>
                    <div className="stat-label">Available</div>
                </div>
                <div className="stat-card maintenance">
                    <div className="stat-value">{maintenanceDevices}</div>
                    <div className="stat-label">Maintenance</div>
                </div>
                <div className="stat-card issued">
                    <div className="stat-value">{issuedDevices}</div>
                    <div className="stat-label">Issued</div>
                </div>
                <div className="stat-card retired">
                    <div className="stat-value">{retiredDevices}</div>
                    <div className="stat-label">Retired</div>
                </div>
            </div>

            {/* Tabs Container */}
            <div className="tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-button ${activeTab === "devices" ? "active" : ""}`}
                        onClick={() => setActiveTab("devices")}
                    >
                        Device List
                    </button>
                    <button
                        className={`tab-button ${activeTab === "activities" ? "active" : ""}`}
                        onClick={() => setActiveTab("activities")}
                    >
                        Recent Activities
                    </button>
                </div>

                {/* Devices Tab */}
                <div className={`tab-content ${activeTab === "devices" ? "active" : ""}`}>
                    <div className="table-container">
                        {loadingDevices ? (
                            <div className="empty-state">
                                <p>Fetching data...</p>
                            </div>
                        ) : (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                                <th>Device Type</th>
                                                <th>Serial No.</th>
                                                <th>Brand</th>
                                                <th>Model</th>
                                                <th>Status</th>
                                                <th>Date Added</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {devices.slice(0, visibleDevicesCount).map(device => (
                                                <tr key={device._id}>
                                                    <td>{device.type}</td>
                                                    <td>{device.serialNumber}</td>
                                                    <td>{device.brand}</td>
                                                    <td>{device.model}</td>
                                                    <td>
                                                        <span className={`status-badge status-${device.status.toLowerCase().replace(' ', '-')}`}>
                                                            {device.status}
                                                        </span>
                                                    </td>
                                                    <td>{new Date(device.dateAdded).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                            {devices.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="empty-state">
                                                        <div className="empty-state-icon">📱</div>
                                                        <p>No devices in inventory</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                <div className="flex justify-end items-center" style={{ padding: "0.75rem 1rem" }}>
                                    <div className="action-buttons" style={{ marginBottom: 0 }}>
                                        {visibleDevicesCount > 10 && (
                                            <button type="button" className="btn btn-secondary" onClick={() => setVisibleDevicesCount(10)}>View less</button>
                                        )}
                                        {visibleDevicesCount < devices.length && (
                                            <button type="button" className="btn btn-primary" onClick={() => setVisibleDevicesCount(prev => Math.min(prev + 5, devices.length))}>View more</button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Activities Tab */}
                <div className={`tab-content ${activeTab === "activities" ? "active" : ""}`}>
                    <div className="table-container">
                        {loadingActivities ? (
                            <div className="empty-state">
                                <p>Fetching data...</p>
                            </div>
                        ) : (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                                <th>Device</th>
                                                <th>Issued To</th>
                                                <th>Purpose</th>
                                                <th>Issue Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentActivities.slice(0, visibleActivitiesCount).map(record => (
                                                <tr key={record._id}>
                                                    <td>{record.device?.type} - {record.device?.brand}</td>
                                                    <td>{record.personName}</td>
                                                    <td>{record.purpose}</td>
                                                    <td>{new Date(record.issueDate).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                            {recentActivities.length === 0 && (
                                                <tr>
                                                    <td colSpan="4" className="empty-state">
                                                        <div className="empty-state-icon">📋</div>
                                                        <p>No recent activities</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                <div className="flex justify-end items-center" style={{ padding: "0.75rem 1rem" }}>
                                    <div className="action-buttons" style={{ marginBottom: 0 }}>
                                        {visibleActivitiesCount > 10 && (
                                            <button type="button" className="btn btn-secondary" onClick={() => setVisibleActivitiesCount(10)}>View less</button>
                                        )}
                                        {visibleActivitiesCount < recentActivities.length && (
                                            <button type="button" className="btn btn-primary" onClick={() => setVisibleActivitiesCount(prev => Math.min(prev + 5, recentActivities.length))}>View more</button>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeviceListPage