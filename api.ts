const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

interface LeadData {
  name: string
  email: string
  company?: string
  message: string
}

interface PaymentIntentData {
  amount: number
  currency: string
  description?: string
}

interface AIQueryData {
  message: string
  context?: string
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  async createLead(leadData: LeadData) {
    return this.request('/api/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    })
  }

  async createPaymentIntent(paymentData: PaymentIntentData) {
    return this.request<{ client_secret: string }>('/api/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }

  async chatWithAI(queryData: AIQueryData) {
    return this.request<{ response: string }>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify(queryData),
    })
  }

  async healthCheck() {
    return this.request('/health')
  }
}

export const apiService = new ApiService()

