import { BrowserRouter, Routes, Route } from 'react-router'
import SignInPage from './pages/SignInPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SignInPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
