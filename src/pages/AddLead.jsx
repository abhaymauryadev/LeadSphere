import React, { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { Download, Save } from 'lucide-react'
import { createLead } from '../api/leads';

const AddLead = () => {
  const [activeTab, setActiveTab] = useState('manual')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    source: '',
    tags: [],
    notes: ''
  })
  const [newTag, setNewTag] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      // Handle CSV file processing here
      console.log('CSV file selected:', file.name)
    } else {
      alert('Please select a CSV file')
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const downloadTemplate = () => {
    const csvContent = "First Name,Last Name,Email,Phone,Company,Job Title,Source,Tags,Notes\nJohn,Doe,john.doe@example.com,+1-555-123-4567,TechCorp Inc,Software Engineer,Website,prospect,Interested in our services"
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lead_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const savedLead = await createLead(formData);
    alert(`Lead saved: ${savedLead.firstName} ${savedLead.lastName}`);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      source: '',
      tags: [],
      notes: ''
    });
  } catch (err) {
    console.error('Error saving lead:', err);
    alert('Failed to save lead');
  }
};


  const handleSaveAndScore = () => {
    console.log('Save and Score:', formData)
    // Handle save and score functionality here
  }

  return (
    <>
      <Sidebar />
      <div className='ml-16 lg:ml-64 p-6 bg-gray-50 min-h-screen'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Add New Lead</h1>
            <p className='text-gray-600'>Add a new lead manually or import leads from a CSV file</p>
          </div>

          {/* Modal-like container */}
          <div className='bg-white rounded-lg shadow-lg p-6'>
            {/* Tabs */}
            <div className='flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg'>
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'manual'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Manual Add
              </button>
              <button
                onClick={() => setActiveTab('csv')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'csv'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                CSV Import
              </button>
            </div>

            {/* Manual Add Form */}
            {activeTab === 'manual' && (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* First Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      First Name *
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Enter first name'
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Last Name *
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Enter last name'
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Email *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Enter email address'
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Phone
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Enter phone number'
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Company *
                    </label>
                    <input
                      type='text'
                      name='company'
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Enter company name'
                    />
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Job Title
                    </label>
                    <input
                      type='text'
                      name='jobTitle'
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Enter job title'
                    />
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Source
                  </label>
                  <select
                    name='source'
                    value={formData.source}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                  >
                    <option value=''>Select source</option>
                    <option value='website'>Website</option>
                    <option value='referral'>Referral</option>
                    <option value='social-media'>Social Media</option>
                    <option value='email-campaign'>Email Campaign</option>
                    <option value='cold-call'>Cold Call</option>
                    <option value='trade-show'>Trade Show</option>
                    <option value='other'>Other</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Tags
                  </label>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-teal-800'
                      >
                        {tag}
                        <button
                          type='button'
                          onClick={() => handleRemoveTag(tag)}
                          className='ml-2 text-teal-600 hover:text-teal-800'
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className='flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                      placeholder='Add a tag...'
                    />
                    <button
                      type='button'
                      onClick={handleAddTag}
                      className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Notes
                  </label>
                  <textarea
                    name='notes'
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                    placeholder='Additional notes about this lead...'
                  />
                </div>

                {/* Action Buttons */}
                <div className='flex justify-end space-x-3 pt-6 border-t border-gray-200'>
                  <button
                    type='button'
                    className='px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2'
                  >
                  <Save />
                    Save
                  </button>
                  <button
                    type='button'
                    onClick={handleSaveAndScore}
                    className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2'
                  >
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z'/>
                    </svg>
                    Save & Score
                  </button>
                </div>
              </form>
            )}

            {/* CSV Import */}
            {activeTab === 'csv' && (
              <div className='space-y-8'>
                {/* Step 1: Download Template */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>Step 1: Download Template</h3>
                  <p className='text-gray-600 mb-4'>Download our CSV template to ensure your data is formatted correctly.</p>
                  <button
                    onClick={downloadTemplate}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  >
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z' clipRule='evenodd'/>
                    </svg>
                    Download Template
                  </button>
                </div>

                {/* Step 2: Upload CSV File */}
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>Step 2: Upload CSV File</h3>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                 <Download className='w-12 h-12 mx-auto text-gray-400 mb-4' />
                    <p className='text-gray-600 mb-4'>Drag and drop your CSV file here, or click to browse</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                    >
                      Choose File
                    </button>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='.csv'
                      onChange={handleFileInput}
                      className='hidden'
                    />
                  </div>
                </div>

                {/* Close Button */}
                <div className='flex justify-end pt-6 border-t border-gray-200'>
                  <button
                    onClick={() => setActiveTab('manual')}
                    className='px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500'
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLead
