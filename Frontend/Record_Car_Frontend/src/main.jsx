import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import '/public/assets/vendors/mdi/css/materialdesignicons.min.css'
// import '/public/assets/vendors/ti-icons/css/themify-icons.css'
// import '/public/assets/css/style.css'

import './flags.css';
import { PrimeReactProvider } from 'primereact/api'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider>
    <App />
    </PrimeReactProvider>
   
  </React.StrictMode>,
)
