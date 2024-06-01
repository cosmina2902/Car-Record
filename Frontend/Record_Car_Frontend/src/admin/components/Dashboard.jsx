import React, { useEffect, useState } from 'react';
import { getCheltuieliInregistrate, getMarciInregistrate, getMasiniInregistrate, getUsersNumber, getTaxeByMarca } from '../../service/AdminService';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
  const [usersNr, setUsersNr] = useState('');
  const [masiniNr, setMasiniNr] = useState('');
  const [cheltuieliNr, setCheltuieliNr] = useState('');
  const [marciInreg, setMarciInreg] = useState([]);
  const [taxeData, setTaxeData] = useState([]);

  useEffect(() => {
    getUsersLoggedIn();
    getMasiniInreg();
    getCheltuieliInreg();
    fetchMarciAndTaxeData();
  }, []);

  function getUsersLoggedIn() {
    getUsersNumber().then((response) => {
      setUsersNr(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function getMasiniInreg() {
    getMasiniInregistrate().then((response) => {
      setMasiniNr(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function getCheltuieliInreg() {
    getCheltuieliInregistrate().then((response) => {
      setCheltuieliNr(response.data);
    }).catch(error => {
      console.error(error);
    });
  }

  function fetchMarciAndTaxeData() {
    getMarciInregistrate().then((response) => {
      const marci = response.data;
      console.log(marci)
      setMarciInreg(marci);

      const promises = marci.map(marca => getTaxeByMarca(marca));

      Promise.all(promises)
        .then(responses => {
          const taxeValues = responses.map(res => res.data);
          setTaxeData(taxeValues);
          console.log(taxeValues)
        })
        .catch(error => {
          console.error(error);
        });
    }).catch(error => {
      console.error(error);
    });
  }

  const cardStyle = {
    height: '200px' 
  };

  const categoryChartData = {
    series: taxeData, 
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: marciInreg,
      colors: ['#FF4A55', '#1E88E5', '#00E396', '#775DD0', '#FEB019'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  };

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white me-2">
              <i className="mdi mdi-home"></i>
            </span> Dashboard
          </h3>
        </div>
        <div className="row">
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-danger card-img-holder text-white" style={cardStyle}>
              <div className="card-body">
                <img src="../../../assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-2">Utilizatori inregistrati <i className="mdi mdi-account mdi-24px float-end"></i>
                </h4>
                <h2 className="mb-5">{usersNr}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-info card-img-holder text-white" style={cardStyle}>
              <div className="card-body">
                <img src="../../../assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-2">Masini Inregistrate<i className="mdi mdi-car mdi-24px float-end"></i>
                </h4>
                <h2 className="mb-5">{masiniNr}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 stretch-card grid-margin">
            <div className="card bg-gradient-success card-img-holder text-white" style={cardStyle}>
              <div className="card-body">
                <img src="../../../assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-2 w-auto">Cheltuieli inregistrate<i className="mdi mdi-chart-bar mdi-24px float-end"></i>
                </h4>
                <h2 className="mb-5">{cheltuieliNr}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-9 text-left">
            <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Cheltuieli pe marci</h2>
            <ReactApexChart options={categoryChartData.options} series={categoryChartData.series} type="pie" height={350} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
