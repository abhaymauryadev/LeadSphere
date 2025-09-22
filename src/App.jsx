import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Leads from './pages/leads'
import AddLead from './pages/AddLead'
import AiAssistant from './pages/AiAssistant'
import Followups from './pages/Reminders'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <div className='flex h-screen bg-gray-50'>
        <Sidebar />
        <main className='flex-1 lg:ml-16 transition-all duration-300'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/add-lead" element={<AddLead />} />
            <Route path="/ai-assistant" element={<AiAssistant />} />
            <Route path="/followups" element={<Followups />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
