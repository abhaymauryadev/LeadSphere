import React, { useEffect, useState } from 'react'
import { getDashboardStats } from '../api/dashboard'
import { getActivities } from '../api/activities';
import { getMonthlyLeadsCount } from '../api/leads';
import Header from '../components/Header'
import {Pie, Line, Bar} from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { 
  Users,
  Flame,
  TrendingUp,
  Plus,
  Clock,
  UserCheck,
  Award,
  Target,
  Zap,
  BarChart3,
  Calendar
} from 'lucide-react'

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activitiesData, setActivitiesData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  

  // Activities
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getActivities();
        setActivitiesData(data);
      } catch (err) {
        console.log('Error fetching activities', err);
      }
    }
    fetchActivities();
  }, []);

  // Dashboard 
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.log('Error Fetching Dashboard stats:', err);
      }
    };
    fetchStats();
  }, []);

  const [data, setData] = useState({ count: 0, month: "", year: "" });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMonthlyLeadsCount();
      setData(res);
    };
    fetchData();
  }, []);

  if (!stats) return <div className='p-6'>Loading dashboard...</div>

  const COLORS = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'];

  // Pie chart data (Leads by Source)
  const pieData = {
    labels: stats?.leadsBySource?.map(item => item._id),
    datasets: [
      {
        data: stats.sourceCounts.map(item => item.count),
        backgroundColor: COLORS,
        hoverOffset: 6,
        borderWidth: 1
      },
    ],
  };

  // Line chart data (Leads by Source)
  const lineData = {
    labels: stats.leadsTimeline.map(item => item._id),
    datasets: [
      {
        label: 'Leads Created',
        data: stats.leadsTimeline.map(item => item.count),
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54,162,235,0.3)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Weekly Analytics Data
  const weeklyData = {
    labels: ['Dec 1-7', 'Dec 8-14', 'Dec 15-21', 'Dec 22-28'],
    leads: [78, 83, 89, 85],
    conversionRates: [7.8, 8.3, 8.9, 8.5],
    topSources: ['Cold Email', 'LinkedIn', 'LinkedIn', 'Cold Phone']
  };

  // Weekly Performance Chart
  const weeklyChartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Leads',
        data: weeklyData.leads,
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54,162,235,0.3)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Conversion Rate %',
        data: weeklyData.conversionRates,
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255,99,132,0.3)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y1',
      }
    ],
  };

  // Source Performance Data
  const sourcePerformanceData = {
    labels: ['LinkedIn', 'Cold Email', 'Cold Phone', 'Manual'],
    leads: [99, 76, 47.5, 50],
    percentages: [40, 30, 20, 10],
    backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981']
  };

  // Source Performance Chart
  const sourcePerformanceChartData = {
    labels: sourcePerformanceData.labels,
    datasets: [
      {
        label: 'Leads',
        data: sourcePerformanceData.leads,
        backgroundColor: sourcePerformanceData.backgroundColor,
        borderWidth: 1,
      }
    ],
  };





  const renderOverview = () => (
    <div className=' grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 h-[27rem]'>
      {/* Lead Sources */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Lead Sources</h3>
        <div className='space-y-2 sm:space-y-3'>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Lead Timeline */}
      <div className='bg-white rounded-lg shadow-sm border h-[27rem]  border-gray-200 p-3 sm:p-4 lg:p-6'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Lead Timeline</h3>
        <div className='space-y-2 sm:space-y-3'>
          <Line data={lineData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className='bg-white rounded-lg shadow-sm border h-[27rem] border-gray-200 p-3 sm:p-4 lg:p-6 overflow-y-scroll'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Recent Activity</h3>
        <div className="space-y-3 sm:space-y-4">
          {!activitiesData ? (
            <p className="text-xs text-gray-500">Loading activities...</p>
          ) : activitiesData.length === 0 ? (
            <p className="text-xs text-gray-500">No recent activity</p>
          ) : (
            activitiesData.map((activity) => (
              <div 
                key={activity._id || `${activity.type}-${activity.createdAt}`} 
                className="flex items-start space-x-2 sm:space-x-3"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    {activity.type}
                  </p>
                  <p className="text-xs text-gray-500">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.createdAt).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderWeeklyAnalytics = () => (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6'>

       {/* Performance Metrics */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 lg:col-span-2'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Weekly Performance Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Follow-up Performance */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={20} className="text-blue-600" />
              <h4 className="font-semibold text-gray-900">Follow-up</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Scheduled</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Completed</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Completion Rate</span>
                <span className="font-semibold text-green-600">75%</span>
              </div>
            </div>
          </div>

          {/* AI Performance */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} className="text-yellow-600" />
              <h4 className="font-semibold text-gray-900">AI Performance</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Accuracy</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Hot Predictions</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Auto-scored</span>
                <span className="font-semibold">189</span>
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck size={20} className="text-green-600" />
              <h4 className="font-semibold text-gray-900">Team Performance</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Avg. Response Time</span>
                <span className="font-semibold">2.3h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Active Recruiters</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Top Performer</span>
                <span className="font-semibold text-blue-600">Sarah W.</span>
              </div>
            </div>
          </div>

          {/* Weekly Summary */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={20} className="text-purple-600" />
              <h4 className="font-semibold text-gray-900">Weekly Summary</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Leads</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">New Leads</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Conversion Rate</span>
                <span className="font-semibold text-green-600">8.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Performance Chart */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Weekly Performance Trends</h3>
        <div className='space-y-2 sm:space-y-3'>
          <Line 
            data={weeklyChartData} 
            options={{
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Leads'
                  }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Conversion Rate %'
                  },
                  grid: {
                    drawOnChartArea: false,
                  },
                }
              }
            }}
          />
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Weekly Breakdown</h3>
        <div className="space-y-4">
          {weeklyData.labels.map((week, index) => (
            <div key={week} className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar size={16} />
                  {week}
                </h4>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {weeklyData.leads[index]} leads
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Conversion Rate</p>
                  <p className="font-semibold text-green-600">{weeklyData.conversionRates[index]}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Top Source</p>
                  <p className="font-semibold text-blue-600">{weeklyData.topSources[index]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );

  const renderDetailedAnalytics = () => (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6'>
      {/* Source Performance Analysis */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Source Performance Analysis</h3>
        <div className='space-y-2 sm:space-y-3 mb-6'>
          <Bar 
            data={sourcePerformanceChartData}
            options={{
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
        <div className="space-y-3">
          {sourcePerformanceData.labels.map((source, index) => (
            <div key={source} className="flex items-center justify-between p-2 border border-gray-200 rounded">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: sourcePerformanceData.backgroundColor[index] }}
                />
                <span className="font-medium text-gray-900">{source}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{sourcePerformanceData.leads[index]} leads</p>
                <p className="text-sm text-gray-600">{sourcePerformanceData.percentages[index]}% of total</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Details */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
        <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4'>Performance Details</h3>
        <div className="space-y-4">
          {/* AI Scoring Distribution */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Zap size={16} />
              AI Scoring Distribution
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Hot Prospects', count: 42, color: 'text-red-600' },
                { label: 'Warm Leads', count: 89, color: 'text-orange-600' },
                { label: 'Cold Leads', count: 116, color: 'text-blue-600' }
              ].map((item, index) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={`font-semibold ${item.color}`}>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Response Metrics */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock size={16} />
              Response Metrics
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Avg. First Response', value: '2.3h' },
                { label: 'Follow-up Rate', value: '78%' },
                { label: 'Engagement Rate', value: '45%' }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Award size={16} />
              Team Leaderboard
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Sarah W.', leads: 45, conversion: '12.3%' },
                { name: 'Mike R.', leads: 38, conversion: '10.8%' },
                { name: 'Jessica L.', leads: 32, conversion: '9.5%' }
              ].map((person, index) => (
                <div key={person.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">#{index + 1}</span>
                    <span className="font-medium text-gray-900">{person.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">{person.leads} leads</span>
                    <span className="text-sm text-green-600 ml-2">{person.conversion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className='h-full'>
      {/* Header */}
      <Header />

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
                <p className='text-gray-500 text-xs sm:text-sm mt-1'>Last 1 month</p>
              </div>
              <div className='p-2 sm:p-3 bg-blue-100 rounded-lg ml-2 sm:ml-4 flex-shrink-0'>
                <Users className='text-blue-600' size={16} />
              </div>
            </div>
          </div>

          {/* Hot Prospects */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6'>
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
                <p className='text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-1 sm:mt-2'>{data.count}</p>
                <p className='text-gray-500 text-xs sm:text-sm mt-1'>{data.month} {data.year}</p>
              </div>
              <div className='p-2 sm:p-3 bg-green-100 rounded-lg ml-2 sm:ml-4 flex-shrink-0'>
                <Link to="/add-lead">
                <Plus className='text-green-600' size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Tabs */}
        <div className='mb-4 sm:mb-6'>
          <div className='overflow-x-auto'>
            <nav className='flex space-x-2 sm:space-x-24 lg:space-x-32 max-w-8xl  py-1 m-auto justify-evenly bg-[#f1f5f9] rounded-2xl'>
              <button 
                className={`py-2 px-4 sm:px-8 lg:px-36 text-xs sm:text-sm font-medium whitespace-nowrap rounded-2xl transition-colors ${
                  activeTab === 'overview' 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-500 hover:text-teal-700'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`py-2 px-4 sm:px-8 lg:px-36 text-xs sm:text-sm font-medium whitespace-nowrap rounded-2xl transition-colors ${
                  activeTab === 'weekly' 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-500 hover:text-teal-700'
                }`}
                onClick={() => setActiveTab('weekly')}
              >
                Weekly Analytics
              </button>
              <button 
                className={`py-2 px-4 sm:px-8 lg:px-36 text-xs sm:text-sm font-medium whitespace-nowrap rounded-2xl transition-colors ${
                  activeTab === 'detailed' 
                    ? 'bg-white text-teal-600 shadow-sm' 
                    : 'text-gray-500 hover:text-teal-700'
                }`}
                onClick={() => setActiveTab('detailed')}
              >
                Detailed Analytics
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'weekly' && renderWeeklyAnalytics()}
        {activeTab === 'detailed' && renderDetailedAnalytics()}
      </main>
    </div>
  )
}

export default Dashboard