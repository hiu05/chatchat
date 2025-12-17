import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotFound from './pages/NotFound'
import { Toaster } from 'sonner'

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage></LoginPage>} ></Route>
          <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
        <Toaster position="bottom-right" richColors />

      </BrowserRouter>
    
  )
}

export default App
