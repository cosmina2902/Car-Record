import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/cheltuieli.css';
import { getAllMasini } from '../service/MasinaService';
import { addCheltuiala, getFileByCheltuialaId, getTaxaById, updateCheltuiala } from '../service/CheltuieliService';
import { useNavigate, useParams } from 'react-router-dom';

const CheltuieliComponent = () => {

  const { id } = useParams();
  const [numereInmatriculare, setNumereInmatriculare] = useState([]);

  const [data, setData ] = useState('');
  const [dataExpirare, setDataExpirare] = useState('');
  const [numarInmatriculare, setNumarInmatriculare] = useState('');
  const [suma, setSuma] = useState('');
  const [tip, setTip] = useState('');
  const [idCategorieCheltuieli, setIdCategorie] = useState('');
  const [files, setFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState([]);
  const [updateFiles, setUpdateFiles] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMasini = async () => {
      try {
        const response = await getAllMasini();
        const numere = response.data.map(masina => masina.numarInmatriculare);
        setNumereInmatriculare(numere);
      } catch (error) {
        console.error(error);
      }
    };

    if(id){
      getTaxaById(id).then((response)=> {
        console.log(response.data)
        setData(response.data.data || '');
        setDataExpirare(response.data.dataExpirare || '');
        setNumarInmatriculare(response.data.numarInmatriculare || '');
        setSuma(response.data.suma || '');
        setTip(response.data.tip || '');
        setIdCategorie(response.data.idCategorieCheltuieli || '');
      }).catch(error => {
        console.log(error)
      })

      getFileByCheltuialaId(id).then((response)=>{
        console.log(response.data);
        setExistingFiles(response.data || []);
      }).catch(error => {
        console.log(error)
      });
    }

    fetchMasini();
  }, [id]);

  const adaugaCheltuieli = (e) => {
    e.preventDefault();

    const cheltuiala = {
      data,
      dataExpirare,
      numarInmatriculare,
      suma,
      tip,
      idCategorieCheltuieli: parseInt(idCategorieCheltuieli)
    };

    if(id){
      updateCheltuiala(id, cheltuiala, files, updateFiles).then((response)=> {
        console.log(response.data);
        navigate(`/cheltuieli/${numarInmatriculare}`);
      }).catch(error => {
        console.error('Error cheltuiala:', error);
      });
    }
    else{
      addCheltuiala(cheltuiala, files).then((response) => {
        console.log('Server response:', response.data);
        console.log(files);
        navigate(`/cheltuieli/${numarInmatriculare}`);
      }).catch(error => {
        console.error('Error adding cheltuiala:', error);
      });
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setUpdateFiles(true);
  };

  const handleTitle = () => {
    return id ? <h2 className="text-center mb-4">Editare Cheltuiala</h2> : <h2 className="text-center mb-4">Adăugare Cheltuiala</h2>;
  };

  const handleButtonName = () => {
    return id ? 'Editeaza Cheltuiala' : 'Adauga Cheltuiala';
  }

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
            {handleTitle()}
            <div className="card p-4 ml-8">
              <form className="form-card" onSubmit={adaugaCheltuieli}>
                <div className="row justify-content-between text-left">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Data<span className="text-danger"> *</span></label>
                    <input
                      type="date"
                      className="form-control"
                      id="data"
                      name="data"
                      value={data}
                      onChange={(e) => setData(e.target.value)}
                      onBlur={() => validate('data')}
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Data Expirare</label>
                    <input
                      type="date"
                      className="form-control"
                      id="data_expirare"
                      name="data_expirare"
                      value={dataExpirare}
                      onChange={(e) => setDataExpirare(e.target.value)}
                      onBlur={() => validate('data_expirare')}
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Numar Inmatriculare<span className="text-danger"> *</span></label>
                    <select
                      className="form-control p-2 mt-1"
                      id="numar_inmatriculare"
                      name="numar_inmatriculare"
                      value={numarInmatriculare}
                      onChange={(e) => setNumarInmatriculare(e.target.value)}
                      onBlur={() => validate('numar_inmatriculare')}
                    >
                      <option value="">Alege Numar Inmatriculare...</option>
                      {numereInmatriculare.map((numar, index) => (
                        <option key={index} value={numar}>{numar}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Suma<span className="text-danger"> *</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="suma"
                      name="suma"
                      value={suma}
                      onChange={(e) => setSuma(e.target.value)}
                      placeholder="Enter Suma"
                      onBlur={() => validate('suma')}
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Tip<span className="text-danger"> *</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="tip"
                      name="tip"
                      value={tip}
                      onChange={(e) => setTip(e.target.value)}
                      placeholder="Enter Tip"
                      onBlur={() => validate('tip')}
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">ID Categorie Cheltuieli<span className="text-danger"> *</span></label>
                    <select
                      className="form-control p-2 mt-1"
                      id="id_categorie_cheltuieli"
                      name="id_categorie_cheltuieli"
                      value={idCategorieCheltuieli}
                      onChange={(e) => setIdCategorie(e.target.value)}
                      onBlur={() => validate('id_categorie_cheltuieli')}
                    >
                      <option value="">Alegeti categoria...</option>
                      <option value='1'>CHELTUIELI_CU_TAXA</option>
                      <option value='2'>CHELTUIELI_CU_COMBUSTIBIL</option>
                      <option value='3'>CHELTUIELI_CU_CAUCIUCURI</option>
                      <option value='4'>CHELTUIELI_CU_BATERIA</option>
                      <option value='5'>CHELTUIELI_CU_SERVICE</option>
                    </select>
                  </div>
                </div>
                {id && (
                  <div className="row justify-content-between text-left">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Fisiere Existente</label>
                      <ul className="list-group">
                        {existingFiles.map((file, index) => (
                          <li key={index} className="list-group-item">{file.fileName}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                <div className="row justify-content-between text-left">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Fisiere Noi</label>
                    <input
                      type="file"
                      className="form-control"
                      id="files"
                      name="files"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className="row justify-content-center ">
                  <div className="col-sm-6">
                    <button type="submit" className="btn btn-dark btn-block mt-4">{handleButtonName()}</button>
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
