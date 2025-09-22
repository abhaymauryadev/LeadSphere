import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Bot, 
  Calendar, 
  BarChart3, 
  Settings,
  ChevronLeft,
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/leads', label: 'Leads', icon: Users },    
    { path: '/add-lead', label: 'Add Lead', icon: UserPlus },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
    { path: '/followups', label: 'Reminders', icon: Calendar },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-white bg-opacity-50 z-40'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`bg-white text-gray-700 h-screen fixed left-0 top-0 shadow-lg z-30 transform transition-all duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'w-16' : 'w-64'}`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}>
      
      {/* Logo and Brand */}
      <div className='p-4 border-b border-gray-100 flex items-center justify-between border h-[5.5625rem]' >
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 rounded-lg flex items-center justify-center'>
            <img src="/icon1.png" alt="logo" className='w-8 h-8' />
          </div>
          {!isCollapsed && <span className='text-gray-700 font-semibold text-lg'>LeadSphere</span>}
        </div>
        {!isCollapsed && <ChevronLeft className='text-gray-500' size={20} />}
      </div>

      {/* Navigation Menu */}
      <nav className='mt-6 px-2'>
        <ul className='space-y-2'>
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center lg:justify-start px-3 py-3 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={item.label}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span className='font-medium ml-3'>{item.label}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className='absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50'>
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </div>
    </>
  )
}

export default Sidebar
