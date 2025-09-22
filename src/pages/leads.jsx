import React, { useState } from 'react'
import { 
  Search, 
  Upload, 
  UserPlus, 
  Bell, 
  User,
  Calendar,
  Filter,
  Tag,
  ChevronDown,
  Phone,
  Mail,
  MoreHorizontal
} from 'lucide-react'
import Header from '../components/Header'

const Leads = () => {
  const [selectedDate, setSelectedDate] = useState('Last 3 Month')
  const [selectedSource, setSelectedSource] = useState('All Sources')
  const [selectedLabel, setSelectedLabel] = useState('All Labels')

  const leadsData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Inc',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      source: 'LinkedIn',
      jobTitle: 'Senior Software Engineer',
      aiScore: { label: 'Hot', percentage: 85, color: 'bg-red-100 text-red-800' },
      tags: ['React', 'TypeScript', '+1'],
      status: 'Qualified',
      nextFollowup: 'Dec 19, 3:30 PM',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'StartupXYZ',
      email: 'mchen@startupxyz.com',
      phone: '+1 (555) 987-6543',
      source: 'Cold Email',
      jobTitle: 'Product Manager',
      aiScore: { label: 'Warm', percentage: 65, color: 'bg-orange-100 text-orange-800' },
      tags: ['Product', 'Startup', '+1'],
      status: 'Contacted',
      nextFollowup: 'Dec 22, 10:00 AM',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      company: 'Design Studio Pro',
      email: 'emily.r@designstudio.com',
      phone: '+1 (555) 456-7890',
      source: 'Manual',
      jobTitle: 'UX Designer',
      aiScore: { label: 'Cold', percentage: 35, color: 'bg-blue-100 text-blue-800' },
      tags: ['Design', 'UX', '+1'],
      status: 'New',
      nextFollowup: 'Dec 20, 2:00 PM',
      avatar: 'ER'
    },
    {
      id: 4,
      name: 'David Kim',
      company: 'Independent Consultant',
      email: 'david.kim@consultant.com',
      phone: '+1 (555) 321-0987',
      source: 'Cold Phone',
      jobTitle: 'DevOps Engineer',
      aiScore: { label: 'Hot', percentage: 78, color: 'bg-red-100 text-red-800' },
      tags: ['DevOps', 'AWS', '+1'],
      status: 'New',
      nextFollowup: 'Dec 20, 2:00 PM',
      avatar: 'DK'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      company: 'BigCorp Industries',
      email: 'lisa.wang@bigcorp.com',
      phone: '+1 (555) 654-3210',
      source: 'LinkedIn',
      jobTitle: 'Data Scientist',
      aiScore: { label: 'Unscored', percentage: null, color: 'bg-gray-100 text-gray-800' },
      tags: ['Data Science', 'Python', '+1'],
      status: 'New',
      nextFollowup: 'Dec 20, 2:00 PM',
      avatar: 'LW'
    },

    {
      id: 6,
      name: 'Askh Jain',  
      company: 'Dynamics',
      email: 'askh.jain@bigcorp.com',
      phone: '+1 (555) 654-3210',
      source: 'LinkedIn',
      jobTitle: 'Product Manager',
      aiScore: { label: 'Unscored', percentage: null, color: 'bg-gray-100 text-gray-800' },
      tags: ['Product', 'Startup', '+1'],
      status: 'New',
      nextFollowup: 'Dec 20, 2:00 PM',
      avatar: 'AJ'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Qualified': return 'bg-green-100 text-green-800'
      case 'Contacted': return 'bg-blue-100 text-blue-800'
      case 'New': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
    <div className='h-full'>
        {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className='p-4 sm:p-6'>
        {/* Leads Section Header */}
        <div className='mb-6 '>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Leads ({leadsData.length})</h2>
          
          {/* Filter Dropdowns */}
          <div className='flex flex-wrap gap-4 mb-6'>
            <div className='relative'>
              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              >
                <option value='Last 3 Month'>Last 3 Month</option>
                <option value='Last 6 Month'>Last 6 Month</option>
                <option value='This Year'>This Year</option>
              </select>
              <Calendar className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400' size={16} />
            </div>

            <div className='relative'>
              <select 
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              >
                <option value='All Sources'>All Sources</option>
                <option value='LinkedIn'>LinkedIn</option>
                <option value='Cold Email'>Cold Email</option>
                <option value='Cold Phone'>Cold Phone</option>
                <option value='Manual'>Manual</option>
              </select>
              <Filter className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400' size={16} />
            </div>

            <div className='relative'>
              <select 
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
                className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
              >
                <option value='All Labels'>All Labels</option>
                <option value='React'>React</option>
                <option value='TypeScript'>TypeScript</option>
                <option value='Product'>Product</option>
                <option value='Design'>Design</option>
              </select>
              <Tag className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400' size={16} />
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 '>
          <div className=' max-h-96 '>
            <table className='w-full '>
              <thead className='bg-gray-50 border-b border-gray-200 sticky top-0'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Lead</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Contact</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Source</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Job Title</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>AI Score</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tags</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Next Follow-up</th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {leadsData.map((lead) => (
                  <tr key={lead.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                          {lead.avatar}
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{lead.name}</div>
                          <div className='text-sm text-gray-500'>{lead.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-gray-900'>{lead.email}</div>
                      <div className='text-sm text-gray-500 flex items-center mt-1'>
                        <Phone size={12} className='mr-1' />
                        {lead.phone}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm text-gray-900'>{lead.source}</span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm text-gray-900'>{lead.jobTitle}</span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${lead.aiScore.color}`}>
                        {lead.aiScore.label} {lead.aiScore.percentage && `(${lead.aiScore.percentage}%)`}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex flex-wrap gap-1'>
                        {lead.tags.map((tag, index) => (
                          <span key={index} className='inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {lead.nextFollowup}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button className='text-gray-400 hover:text-gray-600 transition-colors'>
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

export default Leads
