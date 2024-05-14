import React from 'react'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const FooterComponent = () => {
    return (
        <div>
            <footer className="footer-distributed">

<div className="footer-left">

  <h3>Car<span>Record</span></h3>

  <p className="footer-links">
    <a href="#" className="link-1">Home</a>
    
    <a href="#">Contact</a>
  </p>

  <p className="footer-company-name">Car Record © 2024</p>
</div>

<div className="footer-center">

  <div>
    <p><span><FontAwesomeIcon icon={faLocationDot} /> Timisoara, Romania</span><FontAwesomeIcon icon={faLocationDot} /> Piața Victoriei 2, Timișoara 300006</p>
  </div>

  <div>
    <span className='me-2'><FontAwesomeIcon icon={faPhone} /></span><p> 0256 403 011</p>
  </div>

  <div>
  <span className='me-2'><FontAwesomeIcon icon={faEnvelope} /></span> <p>recea.cosmina@gmail.com</p>
  </div>

</div>

<div className="footer-right">

  <p className="footer-company-about">
    <span>Despre Aplicatie</span>
    Aplicatie pentru gestionarea cheltuielilor unei masini. Stim ca este greu sa tinem cont de cat cheltuiti cu masina dumneavoastra asa ca noi am venit in ajutor cu o aplicatia user friendly pentru a putea avea o evidenta exacta a fiecarei plati a masini tale 😄.
  </p>

  <div className="footer-icons">

   
  </div>

</div>

</footer>
        </div>
      )
}
    

export default FooterComponent