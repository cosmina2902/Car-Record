import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/masina.css';
import fiatImage from '../images/fiat.jpg';
import pasatImage from '../images/passat.jpg';

export const MasinaComponent = () => {
    const { id } = useParams(); // Obține ID-ul masinii din URL

    const dummyData = [
        {
            id_masina: 1,
            an: 2008,
            capacitate: 1.4,
            combustibil: 'benzina',
            id_user: 1,
            marca: 'Fiat',
            model: 'Punto',
            numar_inmatriculare: 'TM81DRD',
            imagine: fiatImage
        },
        {
            id_masina: 2,
            an: 2017,
            capacitate: 1.9,
            combustibil: 'diesel',
            id_user: 1,
            marca: 'Volkswagen',
            model: 'Passat',
            numar_inmatriculare: 'TM85PGF',
            imagine: pasatImage
        }
    ];

    const [masina, setMasina] = useState(null);

    // Folosim useEffect pentru a actualiza starea masinii atunci când se schimbă ID-ul din URL
    useEffect(() => {
        const masinaSelectata = dummyData.find(masina => masina.id_masina === parseInt(id)); // Caută masina cu ID-ul corespunzător din URL
        setMasina(masinaSelectata);
    }, [id]);

    // Dacă masina nu este încă încărcată sau ID-ul nu este valid, afișăm un mesaj de încărcare
    if (!masina) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="card mb-5">
                <div className="container-fliud">
                    <div className="wrapper row">
                        <div className="preview col-md-6">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1"><img src={masina.imagine} alt={masina.model} /></div>
                            </div>
                        </div>
                        <div className="details col-md-6">
                            <h3 className="product-title">{masina.marca} {masina.model}</h3>
                            <p className="product-description">{masina.marca} {masina.model}</p>
                            <br />
                            <div className="d-flex flex-wrap">
                                <div className="info-item">
                                    <h5>An:</h5>
                                    <h5>{masina.an}</h5>
                                </div>
                                <div className="info-item">
                                    <h5>Capacitate:</h5>
                                    <h5>{masina.capacitate}</h5>
                                </div>
                                <div className="info-item">
                                    <h5>Numar Inmatriculare:</h5>
                                    <h5>{masina.numar_inmatriculare}</h5>
                                </div>
                            </div>
                            <div className="action">
                                <button className="btn btn-outline-primary me-3" type="button">Editeaza masina</button>
                                <button className="btn btn-danger me-3" type="button">Sterge masina</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
