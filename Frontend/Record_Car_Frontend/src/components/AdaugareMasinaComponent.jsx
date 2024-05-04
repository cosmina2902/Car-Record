import React, { useState } from 'react';
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
        setFormData({ ...formData, imagine: imageFile });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aici poți să trimiti datele către backend pentru a le salva în baza de date și pentru a încărca imaginea
        console.log(formData);
        // Resetează formularul după trimitere
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
        <div className="container mb-5 mt-5">
            <h2>Adăugare Mașină</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>An:</label>
                    <input type="text" name="an" value={formData.an} onChange={handleChange}
                    placeholder='Introduceti anul fabricatiei' className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Capacitate:</label>
                    <input type="text" name="capacitate" value={formData.capacitate} onChange={handleChange} 
                    placeholder='Introduceti capacitatea' className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Combustibil:</label>
                    <input type="text" name="combustibil" value={formData.combustibil} onChange={handleChange} 
                     placeholder='Introduceti tipul de combustibil' className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Marca:</label>
                    <input type="text" name="marca" value={formData.marca} onChange={handleChange}
                     placeholder='Introduceti marca masinii' className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Model:</label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange}
                     placeholder='Introduceti modelul masinii' className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Numar Inmatriculare:</label>
                    <input type="text" name="numar_inmatriculare" value={formData.numar_inmatriculare} 
                    onChange={handleChange}  placeholder='Introduceti numarul de inmatriculare' className='form-control'/>
                </div>
                <div className="mb-3">
                    <label>Imagine:</label>
                    <input type="file" accept="image/*" name="imagine" onChange={handleImageChange} />
                </div>
                <button type="submit" className="btn btn-primary">Adaugă Mașină</button>
            </form>
        </div>
    );
};

export default AdaugareMasinaComponent;
