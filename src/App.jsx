import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import AutomatedTestingStation from './pages/AutomatedTestingStation'
import DrivingLicense from './pages/DrivingLicense'
import VehicleRegistration from './pages/VehicleRegistration'
import EnforcementCompliance from './pages/EnforcementCompliance'
import TaxRevenue from './pages/TaxRevenue'
import RoadSafety from './pages/RoadSafety'
import PUCPUCC from './pages/PUCPUCC'

export default function App() {
  const [activePage, setActivePage] = useState('automated-testing')
  const [searchQuery, setSearchQuery] = useState('')

  const renderPage = () => {
    switch (activePage) {
      case 'automated-testing': return <AutomatedTestingStation />
      case 'driving-license': return <DrivingLicense />
      case 'vehicle-registration': return <VehicleRegistration />
      case 'enforcement': return <EnforcementCompliance />
      case 'tax-revenue': return <TaxRevenue />
      case 'road-safety': return <RoadSafety />
      case 'puc-pucc': return <PUCPUCC />
      default: return <AutomatedTestingStation />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#EDEEF8' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
