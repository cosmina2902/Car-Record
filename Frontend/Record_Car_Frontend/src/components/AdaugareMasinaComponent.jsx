import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/addmasina.css';

const AdaugareMasinaComponent = () => {
    const [formData, setFormData] = useState({
        an: '',
        capacitate: '',
        combustibil: '',
        marca: '',
        model: '',
        numar_inmatriculare: '',
        imagine: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        const extension = imageFile.name.split('.').pop().toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
            setFormData({ ...formData, imagine: imageFile });
        } else {
            alert('Formatul de imagine nu este acceptat. Vă rugăm să alegeți un fișier .jpg sau .png.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        console.log(formData);
        
        if (formData.imagine) {
            const reader = new FileReader();
            reader.onload = (event) => {
                localStorage.setItem('imagine', event.target.result);
            };
            reader.readAsDataURL(formData.imagine);
        }
        setFormData({
            an: '',
            capacitate: '',
            combustibil: '',
            marca: '',
            model: '',
            numar_inmatriculare: '',
            imagine: null
        });
    };

    return (
        <>
            <div className="bg-img"></div>
            <div className="container-fluid px-1 py-5 mx-auto min-vh-100 d-flex align-items-center justify-content-center">
                <div className="row justify-content-center w-100">
                    <div className="col-md-6 col-lg-5 col-xl-4 col-10 text-center">
                        <h2 className="text-center mb-4">Adăugare Mașină</h2>
                        <div className="card p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row justify-content-between text-left">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">An<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="an" name="an" value={formData.an} onChange={handleChange} placeholder="Introduceti anul fabricatiei" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Capacitate<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="capacitate" name="capacitate" value={formData.capacitate} onChange={handleChange} placeholder="Introduceti capacitatea" />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Combustibil<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="combustibil" name="combustibil" value={formData.combustibil} onChange={handleChange} placeholder="Introduceti tipul de combustibil" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Marca<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="marca" name="marca" value={formData.marca} onChange={handleChange} placeholder="Introduceti marca masinii" />
                                    </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Model<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="model" name="model" value={formData.model} onChange={handleChange} placeholder="Introduceti modelul masinii" />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                        <label className="form-label">Numar Inmatriculare<span className="text-danger"> *</span></label>
                                        <input type="text" className="form-control" id="numar_inmatriculare" name="numar_inmatriculare" value={formData.numar_inmatriculare} onChange={handleChange} placeholder="Introduceti numarul de inmatriculare" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="imagine">Imagine:</label>
                                    <input type="file" accept="image/*" className="form-control" id="imagine" name="imagine" onChange={handleImageChange} />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary text-uppercase fw-bold mb-2">Adaugă Mașină</button>
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
