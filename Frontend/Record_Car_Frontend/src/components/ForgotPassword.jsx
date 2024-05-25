import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { forgotPassword, saveEmailUser } from '../service/AuthSerive';
import Alert from 'react-bootstrap/Alert';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    
    const resetLink = `http://localhost:3000/setNewPassword?email=${encodeURIComponent(email)}`;


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email trimis pentru resetare:', email);

        forgotPassword(email).then((response) => {
            setMessage(response.data);
            setError('Codul a fost trimis cu succes, te rog sa iti verifici email-ul!');

            saveEmailUser(email);
            console.log(email)
        }).catch(error => {
            console.error(error);
            setError('Erroare la trimiterea de email!');
            setMessage('');
        });
    };

  return (
    <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mb-6">
                    {error && <Alert variant={error.includes("succes") ? "success" : "danger"}>{error}</Alert>}
                        <div className="card-body text-center">
                            <h3><FontAwesomeIcon icon={faLock} size="4x" /></h3>
                            <h2 className="text-center">Forgot Password?</h2>
                            <p>Iti poti reseta parola aici</p>
                            <form id="register-form" role="form"  className="form">
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope}/></span>
                                        <input 
                                            id="email" 
                                            name="email" 
                                            placeholder="Email address" 
                                            className="form-control"  
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Reset Password" type="submit" onClick={handleSubmit}/>
                                </div>
                                <input type="hidden" name="token" id="token" value="" /> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForgotPassword