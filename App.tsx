import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import HomePage from './pages/HomePage'
import PaymentPage from './pages/PaymentPage'
import DashboardPage from './pages/DashboardPage'
import './App.css'

// Inicializar Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </Router>
    </Elements>
  )
}

export default App

