import React, {  useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import Header from '../components/Header'
import {getLeads, updateLead, deleteLead } from '../api/leads'
import { 
  Calendar,
  Filter,
  Tag,
  Phone,
  // MoreHorizontal
} from 'lucide-react'

const Leads = () => {
  const [LeadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('Last 3 Month')
  const [selectedSource, setSelectedSource] = useState('All Sources')
  const [selectedLabel, setSelectedLabel] = useState('All Labels')

  useEffect(()=>{
    const fetchLeads = async()=>{
      try {
       const data = await getLeads(); 
       setLeadsData(data);
      } catch (err) {
        console.log(`Error fetching leads: ${err}`)
      }finally{
        setLoading(false);
      }
    }
    fetchLeads();
    setLoading(false);
  },[])

  
  // Update and Delete rows
  const handleUpdate = (lead) => {
    navigate(`/leads/edit/${lead._id}`);
  };

  const handleDelete = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
  
    try {
      await deleteLead(leadId);
  
      // Remove from local state
      setLeadsData(prev => prev.filter(l => l._id !== leadId));
  
      console.log(`Lead ${leadId} deleted`);
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Qualified': return 'bg-green-100 text-green-800'
      case 'Contacted': return 'bg-blue-100 text-blue-800'
      case 'New': return 'bg-orange-100 text-orang-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  };

  if (loading) return <div className='p-6 text-center'>Loading Leads...</div>
  return (
    <>
    <div className='h-full'>
        {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className='p-4 no-scrollbar sm:p-6 lg:p-8'>
        {/* Leads Section Header */}
        <div className='mb-6 '>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Leads ({LeadsData.length})</h2>
          
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
                {LeadsData.map((lead) => (
                  <tr key={lead._id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
                          {lead.firstName?.[0]}{lead.lastName?.[0]}
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>{lead.firstName} {lead.lastName}</div>
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
                        {lead.aiScore?.label} {lead.aiScore?.percentage ?   `(${lead.aiScore.percentage}%)` : ''}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex flex-wrap gap-1'>
                        {lead.tags.map((tag, index) => (
                          <span key={index} className='inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-teal-800 rounded-full'>
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
                      {lead.nextFollowup
                      ? new Date(lead.nextFollowup).toLocaleString([],{
                        year: 'numeric',
                        month:'short',
                        day:'numeric',
                        hour:'2-digit',
                        minute:'2-digit',
                      }): '-'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className='text-gray-400 hover:text-gray-600 transition-colors'>
                              <MoreHorizontal size={16} />
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content 
                        sideOffset={5}
                        className='z-50 bg-white shadow-lg rounded-md p-1 w-32 '>
                          
                          {/* Update option */}
                         <DropdownMenu.Item onClick={()=> handleUpdate(lead)}
                          className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border-none hover:bg-teal-600 hover:text-white hover:border-none cursor-pointer rounded-md'>
                            <Pencil size={16} />
                            Update
                         </DropdownMenu.Item>

                          {/* Delete option */}
                         <DropdownMenu.Item onClick={()=> handleDelete(lead._id)}
                          className='flex items-center gap-2 px-3 py-2 text-sm text-gray-700 border-none hover:bg-red-600  hover:text-white hover:border-none cursor-pointer rounded-md'>
                            <Trash size={16} />
                            Delete
                         </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
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
