import React, { useState, useEffect } from 'react';
import { changePassword } from '../service/AuthSerive';
import { useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'; // Asigură-te că importul este corect

const ResetPasswordComponent = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get('email');
        setEmail(emailParam);
    }, [location]);

    const resetPassword = (e) => {
        e.preventDefault();
        console.log('Parola resetată: ' + newPassword);

        if (newPassword !== confirmPassword) {
            setMessage("Parolele nu se potrivesc!");
            return;
        }

        changePassword(email, code, newPassword).then((response) => {
            console.log(response.data);
            setMessage("Parola resetată cu succes!");
        }).catch(error => {
            console.log(error);
            setMessage("Parola nu a putut fi resetată!");
        });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mb-6">
                    {message && <Alert variant={message.includes("succes") ? "success" : "danger"}>{message}</Alert>}
                        <div className="card-body text-center">
                            <h2 className="text-center">Resetare Parolă</h2>
                            <p>Introdu codul din email</p>
                           
                            <form id="register-form" className="form" onSubmit={resetPassword}>
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <input 
                                            id="code" 
                                            name="code" 
                                            placeholder="Introdu codul de resetare" 
                                            className="form-control"  
                                            type="number" 
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <input 
                                            id="newPassword" 
                                            name="newPassword" 
                                            placeholder="Introdu noua parolă" 
                                            className="form-control"  
                                            type="password" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <input 
                                            id="confirmPassword" 
                                            name="confirmNewPassword" 
                                            placeholder="Confirmă noua parolă" 
                                            className="form-control"  
                                            type="password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button name="recover-submit" className="btn btn-lg btn-primary btn-block" type="submit">Schimbă Parola</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordComponent;
