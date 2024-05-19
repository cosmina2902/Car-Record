import React, { useState } from 'react';
import '../css/register.css';
import { useNavigate } from 'react-router-dom';
import { saveLoggedInUser } from '../service/AuthSerive';
import Alert from 'react-bootstrap/Alert';

const RegisterComponent = () => {
    const navigator = useNavigate();
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');

    function registerUser(e) {
        e.preventDefault();
        const register = { name, username, email, password, confPassword };
        if (password !== confPassword) {
            setError("Atentie! Parolele nu corespund!");
            setAlert('danger');
        } else {
            setError("User inregistrat cu succes! Mergeti la pagina de Login");
            setAlert('success');
        }
    }

    return (
        <>
            <div className="bg-img"></div>
            <div className="container-fluid px-1 py-5 mx-auto min-vh-100 d-flex align-items-center justify-content-center">
                <div className="row justify-content-center w-50">
                    <div className="col-md-6 col-lg-4 col-xl-3 col-10 text-center">
                        <h1 className="text-center">Register</h1>
                        <div className="card p-4">
                            <form onSubmit={registerUser}>
                                {error && <Alert key={alert} variant={alert}>{error}</Alert>}
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="name"
                                        placeholder="name" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="username"
                                        placeholder="username" name='username' value={username}
                                        onChange={(e) => setUserName(e.target.value)} />
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="email"
                                        placeholder="name@example.com" name='email' value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="email">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                        name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"
                                        name='confPassword' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-lg btn-dark btn-login text-uppercase fw-bold mb-2" type="submit">Inregistreaza-te</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterComponent;
