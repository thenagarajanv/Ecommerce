import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link} from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx';
import Category from './Products/Category.jsx';
import Login from './pages/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DisplayProducts from "./Products/Category.jsx";
import CategoryDetail from './pages/CategoryDetail.jsx';

const App = () => {
  const [user, setUser] = useState("Guest");
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/auth/login' element={
            <Login setUser={setUser} />      
            }/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/' element={
            <ProtectedRoute>
              <Dashboard user={user} setUser={setUser}/>
            </ProtectedRoute>
            }/>
          {/* <Route path='/Category' element={<Category/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
          <Route path='/category/:categoryName' element={<CategoryDetail />} />
          <Route path='/DisplayProducts' element={<DisplayProducts/>}/>
         */}
        <Route path='/Category' element={<Category />} />
        <Route path='/DisplayProducts' element={<DisplayProducts />} />
        <Route path='/category/:categoryName' element={<CategoryDetail />} />
        <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
