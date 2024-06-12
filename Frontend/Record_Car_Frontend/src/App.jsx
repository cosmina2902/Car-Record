import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HeaderCompnent from './components/HeaderCompnent';
import FooterComponent from './components/FooterComponent';
import HomePageComponent from './components/HomePageComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { MasinaComponent } from './components/MasinaComponent';
import AdaugareMasinaComponent from './components/AdaugareMasinaComponent';
import { isAdminUser, isUserLoggedIn } from './service/AuthSerive';
import ListCheltuieliComponent from './components/ListCheltuieliComponent';
import CheltuieliComponent from './components/CheltuieliComponent';
import ForgotPassword from './components/ForgotPassword';
import ResestPasswordComponent from './components/ResestPasswordComponent';
import ChartComponent from './components/ChartComponent';
import Sidebar from './admin/components/Sidebar';
import Dashboard from './admin/components/Dashboard';
import Navbar from './admin/components/Navbar';
import BenzinariiComponent from './components/BenzinariiComponent';
import AboutUs from './components/AboutUs';

function AuthenticatedRoute({ children, adminOnly = false }) {
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" />;
  }

  if (!adminOnly && isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <HeaderCompnent />
      <Routes>
        <Route path='/' element={<AboutUs />}></Route>
        <Route path='/login' element={<LoginComponent />}></Route>
        <Route path='/register' element={<RegisterComponent />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/reset-password' element={<ResestPasswordComponent />}></Route>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path='/home' element={
          <AuthenticatedRoute>
            <HomePageComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/masina/:id' element={
          <AuthenticatedRoute>
            <MasinaComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/add-masina' element={
          <AuthenticatedRoute>
            <AdaugareMasinaComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/edit-masina/:id' element={
          <AuthenticatedRoute>
            <AdaugareMasinaComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/cheltuieli/:numarInmatriculare' element={
          <AuthenticatedRoute>
            <ListCheltuieliComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/charts/:numarInmatriculare' element={
          <AuthenticatedRoute>
            <ChartComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/add-cheltuieli' element={
          <AuthenticatedRoute>
            <CheltuieliComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/benzinarii' element={
          <AuthenticatedRoute>
            <BenzinariiComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/edit-cheltuiala/:id' element={
          <AuthenticatedRoute>
            <CheltuieliComponent />
          </AuthenticatedRoute>
        }></Route>
        <Route path='/admin/dashboard' element={
          <AuthenticatedRoute adminOnly={true}>
            <Navbar/>
            <div className="container-fluid page-body-wrapper">
              <Sidebar />
              <Dashboard />
            </div>
          </AuthenticatedRoute>
        }></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
