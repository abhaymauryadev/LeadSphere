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
  Mail,
  Linkedin,
  Phone,
  FileText
} from 'lucide-react'

const Dashboard = () => {
  return (
    <div className='h-full'>
        {/* Header */}
        <header className='bg-white shadow-sm border-b border-gray-200 px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              {/* <ArrowLeft className='text-gray-500' size={20} /> */}
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>HR Lead Management</h1>
                <p className='text-gray-600 text-sm'>Manage and track your talent pipeline</p>
              </div>
            </div>
            
            <div className='flex items-center space-x-4'>
              {/* Search Bar */}
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={18} />
                <input
                  type='text'
                  placeholder='Search leads...'
                  className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
              
              {/* Action Buttons */}
              <button className='flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                <Upload size={16} />
                <span>Import</span>
              </button>
              
              <button className='flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors'>
                <UserPlus size={16} />
                <span>Add Lead</span>
              </button>
              
              <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                <Bell size={20} />
              </button>
              
              <button className='p-2 text-gray-500 hover:text-gray-700 transition-colors'>
                <User size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className='p-6'>
          {/* Key Metrics Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {/* Total Leads */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-600 text-sm font-medium'>Total Leads</p>
                  <p className='text-3xl font-bold text-gray-900 mt-2'>247</p>
                  <p className='text-gray-500 text-sm mt-1'>Last 3 months</p>
                </div>
                <div className='p-3 bg-blue-100 rounded-lg'>
                  <Users className='text-blue-600' size={24} />
                </div>
              </div>
            </div>

            {/* Hot Prospects */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-600 text-sm font-medium'>Hot Prospects</p>
                  <p className='text-3xl font-bold text-red-600 mt-2'>42</p>
                  <p className='text-gray-500 text-sm mt-1'>High priority leads</p>
                </div>
                <div className='p-3 bg-red-100 rounded-lg'>
                  <Flame className='text-red-600' size={24} />
                </div>
              </div>
            </div>

            {/* Warm Leads */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-gray-600 text-sm font-medium'>Warm Leads</p>
                  <p className='text-3xl font-bold text-orange-600 mt-2'>89</p>
                  <p className='text-gray-500 text-sm mt-1'>Medium priority</p>
                </div>
                <div className='p-3 bg-orange-100 rounded-lg'>
                  <TrendingUp className='text-orange-600' size={24} />
                </div>
              </div>
            </div>

            {/* New This Month */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <div className='flex items-center justify-between'>
    <div>
                  <p className='text-gray-600 text-sm font-medium'>New This Month</p>
                  <p className='text-3xl font-bold text-green-600 mt-2'>43</p>
                  <p className='text-gray-500 text-sm mt-1'>December 2024</p>
                </div>
                <div className='p-3 bg-green-100 rounded-lg'>
                  <Plus className='text-green-600' size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Tabs */}
          <div className='mb-6'>
            <div className='border-b border-gray-200'>
              <nav className='-mb-px flex space-x-8'>
                <button className='border-b-2 border-teal-500 py-2 px-1 text-sm font-medium text-teal-600'>
                  Overview
                </button>
                <button className='border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'>
                  Weekly Analytics
                </button>
                <button className='border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300'>
                  Detailed Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Charts and Activity Section */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Lead Sources */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Lead Sources</h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Email</span>
                  </div>
                  <span className='text-sm font-medium text-gray-900'>30%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-teal-600 rounded-full'></div>
                    <span className='text-sm text-gray-600'>LinkedIn</span>
                  </div>
                  <span className='text-sm font-medium text-gray-900'>40%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Cold Phone</span>
                  </div>
                  <span className='text-sm font-medium text-gray-900'>20%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-3 h-3 bg-orange-500 rounded-full'></div>
                    <span className='text-sm text-gray-600'>Manual</span>
                  </div>
                  <span className='text-sm font-medium text-gray-900'>10%</span>
                </div>
              </div>
            </div>

            {/* Lead Timeline */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Lead Timeline</h3>
              <div className='h-32 flex items-end justify-between space-x-2'>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='w-8 bg-teal-500 rounded-t' style={{height: '45%'}}></div>
                  <span className='text-xs text-gray-500'>Sep</span>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='w-8 bg-teal-500 rounded-t' style={{height: '75%'}}></div>
                  <span className='text-xs text-gray-500'>Oct</span>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='w-8 bg-teal-500 rounded-t' style={{height: '65%'}}></div>
                  <span className='text-xs text-gray-500'>Nov</span>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <div className='w-8 bg-teal-500 rounded-t' style={{height: '90%'}}></div>
                  <span className='text-xs text-gray-500'>Dec</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Recent Activity</h3>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>CSV Import Completed</p>
                    <p className='text-xs text-gray-500'>15 leads imported successfully</p>
                    <p className='text-xs text-gray-400 mt-1'>10:00 PM</p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>AI Scoring Complete</p>
                    <p className='text-xs text-gray-500'>Sarah Johnson scored as Hot lead</p>
                    <p className='text-xs text-gray-400 mt-1'>4:05 PM</p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>Note Added</p>
                    <p className='text-xs text-gray-500'>Follow-up call scheduled for Michael Chen</p>
                    <p className='text-xs text-gray-400 mt-1'>10:15 PM</p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-2'></div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>Status Updated</p>
                    <p className='text-xs text-gray-500'>Sarah Johnson moved to Qualified</p>
                    <p className='text-xs text-gray-400 mt-1'>7:50 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Dashboard
