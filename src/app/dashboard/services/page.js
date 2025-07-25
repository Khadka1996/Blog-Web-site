// app/dashboard/services/page.js
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaLaptop,FaTabletAlt, FaGlobe, FaChrome, FaStore, FaBoxOpen, FaShippingFast, FaMoneyBillWave,
  
   // Content
   FaEdit, FaKeyboard, FaFileAlt, FaBlog,
   
   // Security
   FaLock, FaShieldAlt, FaUserLock,
   
   // AI/Data
   FaBrain,
   
   // Communication
   FaComments, FaEnvelope, FaPhoneAlt, FaVideo,
   
   // Specialized
   FaMedal, FaCertificate, FaRocket, FaLightbulb, FaMagic,
   FaCogs, FaToolbox, FaPuzzlePiece, FaChartBar, FaChartPie,
   FaSearchDollar, FaAd, FaHashtag, FaPalette, FaImage, FaPhotoVideo,
   FaDesktop, FaMobileAlt, FaBullhorn, FaPaintBrush,
  FaCode, FaServer, FaDatabase, FaChartLine, FaShoppingCart,
  FaPlus, FaTrash, FaEdit as FaPencil, FaSearch, FaSpinner
} from 'react-icons/fa'
import Modal from './Modal'
import ConfirmDialog from './ConfirmDialog'

// Available icons matching your backend enum
const ICON_OPTIONS = [
  { value: 'Falaptop', label: 'Tablet', icon: <FaLaptop /> },
  { value: 'FaTabletAlt', label: 'Tablet', icon: <FaTabletAlt /> },
  { value: 'FaGlobe', label: 'Globe', icon: <FaGlobe /> },
  { value: 'FaChrome', label: 'Chrome', icon: <FaChrome /> },
  { value: 'FaStore', label: 'Store', icon: <FaStore /> },
  { value: 'FaBoxOpen', label: 'Box Open', icon: <FaBoxOpen /> },
  { value: 'FaShippingFast', label: 'Shipping', icon: <FaShippingFast /> },
  { value: 'FaMoneyBillWave', label: 'Money', icon: <FaMoneyBillWave /> },
  { value: 'FaEdit', label: 'Edit', icon: <FaEdit /> },
  { value: 'FaKeyboard', label: 'Keyboard', icon: <FaKeyboard /> },
  { value: 'FaFileAlt', label: 'File', icon: <FaFileAlt /> },
  { value: 'FaBlog', label: 'Blog', icon: <FaBlog /> },
  { value: 'FaLock', label: 'Lock', icon: <FaLock /> },
  { value: 'FaShieldAlt', label: 'Shield', icon: <FaShieldAlt /> },
  { value: 'FaUserLock', label: 'User Lock', icon: <FaUserLock /> },
  { value: 'FaBrain', label: 'AI/Brain', icon: <FaBrain /> },
  { value: 'FaComments', label: 'Comments', icon: <FaComments /> },
  { value: 'FaEnvelope', label: 'Envelope', icon: <FaEnvelope /> },
  { value: 'FaPhoneAlt', label: 'Phone', icon: <FaPhoneAlt /> },
  { value: 'FaVideo', label: 'Video', icon: <FaVideo /> },
  { value: 'FaMedal', label: 'Medal', icon: <FaMedal /> },
  { value: 'FaCertificate', label: 'Certificate', icon: <FaCertificate /> },
  { value: 'FaRocket', label: 'Rocket', icon: <FaRocket /> },
  { value: 'FaLightbulb', label: 'Idea', icon: <FaLightbulb /> },
  { value: 'FaMagic', label: 'Magic', icon: <FaMagic /> },
  { value: 'FaCogs', label: 'Cogs', icon: <FaCogs /> },
  { value: 'FaToolbox', label: 'Toolbox', icon: <FaToolbox /> },
  { value: 'FaPuzzlePiece', label: 'Puzzle', icon: <FaPuzzlePiece /> },
  { value: 'FaChartBar', label: 'Chart Bar', icon: <FaChartBar /> },
  { value: 'FaChartPie', label: 'Chart Pie', icon: <FaChartPie /> },
  { value: 'FaSearchDollar', label: 'Search Dollar', icon: <FaSearchDollar /> },
  { value: 'FaAd', label: 'Ad', icon: <FaAd /> },
  { value: 'FaHashtag', label: 'Hashtag', icon: <FaHashtag /> },
  { value: 'FaPalette', label: 'Palette', icon: <FaPalette /> },
  { value: 'FaImage', label: 'Image', icon: <FaImage /> },
  { value: 'FaPhotoVideo', label: 'Photo/Video', icon: <FaPhotoVideo /> },
  { value: 'FaDesktop', label: 'Desktop', icon: <FaDesktop /> },
  { value: 'FaMobileAlt', label: 'Mobile', icon: <FaMobileAlt /> },
  { value: 'FaBullhorn', label: 'Marketing', icon: <FaBullhorn /> },
  { value: 'FaPaintBrush', label: 'Design', icon: <FaPaintBrush /> },
  { value: 'FaCode', label: 'Coding', icon: <FaCode /> },
  { value: 'FaServer', label: 'Server', icon: <FaServer /> },
  { value: 'FaDatabase', label: 'Database', icon: <FaDatabase /> },
  { value: 'FaChartLine', label: 'Analytics', icon: <FaChartLine /> },
  { value: 'FaShoppingCart', label: 'E-commerce', icon: <FaShoppingCart /> },
  { value: 'FaPlus', label: 'Add', icon: <FaPlus /> },
  { value: 'FaTrash', label: 'Delete', icon: <FaTrash /> },
  { value: 'FaPencil', label: 'Pencil', icon: <FaPencil /> },
  { value: 'FaSearch', label: 'Search', icon: <FaSearch /> },
  { value: 'FaSpinner', label: 'Loading', icon: <FaSpinner /> }
]

