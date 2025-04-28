import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import DeviceListPage from "./pages/DeviceListPage"
import AddDevicePage from "./pages/AddDevicePage"
import IssueRecordPage from "./pages/IssueRecordPage"
import IssueDevicePage from "./pages/IssueDevicePage"
import ReturnDevicePage from "./pages/ReturnDevicePage"
import NotFoundPage from "./pages/NotFoundPage"
import "./styles/dashboard.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeviceListPage />} />
        <Route path="/devices" element={<DeviceListPage />} />
        <Route path="/devices/add" element={<AddDevicePage />} />
        <Route path="/issuerecords" element={<IssueRecordPage />} />
        <Route path="/devices/issue" element={<IssueDevicePage />} />
        <Route path="/devices/return" element={<ReturnDevicePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

export default App