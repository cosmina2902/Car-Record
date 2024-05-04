import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeaderCompnent from './components/HeaderCompnent'
import FooterComponent from './components/FooterComponent'
import HomePageComponent from './components/HomePageComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import { MasinaComponent } from './components/MasinaComponent'
import AdaugareMasinaComponent from './components/AdaugareMasinaComponent'


function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderCompnent/>
          <Routes>
            <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/login' element={<LoginComponent/>}></Route>
            <Route path='/register' element={<RegisterComponent/>}></Route>
            <Route path='/home' element={<HomePageComponent/>}></Route>
            <Route path='/masina/:id' element={<MasinaComponent/>}></Route>
            <Route path='/add-masina' element={<AdaugareMasinaComponent/>}></Route>
            
            
          </Routes>
        <FooterComponent/>
      
      </BrowserRouter>
    </>
  )
}

export default App
