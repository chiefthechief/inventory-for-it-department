import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AddDevicePage = () => {
    const navigate = useNavigate()

    const deviceTypes = [
        "Laptop",
        "Router",
        "Monitor",
        "Barcode Scanner",
        "Extension Board",
        "Mouse",
        "Keyboard"
    ]

    const brandOptions = {
        Laptop: ["Dell", "HP", "Lenovo", "Apple"],
        Router: ["TP-Link", "Cisco", "Netgear"],
        Monitor: ["LG", "Samsung", "Acer"],
        "Barcode Scanner": ["Honeywell", "Symbol", "Datalogic"],
        "Extension Board": ["Anchor", "GM", "Philips"],
        Mouse: ["Logitech", "HP", "Dell"],
        Keyboard: ["Logitech", "Dell", "HP"]
    }

    const [formData, setFormData] = useState({
        type: "",
        brand: "",
        serialNumber: "",
        model: "",
        status: "Available",
        dateAdded: new Date().toISOString().slice(0, 10)
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("https://inventory-for-it-department.onrender.com/devices", formData)
            toast.success("Device added successfully!")
            setTimeout(() => navigate("/"), 1500)
        } catch (error) {
            console.error("Failed to add device", error)
            toast.error("Failed to add device")
        }
    }

    return (
        <div className="container">
            <div className="text-center" style={{ marginBottom: "2rem" }}>
                <h1>Add New Device</h1>
            </div>

            <div className="card form-card">
                <div className="card-header">
                    <h2 className="card-title">Device Details</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Device Type */}
                    <div className="form-group">
                        <label>Device Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select device type</option>
                            {deviceTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Brand */}
                    <div className="form-group">
                        <label>Brand</label>
                        <select
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                            disabled={!formData.type}
                        >
                            <option value="">Select brand</option>
                            {formData.type &&
                                brandOptions[formData.type].map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                        </select>
                    </div>

                    {/* Serial Number */}
                    <div className="form-group">
                        <label>Serial Number</label>
                        <input
                            type="text"
                            name="serialNumber"
                            value={formData.serialNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Model */}
                    <div className="form-group">
                        <label>Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Status */}
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="Issued">Issued</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>

                    {/* Date Added */}
                    <div className="form-group">
                        <label>Date Added</label>
                        <input
                            type="date"
                            name="dateAdded"
                            value={formData.dateAdded}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Device</button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    )
}

export default AddDevicePage