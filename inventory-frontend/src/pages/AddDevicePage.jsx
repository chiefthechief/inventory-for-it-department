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
        "Mice",
        "Keyboard"
    ]

    const brandOptions = {
        Laptop: ["Dell", "HP", "Lenovo", "Apple"],
        Router: ["TP-Link", "Cisco", "Netgear"],
        Monitor: ["LG", "Samsung", "Acer"],
        "Barcode Scanner": ["Honeywell", "Symbol", "Datalogic"],
        "Extension Board": ["Anchor", "GM", "Philips"],
        Mice: ["Logitech", "HP", "Dell"],
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
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">Add New Device</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Device Type */}
                <div>
                    <label className="block mb-1 font-medium">Device Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select device type</option>
                        {deviceTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Brand */}
                <div>
                    <label className="block mb-1 font-medium">Brand</label>
                    <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        disabled={!formData.type}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="">Select brand</option>
                        {formData.type &&
                            brandOptions[formData.type].map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                    </select>
                </div>

                {/* Serial Number */}
                <div>
                    <label className="block mb-1 font-medium">Serial Number</label>
                    <input
                        type="text"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Model */}
                <div>
                    <label className="block mb-1 font-medium">Model</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Available">Available</option>
                        <option value="Issued">Issued</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                        <option value="Retired">Retired</option>
                    </select>
                </div>

                {/* Date Added */}
                <div>
                    <label className="block mb-1 font-medium">Date Added</label>
                    <input
                        type="date"
                        name="dateAdded"
                        value={formData.dateAdded}
                        onChange={handleChange}
                        required
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Device
                </button>
            </form>

            <ToastContainer />
        </div>
    )
}

export default AddDevicePage