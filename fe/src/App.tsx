import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
// import SignUpPage from './pages/SignUpPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage></LoginPage>} ></Route>
          {/* <Route path='/signup' element={<SignUpPgae></SignUpPgae>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
