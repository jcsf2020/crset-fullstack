import React, { useState } from 'react'
import { apiService } from '../services/api'

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    whatsapp_number: '' // Adicionar campo para número de WhatsApp
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await apiService.createLead(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', company: '', message: '', whatsapp_number: '' })
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar formulário')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-white mb-2">Obrigado!</h3>
        <p className="text-gray-300">
          Recebemos a sua mensagem. Entraremos em contacto em breve.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nome *"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>
      
      <div>
        <input
          type="text"
          name="company"
          placeholder="Empresa (opcional)"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div>
        <input
          type="text"
          name="whatsapp_number"
          placeholder="Número de WhatsApp (opcional)"
          value={formData.whatsapp_number}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>
      
      <div>
        <textarea
          name="message"
          placeholder="Mensagem *"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {loading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  )
}

export default LeadForm


