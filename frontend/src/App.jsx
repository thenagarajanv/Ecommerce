import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx';
import Category from './Products/Category.jsx';
import Login from './pages/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState("Guest");
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/auth/login' element={
            <Login setUser={setUser} />          // <Login user={user} setUser={setUser}/>
            }/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser}/>
            </ProtectedRoute>
            }/>
          <Route path='/Category' element={<Category/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
