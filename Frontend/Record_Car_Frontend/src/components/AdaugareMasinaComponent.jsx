import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/addmasina.css';
import { adaugareMasina, updateMasina, getIdUserLogat, getMasinaById } from '../service/MasinaService';
import { useNavigate, useParams } from 'react-router-dom';

const AdaugareMasinaComponent = () => {

    const [idUserLogat, setIdUserLogat] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        idUser: '', 
        an: '',
        capacitate: '',
        combustibil: '',
        marca: '',
        model: '',
        numarInmatriculare: '',
        imagine: null
    });

    const [imageName, setImageName] = useState('Alege fișierul'); // State to manage the display name of the image

    useEffect(() => {
        getIdUserLogat().then((response) => {
            setIdUserLogat(response.data);
            setFormData((prevData) => ({
                ...prevData,
                idUser: response.data
            }));
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        if (id) {
            getMasinaById(id).then((response) => {
                const masina = response.data;
                setFormData({
                    idUser: idUserLogat,
                    an: masina.an,
                    capacitate: masina.capacitate,
                    combustibil: masina.combustibil,
                    marca: masina.marca,
                    model: masina.model,
                    numarInmatriculare: masina.numarInmatriculare,
                    imagine: null
                });
                setImageName(masina.pozaMasina ? masina.pozaMasina.name : 'Alege fișierul'); // Set the image name for display
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id, idUserLogat]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagine: file });
        setImageName(file ? file.name : 'Alege fișierul');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.imagine && !id) {
            alert('Vă rugăm să încărcați o imagine pentru mașină.');
            return;
        }

        if (id) {
            // Updating an existing car
            updateMasina(id, formData).then((response) => {
                console.log(response.data);
                navigate('/home');
            }).catch(error => {
                console.error(error);
            });
        } else {
            // Adding a new car
            adaugareMasina(formData).then((response) => {
                console.log(response.data);
                navigate('/home');
            }).catch(error => {
                console.error(error);
            });
        }
    };

    const handleTitle = () => {
        return id ? <h2 className="text-center mb-4">Editare Mașină</h2> : <h2 className="text-center mb-4">Adăugare Mașină</h2>;
    };

    return (
        <>
            <div className="bg-img"></div>
            <div className="container-fluid px-1 py-5 mx-auto min-vh-100 d-flex align-items-center justify-content-center">
                <div className="row justify-content-center w-100">
                    <div className="col-md-6 col-lg-5 col-xl-4 col-10 text-center">
                        {handleTitle()}
                        <div className="card p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row justify-content-between text-left">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">An<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="an" name="an" value={formData.an} onChange={handleChange} 
                                        placeholder="Introduceti anul fabricatiei" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Capacitate<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="capacitate" name="capacitate" value={formData.capacitate} 
                                        onChange={handleChange} placeholder="Introduceti capacitatea" />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Combustibil<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="combustibil" name="combustibil" value={formData.combustibil} 
                                        onChange={handleChange} placeholder="Introduceti tipul de combustibil" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Marca<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="marca" name="marca" value={formData.marca} 
                                        onChange={handleChange} placeholder="Introduceti marca masinii" />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Model<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="model" name="model" value={formData.model} onChange={handleChange} 
                                        placeholder="Introduceti modelul masinii" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Numar Inmatriculare<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="numarInmatriculare" name="numarInmatriculare" 
                                        value={formData.numarInmatriculare} onChange={handleChange}  placeholder="Introduceti numarul de inmatriculare" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="imagine">Imagine:</label>
                                    <div className="custom-file">
                                        <input type="file" accept="image/*" className="custom-file-input" id="imagine" name="imagine" onChange={handleImageChange} />
                                        <label className="custom-file-label" htmlFor="imagine">
                                            {imageName}
                                        </label>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary text-uppercase fw-bold mb-2">{id ? 'Actualizează Mașină' : 'Adaugă Mașină'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdaugareMasinaComponent;
