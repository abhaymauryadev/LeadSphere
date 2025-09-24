import React, { useEffect, useState } from 'react'
import { getDashboardStats } from '../api/dashboard'
import Header from '../components/Header'
import {Pie, Line} from 'react-chartjs-2'
import { 
  Users,
  Flame,
  TrendingUp,
  Plus,
} from 'lucide-react'

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,   // x-axis
  LinearScale,     // y-axis
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(ArcElement,
   ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




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
  }, [])

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

  // Line chart data (Leads by Source)
  const lineData = {
    labels: stats.leadsTimeline.map(item => item._id),
    datasets:[
      {
        label: 'Leads Created',
        data: stats.leadsTimeline.map(item => item.count),
        borderColor:'#36a2eb',
        backgroundColor:'rgba(54,162,235,0.3)',
        fill:true,
        tension:0.3,
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
              <div className='space-y-2 sm:space-y-3'>
                <Pie data = {pieData}/>
              </div>
            </div>

            {/* Lead Timeline */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Lead Timeline</h3>
               <div className='space-y-2 sm:space-y-3'>
                <Line data = {lineData}/>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Recent Activity</h3>
              {/* <div className='space-y-3 sm:space-y-4'>
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
              </div> */}
              
            </div>
          </div>
        </main>
    </div>
  )
}

export default Dashboard
