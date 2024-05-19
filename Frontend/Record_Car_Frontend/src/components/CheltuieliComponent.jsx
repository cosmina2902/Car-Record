import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cheltuieli.css';

const CheltuieliComponent = () => {
  const validate = (fieldId) => {
    const input = document.getElementById(fieldId);
    if (!input.value) {
      input.style.borderColor = 'red';
    } else {
      input.style.borderColor = '';
    }
  };

  

  return (
    <>
      <div className="bg-img"></div>
      <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>Adauga o noua cheltuiala</h3>
            <div className="card p-4 ml-8">
              <h5 className="text-center mb-4">Masina x</h5>
              <form className="form-card" onSubmit={(e) => e.preventDefault()}>
                <div className="row justify-content-between text-left">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Data<span className="text-danger"> *</span></label>
                    <input type="date" className="form-control" id="data" name="data" onBlur={() => validate('data')} />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Data Expirare</label>
                    <input type="date" className="form-control" id="data_expirare" name="data_expirare" onBlur={() => validate('data_expirare')} />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  {/* <div className="col-sm-6 mb-3">
                    <label className="form-label">Imagini</label>
                    <input type="file" className="form-control" id="imagini" name="imagini" onBlur={() => validate('imagini')} />
                  </div> */}
                   <div className="col-sm-6 mb-3">
                    <label className="form-label">Numar Inmatriculare<span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" id="numar_inmatriculare" name="numar_inmatriculare" placeholder="Enter Numar Inmatriculare" onBlur={() => validate('numar_inmatriculare')} />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Suma<span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" id="suma" name="suma" placeholder="Enter Suma" onBlur={() => validate('suma')} />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Tip<span className="text-danger"> *</span></label>
                    <input type="text" className="form-control" id="tip" name="tip" placeholder="Enter Tip" onBlur={() => validate('tip')} />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">ID Categorie Cheltuieli<span className="text-danger"> *</span></label>
                    <select className="form-control p-2 mt-1" id="id_categorie_cheltuieli" name="id_categorie_cheltuieli" onBlur={() => validate('id_categorie_cheltuieli')}>
                      <option selected>Alegeti categoria...</option>
                      <option value="1">CHELTUIELI_CU_TAXA</option>
                      <option value="2">CHELTUIELI_CU_COMBUSTIBIL</option>
                      <option value="3">CHELTUIELI_CU_CAUCIUCURI</option>
                      <option value="4">CHELTUIELI_CU_BATERIA</option>
                      <option value="5">CHELTUIELI_CU_SERVICE</option>
                    </select>
                  </div>
                </div>
              
                <div className="row justify-content-end">
                  <div className="col-sm-6">
                    <button type="submit" className="btn btn-primary btn-block mt-4">Adauga Cheltuiala</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheltuieliComponent;
