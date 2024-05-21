import React, { useEffect, useState } from 'react';
import '../css/home.css';
import { useNavigate } from 'react-router-dom';
import { getAllMasini, getImagineMasina } from '../service/MasinaService';
import defaultImage from '../images/nodata.jpg'; // Import the default image

const HomePageComponent = () => {

    const [masini, setMasini] = useState([]);

    useEffect(() => {
        masinileUserului();
    }, []);

    function masinileUserului() {
        getAllMasini().then((response) => {
            const promises = response.data.map(masina => {
                if (masina.pozaMasina) {
                    console.log(masina)
                    return getImagineMasina(masina.pozaMasina.name)
                        .then(response => URL.createObjectURL(response.data))
                        .then(imageUrl => {
                            return { ...masina, imageUrl };
                        });
                } else {
                    return Promise.resolve({ ...masina, imageUrl: defaultImage }); 
                }
            });
            Promise.all(promises).then(masiniWithImages => {
                setMasini(masiniWithImages);
            });
        }).catch(error => {
            console.error(error);
        });
    }

    const navigator = useNavigate();

    function vizualizareDetaliiMasina(id) {
        navigator(`/masina/${id}`);
    }

    function goToCheltuieli(numarInmatriculare) {
        navigator(`/cheltuieli/${numarInmatriculare}`);
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

            <div className="album mb-4 py-1 bg-light">
                <div className="container">
                    <div className="row">
                        {masini.map((masina) => (
                            <div className="col-md-4" key={masina.idMasina}>
                                <div className="card mb-2 box-shadow">
                                    <img className="card-img-top" src={masina.imageUrl || defaultImage} alt={`Imagine ${masina.numarInmatriculare} ${masina.model}`} />
                                    <div className="card-body">
                                        <p className="card-text text-center">{masina.numarInmatriculare} </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary" 
                                                    onClick={() => vizualizareDetaliiMasina(masina.idMasina)}>Detalii</button>
                                                    
                                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={()=> goToCheltuieli(masina.numarInmatriculare)}>Cheltuieli</button>
                                               
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

export default HomePageComponent;
