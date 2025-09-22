import React from 'react'
import { 
    ArrowLeft, 
    Search, 
    Upload, 
    UserPlus, 
    Bell, 
    User,
    Users,
    Flame,
    TrendingUp,
    Plus,
  } from 'lucide-react'

const Header = () => {
  return (
    <header className='bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4 h-auto sm:h-[5.5625rem]'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
            <div className='flex items-center space-x-4'>              
           <div className='flex flex-col pl-20 lg:pl-0'>
                <h1 className='text-xl sm:text-2xl font-bold text-gray-900'>HR Lead Management</h1>
                <p className='text-gray-600 text-sm'>Manage and track your talent pipeline</p>
              </div>
            </div>
            
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'>
              {/* Search Bar */}
              <div className='relative w-full sm:w-auto'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
                <input
                  type='text'
                  placeholder='Search leads...'
                  className='w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
              
              {/* Action Buttons */}
              <div className='flex items-center space-x-2'>
                <button className='flex items-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                  <Upload size={16} />
                  <span className='hidden sm:inline'>Import</span>
                </button>
                
                <button className='flex items-center space-x-2 px-3 sm:px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'>
                  <UserPlus size={16} />
                  <span className='hidden sm:inline'>Add Lead</span>
                </button>
                
                <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                  <Bell size={20} />
                </button>
                
                <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>
  )
}

export default Header
