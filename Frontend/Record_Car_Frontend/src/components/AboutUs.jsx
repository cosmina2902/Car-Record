import React from 'react';
import BenzinariiComponent from './BenzinariiComponent';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import heroImage from '../images/withe-car.jpg';
import logo from '../images/carRecord.png';
import '../css/AboutUs.css'; // Create this CSS file for custom styles
import { useNavigate } from 'react-router-dom';
import '../../public/assets/vendors/mdi/css/materialdesignicons.min.css'
import '../../public/assets/vendors/ti-icons/css/themify-icons.css'
import '../../public/assets/css/style.css'
import '../admin/components/Navbar'
import Navbar from '../admin/components/Navbar';




const AboutUs = () => {

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };
  return (
    <div className="about-us">
      <div className="hero-image" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-logo">
        <Image src={logo} fluid />
        </div>
        <div className="hero-text">
          <h1>Despre noi</h1>
          <p>Ai grija de bugetul tau alaturi de noi</p>
        </div>

        <div className="hero-buttons">
          <Button variant="outline-danger" onClick={goToRegister}>Creaza-ti cont acum</Button>
        </div>
        
      </div>
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <Image src="src\images\cta-illustration.jpg" rounded fluid />
          </Col>
          <Col md={6}>
            <h2>Misiunea noastra</h2>
            <p>
            Aplicația noastră este concepută pentru a simplifica gestionarea cheltuielilor legate de automobil, oferindu-ți un instrument eficient și ușor de folosit pentru monitorizarea și analiza costurilor. Fie că ești un proprietar de mașină personală sau administrezi o flotă de vehicule, soluția noastră te ajută să ții evidența consumului de combustibil, întreținerii regulate, asigurărilor, taxelor de drum și altor cheltuieli incidentale. Cu o interfață intuitivă și funcții de raportare avansate, aplicația noastră îți permite să ai control complet asupra bugetului auto, să optimizezi costurile și să faci alegeri informate despre întreținerea și utilizarea mașinii tale
            </p>
          </Col>
        </Row>
        <Row className="mt-5 text-center">
          <Col>
            <h2>Serviciile noastre</h2>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={3}>
            <div className="service-card">
              <FontAwesomeIcon icon={faCar} size="3x" className="mb-3" />
              <h3>Adaugare de masini</h3>
              <p>Funcționalitatea noastră de adăugare mașini îți permite să introduci și să gestionezi ușor toate vehiculele din portofoliul tău. Indiferent că este vorba de o singură mașină personală sau de o flotă întreagă, procesul de înregistrare este simplificat pentru a te ajuta să menții o evidență clară și organizată. Adaugă detalii specifice fiecărui vehicul, cum ar fi marca, modelul si  anul de fabricație, pentru a facilita monitorizarea și gestionarea eficientă a fiecărui automobil din sistem.</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="service-card">
              <FontAwesomeIcon icon={faCar} size="3x" className="mb-3" />
              <h3>Memento-uri legate de plata taxelor care expiră în 7 zile</h3>
              <p>Nu mai rata termenele importante! Aplicația noastră vine echipată cu un sistem de memento-uri care te alertează automat cu 7 zile înainte de expirarea taxelor auto. Această funcție îți asigură că ești mereu la zi cu obligațiile fiscale și că eviți penalitățile pentru întârziere. Setează memento-uri pentru taxe, asigurări și alte plăți periodice, pentru a gestiona mai eficient toate aspectele financiare ale mașinii tale.</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="service-card">
              <FontAwesomeIcon icon={faCar} size="3x" className="mb-3" />
              <h3>Generare de rapoarte</h3>
              <p>Beneficiază de puterea datelor cu funcționalitatea noastră de generare de rapoarte. Cu câteva clicuri, poți crea rapoarte detaliate despre consumul de combustibil, costurile de întreținere și alte cheltuieli legate de vehiculele tale. Aceste rapoarte sunt esențiale pentru a înțelege tendințele de cheltuieli și pentru a face ajustări strategice care să te ajute să reduci costurile și să îmbunătățești eficiența generală a flotei tale.</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="service-card">
              <FontAwesomeIcon icon={faCar} size="3x" className="mb-3" />
              <h3>Adăugare cheltuieli cu fișierele relative</h3>
              <p>Organizează și arhivează toate cheltuielile vehiculului tău într-un singur loc! Funcția noastră de adăugare cheltuieli îți permite să încarci și să atașezi fișiere relevante, cum ar fi facturi, chitanțe și polițe de asigurare, direct la înregistrarea fiecărei tranzacții. Acest sistem nu doar că simplifică urmărirea și validarea cheltuielilor, dar asigură și un audit ușor și acces rapid la documentele necesare pentru întreținerea și administrarea eficientă a mașinii tale.</p>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-12 text-center">
          <Col>
            <h2>Fondatorul nostru</h2>
          </Col>
        </Row>
        <Row className="text-center align-items-center">
          <Col md={4}>
            <div className="project-card">
              <Image src="src\images\cosmi.jpeg" rounded fluid />
            </div>
          </Col>
          <Col md={8}>
            <div className="fondator-description">
              <h3>Recea Cosmina</h3>
              <p>Cosmina, fondatoarea aplicației noastre, înțelege profund importanța unei evidențe clare și detaliate a cheltuielilor auto. Cu o solidă pregătire academică obținută la Universitatea Politehnica din Timișoara, ea și-a dedicat expertiza și pasiunea pentru a dezvolta soluții tehnologice adaptate nevoilor șoferilor. Determinată să ofere o soluție accesibilă și eficientă, Cosmina a creat această platformă cu scopul de a simplifica monitorizarea și gestionarea cheltuielilor vehiculului. Prin funcționalitățile avansate ale site-ului, Cosmina speră să ajute utilizatorii să aibă control complet asupra bugetelor lor auto, îmbunătățind astfel eficiența și transparența în administrarea cheltuielilor legate de vehicule.</p>
            </div>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default AboutUs;
