import React from 'react'
import ReactDOM from 'react-dom/client'
import { CalculatorState } from './context/CalculatorState'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CalculatorState>
      <App />
    </CalculatorState>
  </React.StrictMode>
)
