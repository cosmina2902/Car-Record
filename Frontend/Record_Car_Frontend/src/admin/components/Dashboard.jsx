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
      setMarciInreg(marci);

      const promises = marci.map(marca => getTaxeByMarca(marca));

      Promise.all(promises)
        .then(responses => {
          const taxeValues = responses.map(res => res.data);
          setTaxeData(taxeValues);
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

  const colors = [
    '#FF4A55', '#1E88E5', '#00E396', '#775DD0', '#FEB019',
    '#FF4560', '#008FFB', '#FF5733', '#33FF57', '#3357FF',
    '#F3FF33', '#FF33F3', '#4A4AFF', '#FF4A4A', '#4AFF4A',
    '#FF4AFF', '#4A4A4A', '#FF9800', '#E91E63', '#9C27B0',
    '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107',
    '#FF5722', '#795548', '#607D8B', '#9E9E9E', '#FFEB3B',
    '#C0CA33', '#F57C00', '#5D4037', '#546E7A', '#263238',
    '#B0BEC5', '#F44336', '#81C784', '#AED581', '#9575CD',
    '#BA68C8', '#FFB74D', '#A1887F', '#90A4AE', '#E57373',
    '#7986CB', '#64B5F6'
  ];

  const categoryChartData = {
    series: taxeData, 
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: marciInreg,
      colors: colors.slice(0, marciInreg.length), // Assign unique colors to each brand
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
