import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Toaster } from 'sonner'
import PublicRoute from './components/auth/PublicRoute'

function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>

        {/* private route */}
        <Route element={<ProtectedRoute></ProtectedRoute>}>
          <Route path='/' element={<HomePage />} />
        </Route>

      </Routes>
      <Toaster position="bottom-right" richColors />

    </BrowserRouter>

  )
}

export default App
