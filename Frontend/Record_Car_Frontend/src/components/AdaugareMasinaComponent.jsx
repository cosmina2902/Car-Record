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
        <div className="container-pers mb-5 mt-5">
            <h2>Adăugare Mașină</h2>
            <form className='form-floating mb-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor='an'>An:</label>
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
