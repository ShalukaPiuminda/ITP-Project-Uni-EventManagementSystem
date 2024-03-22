import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebase from 'firebase/compat/app'

const firebaseConfig = {

  apiKey: "AIzaSyDsUJpGKDFwC3wHgQe2F6Pe6Whjon5CyTg",
  authDomain: "event-management-system-9eed4.firebaseapp.com",
  projectId: "event-management-system-9eed4",
  storageBucket: "event-management-system-9eed4.appspot.com",
  messagingSenderId: "855650987646",
  appId: "1:855650987646:web:7d39ef79b8638f09dfb22f"

}

firebase.initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
