import React, { useState } from 'react'
import '../css/home.css'
import fiatImage from '../images/fiat.jpg';
import pasatImage from '../images/passat.jpg';
import { useNavigate } from 'react-router-dom';


const HomePageComponent = () => {
    const dummyData = [
        {
            id_masina: 1,
            an: 2008,
            capacitate : 1.4,
            combustibil: 'benzina',
            id_user: 1,
            marca: 'Fiat',
            model: 'Punto',
            numar_inmatriculare: 'TM81DRD',
            imagine : fiatImage
        },
        {
            id_masina: 2,
            an: 2017,
            capacitate : 1.9,
            combustibil: 'disel',
            id_user: 1,
            marca: 'Volkswagen',
            model: 'Pasat',
            numar_inmatriculare: 'TM85PGF',
            imagine : pasatImage
        }

    ]
    const [masini, setMasini] = useState(dummyData)

    const navigator = useNavigate();

    function vizualizareDetaliiMasina(id){
        navigator(`/masina/${id}`);
    }
    return (
        <>
            <div className="jumbotron text-center">
                <div className=''>
                    <h1>Vizualizare Masini</h1>
                    <p className="lead text-muted">Aici este locul unde îți poți viziona mașinile adăugate. Enjoy your time</p>
                    <p>
                        <a href="/add-masina" className="btn btn-primary me-2">Adăugare Mașină</a>
                    </p>
                </div>
            </div>

            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {masini.map((masina) => (
                            <div className="col-md-4" key={masina.id_masina}>
                                <div className="card mb-4 box-shadow">
                                    <img className="card-img-top" src={masina.imagine} alt={`Imagine ${masina.marca} ${masina.model}`} />

                                    <div className="card-body">
                                        <p className="card-text">{masina.marca} {masina.model} {masina.capacitate} {masina.combustibil}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary" 
                                                onClick={()=> vizualizareDetaliiMasina(masina.id_masina) }>Detalii</button>
                                                <button type="button" className="btn btn-sm btn-outline-secondary">Cheltuieli</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePageComponent