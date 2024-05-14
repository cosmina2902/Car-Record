import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HeaderCompnent from './components/HeaderCompnent'
import FooterComponent from './components/FooterComponent'
import HomePageComponent from './components/HomePageComponent'
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import { MasinaComponent } from './components/MasinaComponent'
import AdaugareMasinaComponent from './components/AdaugareMasinaComponent'
import { isUserLoggedIn } from './service/AuthSerive'
import ListCheltuieliComponent from './components/ListCheltuieliComponent'
import BasicFilterDemo from './components/BasicFilterDemo'


function App() {

  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();

    if(isAuth){
      return children;
    }
    return <Navigate to="/"></Navigate>
  }

  return (
    <>
      <BrowserRouter>
        <HeaderCompnent/>
          <Routes>
            <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/login' element={<LoginComponent/>}></Route>
            <Route path='/register' element={<RegisterComponent/>}></Route>
            <Route path='/home' element={
            <AuthenticatedRoute>
                <HomePageComponent/>
            </AuthenticatedRoute>
            }></Route>
            <Route path='/masina/:id' element={
             <AuthenticatedRoute>
                <MasinaComponent/>
             </AuthenticatedRoute>
            }></Route>
            <Route path='/add-masina' element={
              <AuthenticatedRoute>
                  <AdaugareMasinaComponent/>
              </AuthenticatedRoute>
            }></Route>
            <Route path='/cheltuieli' element={
              <AuthenticatedRoute>
                  <BasicFilterDemo/>
              </AuthenticatedRoute>
            }></Route>
            
            
          </Routes>
        <FooterComponent/>
      
      </BrowserRouter>
    </>
  )
}

export default App
