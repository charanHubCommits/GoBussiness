import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from "./components/Login/"
import Home from './components/Home/'
import ProtectedRoute from "./components/ProtectedRoute/"
import ReferralDetails from "./components/ReferralDetails/"
import NotFound from "./components/NotFound/"

const App = ()=>(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/dashboard/referrals" 
        element={<Navigate to="/" replace />}
      />
      <Route 
        path="/referral/:id" 
        element={
          <ProtectedRoute>
            <ReferralDetails />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App

