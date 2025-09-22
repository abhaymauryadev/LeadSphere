import React, { useEffect, useState } from 'react'
import { getDashboardStats } from '../api/dashboard'
import Header from '../components/Header'
import {Pie, Line} from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend);
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { 
  Users,
  Flame,
  TrendingUp,
  Plus,
} from 'lucide-react'


const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(()=>{
    const fetchStats = async()=>{
      try {
        const data = await getDashboardStats();
        setStats(data);

      } catch (err) {
        console.log('Error Fetching Dashboard stats:', err);
      }
    };
    fetchStats();
  })

  if(!stats) return <div className='p-6'>Loadind dashboard...</div>

  const COLORS = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];

  // Pie chart data (Leads by Source)
  const pieData = {
    labels : stats?.leadsBySource?.map(item => item._id),
    datasets:[
      {
        data:stats.sourceCounts.map(item=>item.count),
        backgroundColor:COLORS,
        hoverOffset:6,
        borderWidth:1
      },
    ],
  };

  

  return (
    <div className='h-full'>
        {/* Header */}
        <Header/>

        {/* Main Content */}
        <main className='p-3 sm:p-4 lg:p-6'>
          {/* Key Metrics Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8'>
            {/* Total Leads */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className='text-gray-600 text-xs sm:text-sm font-medium'>Total Leads</p>
                  <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2'>{stats.totalLeads}</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>Last 3 months</p>
                </div>
                <div className='p-2 sm:p-3 bg-blue-100 rounded-lg ml-2 sm:ml-4 flex-shrink-0'>
                  <Users className='text-blue-600' size={16} />
                </div>
              </div>
            </div>

            {/* Hot Prospects */}
            <div className='bg-white  rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className='text-gray-600 text-xs sm:text-sm font-medium'>Hot Prospects</p>
                  <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-red-600 mt-1 sm:mt-2'>{stats.aiScoreCounts.find(item => item._id === 'Hot')?.count || 0}</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>High priority leads</p>
                </div>
                <div className='p-2 sm:p-3 bg-red-100 rounded-lg ml-2 sm:ml-4 flex-shrink-0'>
                  <Flame className='text-red-600' size={16} />
                </div>
              </div>
            </div>

            {/* Warm Leads */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className='text-gray-600 text-xs sm:text-sm font-medium'>Warm Leads</p>
                  <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600 mt-1 sm:mt-2'>{stats.aiScoreCounts.find(item => item._id === 'Warm')?.count || 0}</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>Medium priority</p>
                </div>
                <div className='p-2 sm:p-3 bg-orange-100 rounded-lg ml-2 sm:ml-4 flex-shrink-0'>
                  <TrendingUp className='text-orange-600' size={16} />
                </div>
              </div>
            </div>

            {/* New This Month */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className='text-gray-600 text-xs sm:text-sm font-medium'>New This Month</p>
                  <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-1 sm:mt-2'>43</p>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>December 2024</p>
                </div>
                <div className='p-2 sm:p-3 bg-green-100 rounded-lg ml-2 sm:ml-4 flex-shrink-0'>
                  <Plus className='text-green-600' size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Tabs */}
          <div className='mb-4 sm:mb-6'>
            <div className='border-b border-gray-200 overflow-x-auto'>
              <nav className='-mb-px flex space-x-2 sm:space-x-4 lg:space-x-8 min-w-max'>
                <button className='border-b-2 border-teal-500 py-2 px-1 text-xs sm:text-sm font-medium text-teal-600 whitespace-nowrap'>
                  Overview
                </button>
                <button className='border-b-2 border-transparent py-2 px-1 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap'>
                  Weekly Analytics
                </button>
                <button className='border-b-2 border-transparent py-2 px-1 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap'>
                  Detailed Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Charts and Activity Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
            {/* Lead Sources */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Lead Sources</h3>
              {/* <div className='space-y-2 sm:space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full flex-shrink-0'></div>
                    <span className='text-xs sm:text-sm text-gray-600'>Email</span>
                  </div>
                  <span className='text-xs sm:text-sm font-medium text-gray-900'>30%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-teal-600 rounded-full flex-shrink-0'></div>
                    <span className='text-xs sm:text-sm text-gray-600'>LinkedIn</span>
                  </div>
                  <span className='text-xs sm:text-sm font-medium text-gray-900'>40%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full flex-shrink-0'></div>
                    <span className='text-xs sm:text-sm text-gray-600'>Cold Phone</span>
                  </div>
                  <span className='text-xs sm:text-sm font-medium text-gray-900'>20%</span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full flex-shrink-0'></div>
                    <span className='text-xs sm:text-sm text-gray-600'>Manual</span>
                  </div>
                  <span className='text-xs sm:text-sm font-medium text-gray-900'>10%</span>
                </div>
              </div> */}
              <div className='space-y-2 sm:space-y-3'>
                <Pie data = {pieData}/>
              </div>
            </div>

            {/* Lead Timeline */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Lead Timeline</h3>
              {/* <div className='h-24 sm:h-32 flex items-end justify-between space-x-1 sm:space-x-2'>
                <div className='flex flex-col items-center space-y-1 sm:space-y-2'>
                  <div className='w-6 sm:w-8 bg-teal-500 rounded-t' style={{height: '45%'}}></div>
                  <span className='text-xs text-gray-500'>Sep</span>
                </div>
                <div className='flex flex-col items-center space-y-1 sm:space-y-2'>
                  <div className='w-6 sm:w-8 bg-teal-500 rounded-t' style={{height: '75%'}}></div>
                  <span className='text-xs text-gray-500'>Oct</span>
                </div>
                <div className='flex flex-col items-center space-y-1 sm:space-y-2'>
                  <div className='w-6 sm:w-8 bg-teal-500 rounded-t' style={{height: '65%'}}></div>
                  <span className='text-xs text-gray-500'>Nov</span>
                </div>
                <div className='flex flex-col items-center space-y-1 sm:space-y-2'>
                  <div className='w-6 sm:w-8 bg-teal-500 rounded-t' style={{height: '90%'}}></div>
                  <span className='text-xs text-gray-500'>Dec</span>
                </div>
              </div> */}
               <div className='space-y-2 sm:space-y-3'>
                {/* <Line data = {pieData}/> */}
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Recent Activity</h3>
              <div className='space-y-3 sm:space-y-4'>
                <div className='flex items-start space-x-2 sm:space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0'></div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>CSV Import Completed</p>
                    <p className='text-xs text-gray-500'>15 leads imported successfully</p>
                    <p className='text-xs text-gray-400 mt-1'>10:00 PM</p>
                  </div>
                </div>
                <div className='flex items-start space-x-2 sm:space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0'></div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>AI Scoring Complete</p>
                    <p className='text-xs text-gray-500'>Sarah Johnson scored as Hot lead</p>
                    <p className='text-xs text-gray-400 mt-1'>4:05 PM</p>
                  </div>
                </div>
                <div className='flex items-start space-x-2 sm:space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0'></div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>Note Added</p>
                    <p className='text-xs text-gray-500'>Follow-up call scheduled for Michael Chen</p>
                    <p className='text-xs text-gray-400 mt-1'>10:15 PM</p>
                  </div>
                </div>
                <div className='flex items-start space-x-2 sm:space-x-3'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0'></div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>Status Updated</p>
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
