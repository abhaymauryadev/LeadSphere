import React from 'react'

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

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/leads', label: 'Leads', icon: Users },    
    { path: '/add-lead', label: 'Add Lead', icon: UserPlus },
    { path: '/ai-assistant', label: 'AI Assistant', icon: Bot },
    { path: '/followups', label: 'Follow-ups & Reminders', icon: Calendar },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className=' text-white h-screen w-[16rem] fixed left-0 top-0 shadow-lg'>
      {/* Logo and Brand */}
      <div className='p-6 border-b border-teal-700 flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10  rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-lg'><img src="/icon1.png" alt="logo" /></span>
          </div>
          <span className='text-gray-700 font-semibold text-lg'>LeadSphere</span>
        </div>
        <ChevronLeft className='text-gray-500' size={20} />
      </div>

      {/* Navigation Menu */}
      <nav className='mt-6 px-4'>
        <ul className='space-y-2'>
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-teal-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100 '
                  }`}
                >
                  <Icon size={20} />
                  <span className='font-medium'>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
