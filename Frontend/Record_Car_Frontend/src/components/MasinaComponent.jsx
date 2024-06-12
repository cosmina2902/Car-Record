import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/masina.css';
import defaultImage from '../images/nodata.jpg'; // Import default image
import { deleteMasina, getImagineMasina, getMasinaById } from '../service/MasinaService';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';

export const MasinaComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [an, setAn] = useState('');
    const [capacitate, setCapacitate] = useState('');
    const [combustibil, setCombustibil] = useState('');
    const [marca, setMarca] = useState('');
    const [model, setModel] = useState('');
    const [numarInmatriculare, setNumarInmatriculare] = useState('');
    const [imagine, setImagine] = useState(defaultImage); 

    useEffect(() => {
        if (id) {
            getMasinaById(id).then((response) => {
                const masina = response.data;
                setAn(masina.an);
                setCapacitate(masina.capacitate);
                setCombustibil(masina.combustibil);
                setMarca(masina.marca);
                setModel(masina.model);
                setNumarInmatriculare(masina.numarInmatriculare);

                if (masina.pozaMasina) {
                    getImagineMasina(masina.pozaMasina.name)
                        .then(response => URL.createObjectURL(response.data))
                        .then(imageUrl => {
                            setImagine(imageUrl);
                        })
                        .catch(error => {
                            console.error("Error fetching image:", error);
                            setImagine(defaultImage);
                        });
                }
            }).catch(error => {
                console.error("Error fetching car data:", error);
            });
        }
    }, [id]);

    function stergeMasina(idMasina) {
        const confirmDelete = window.confirm(`Sunteti sigur ca doriti sa stergeti masina cu numarul de Inmatriculare ${numarInmatriculare}?`);
        if (confirmDelete) {
            deleteMasina(idMasina).then((response) => {
                console.log('Masina stearsa cu success');
                console.log(response.data);
                navigate('/home');
            }).catch(error => {
                console.error(error);
            });
        }
    }

    function updateMasina(idMasina){
        navigate(`/edit-masina/${idMasina}`)
    }

    return (
        <div className="container">
            <div className="card mb-5">
                <div className="container-fluid">
                    <div className="wrapper row">
                        <div className="preview col-md-6">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1"><img src={imagine} alt={model} /></div>
                            </div>
                        </div>
                        <div className="details col-md-6">
                            <h3 className="product-title">{marca} {model}</h3>
                            <p className="product-description">{combustibil}</p>
                            <br />
                            <div className="d-flex flex-wrap">
                                <div className="info-item">
                                    <h5>An:</h5>
                                    <h5>{an}</h5>
                                </div>
                                <div className="info-item">
                                    <h5>Capacitate:</h5>
                                    <h5>{capacitate}</h5>
                                </div>
                                <div className="info-item">
                                    <h5>Tip Combustibil: </h5>
                                    <h5>{combustibil}</h5>
                                </div>
                                <div className="info-item">
                                    <h5>Numar Inmatriculare:</h5>
                                    <h5>{numarInmatriculare}</h5>
                                </div>
                            </div>
                            <div className="action">
                                <button className="btn btn-outline-primary me-3" type="button" onClick={() => updateMasina(id)}>Editeaza masina</button>
                                <button className="btn btn-danger me-3" type="button" onClick={() => stergeMasina(id)}>Sterge masina</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
