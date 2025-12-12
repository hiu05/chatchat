import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/ChatPage'
import LoginPage from './pages/LogInPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage></LoginPage>} ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