export default function ServicesDashboard() {
  const router = useRouter()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contactMessage: '',
    icon: 'FaDesktop',
    features: []
  })
  const [tempFeature, setTempFeature] = useState('')

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        if (res.ok) {
          setServices(data.data)
        } else {
          throw new Error(data.error || 'Failed to fetch services')
        }
      } catch (error) {
        console.error('Error:', error)
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle feature addition
  const addFeature = () => {
    if (tempFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, tempFeature.trim()]
      }))
      setTempFeature('')
    }
  }

  // Remove feature
  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  // Open modal for editing
  const openEditModal = (service) => {
    setCurrentService(service._id)
    setFormData({
      name: service.name,
      description: service.description,
      contactMessage: service.contactMessage,
      icon: service.icon,
      features: [...service.features]
    })
    setIsModalOpen(true)
  }

  // Submit form (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const url = currentService 
        ? `/api/services/${currentService}`
        : '/api/services'
      const method = currentService ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save service')

      // Refresh services
      router.refresh()
      setIsModalOpen(false)
      setCurrentService(null)
      setFormData({
        name: '',
        description: '',
        contactMessage: '',
        icon: 'FaDesktop',
        features: []
      })
    } catch (error) {
      console.error('Error:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Delete service
  const handleDelete = async () => {
    if (!currentService) return
    setLoading(true)
    
    try {
      const res = await fetch(`/api/services/${currentService}`, {
        method: 'DELETE'
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete service')
      }

      // Refresh services
      router.refresh()
      setIsDeleteDialogOpen(false)
      setCurrentService(null)
    } catch (error) {
      console.error('Error:', error)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter services based on search
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <button
          onClick={() => {
            setCurrentService(null)
            setFormData({
              name: '',
              description: '',
              contactMessage: '',
              icon: 'FaDesktop',
              features: []
            })
            setIsModalOpen(true)
          }}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Add Service
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search services..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      )}

      {/* Services Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => {
            const IconComponent = ICON_OPTIONS.find(icon => icon.value === service.icon)?.icon || FaDesktop
            return (
              <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                      {IconComponent}
                    </div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{service.features.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                      onClick={() => openEditModal(service)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    >
                      <FaPencil className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => {
                        setCurrentService(service._id)
                        setIsDeleteDialogOpen(true)
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No services match your search' : 'No services found'}
          </p>
        </div>
      )}

      {/* Service Form Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {currentService ? 'Edit Service' : 'Add New Service'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Message</label>
              <textarea
                name="contactMessage"
                value={formData.contactMessage}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="grid grid-cols-5 gap-3">
                {ICON_OPTIONS.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, icon: option.value }))}
                    className={`p-3 border rounded-lg cursor-pointer flex flex-col items-center ${
                      formData.icon === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="text-xl mb-1">{option.icon}</div>
                    <span className="text-xs">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={tempFeature}
                  onChange={(e) => setTempFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={loading}
      />
    </div>
  )
}