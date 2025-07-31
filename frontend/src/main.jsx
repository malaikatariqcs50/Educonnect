import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import CourseContext from './context/CourseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <CourseContext>
        <App />
      </CourseContext>
    </UserContext>
    
  </StrictMode>,
)
