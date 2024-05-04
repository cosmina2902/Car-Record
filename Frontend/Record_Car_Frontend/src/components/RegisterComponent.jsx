import React, { useState } from 'react';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { saveLoggedInUser } from '../service/AuthSerive';
import Alert from 'react-bootstrap/Alert';
import '../css/register.css'

const RegisterComponent = () => {
    const navigator = useNavigate();
    const [name, setName] = useState('');

    const [username, setUserName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [confPassword, setConfPassword] = useState('');

    const[error, setError] = useState('');

    const[alert, setAlert] = useState('')
    function registerUser(e) {
        e.preventDefault();
        const register = {name, username, email, password, confPassword}
        if(password !== confPassword){
            setError("Atentie! Parolele nu corespund!")
            setAlert('danger')
        }
        else{
            setError("User inregistrat cu succes! Mergeti la pagina de Login")
            setAlert('success')
        }

        // Verifică dacă utilizatorul a completat corect formularele de înregistrare
       
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <h3 className="login-heading mb-4 text-center">Register</h3>
                    <form>
                        {error && <Alert key={alert} variant={alert}>{error}</Alert>} 
                        <div className="form-floating mb-3">
                        
                            <input type="text" className="form-control" id="name"
                                placeholder="name" name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username"
                                placeholder="username" name='usernaname' value={username} 
                                onChange={(e)=>setUserName(e.target.value)}  />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email"
                                placeholder="name@example.com"  name='email' value={email} 
                                onChange={(e)=>setEmail(e.target.value)}  />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" placeholder="Password"
                               name='password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"
                                 name='confPassword' value={confPassword} onChange={(e)=>setConfPassword(e.target.value)}  />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>

                        <div className="d-grid">
                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-5" type="submit" onClick={(e) => registerUser(e)}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;
