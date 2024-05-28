import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCheltuieliAnLuna, getCheltuieliCategorie, getCheltuieliStartEndDate } from '../service/CheltuieliService';
import ReactApexChart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const ChartComponent = () => {
  const { numarInmatriculare } = useParams();
  const [an, setAn] = useState('2024');
  const [monthlySums, setMonthlySums] = useState({
    ian: 0,
    feb: 0,
    mart: 0,
    aprl: 0,
    mai: 0,
    iun: 0,
    iul: 0,
    aug: 0,
    sept: 0,
    oct: 0,
    nov: 0,
    dec: 0,
  });
  const [categorySums, setCategorySums] = useState([0, 0, 0, 0, 0]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (an) {
      fetchAllMonthsData();
      fetchCategoryData();
    }
  }, [numarInmatriculare, an]);

  function fetchAllMonthsData() {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const monthKeys = [
      'ian', 'feb', 'mart', 'aprl', 'mai', 'iun', 'iul', 'aug', 'sept', 'oct', 'nov', 'dec'
    ];

    const promises = months.map((month, index) => {
      return getCheltuieliAnLuna(numarInmatriculare, an, month)
        .then((response) => {
          const totalSum = calculateSumaTotala(response.data);
          return { [monthKeys[index]]: totalSum };
        })
        .catch((error) => {
          console.error(error);
          return { [monthKeys[index]]: 0 };
        });
    });

    Promise.all(promises).then((results) => {
      const newMonthlySums = results.reduce((acc, result) => ({ ...acc, ...result }), {});
      setMonthlySums(newMonthlySums);
      // Update dates array for area chart
      setDates(results.map((result, index) => ({ x: new Date(`2024-${months[index]}-01`), y: Object.values(result)[0] })));
    });
  }

  function fetchCategoryData() {
    const categories = [1, 2, 3, 4, 5];

    const promises = categories.map((category) => {
      return getCheltuieliCategorie(category, numarInmatriculare)
        .then((response) => {
          const totalSum = calculateSumaTotala(response.data);
          return totalSum;
        })
        .catch((error) => {
          console.error(error);
          return 0;
        });
    });

    Promise.all(promises).then((sums) => {
      setCategorySums(sums);
    });
  }

  function calculateSumaTotala(data) {
    return data.reduce((sum, item) => sum + item.suma, 0);
  }

  const colorsArray = [
    '#008FFB', // Blue
    '#00E396', // Green
    '#FEB019', // Yellow
    '#FF4560', // Red
    '#775DD0', // Purple
    '#3F51B5', // Dark Blue
    '#546E7A', // Grey
    '#D4526E', // Pink
    '#8D5B4C', // Brown
    '#F86624', // Orange
    '#D7263D', // Dark Red
    '#1B998B', // Teal
  ];

  const chartData = {
    series: [{
      name: "valoare",
      data: [
        monthlySums.ian,
        monthlySums.feb,
        monthlySums.mart,
        monthlySums.aprl,
        monthlySums.mai,
        monthlySums.iun,
        monthlySums.iul,
        monthlySums.aug,
        monthlySums.sept,
        monthlySums.oct,
        monthlySums.nov,
        monthlySums.dec,
      ]
    }],
    options: {
      chart: {
        height: 500,
        type: 'bar',
      },
      colors: colorsArray,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          'Ianuarie', 
          'Februarie', 
          'Martie', 
          'Aprilie',
          'Mai',
          'Iunie',
          'Iulie',
          'August',
          'Septembrie',
          'Octombrie',
          'Noiembrie',
          'Decembrie'
        ],
        labels: {
          style: {
            colors: colorsArray, 
            fontSize: '12px'
          }
        }
      }
    },
  };

  

  const categoryChartData = {
    series: categorySums,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Cheltuieli cu combustibil', 'Cheltuieli cu service', 'Cheltuieli cu taxe', 'Cheltuieli cu bateria', 'Cheltuieli cu cauciucuri'],
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

  const [categoryMonthlySums, setCategoryMonthlySums] = useState({
    combustibil: [],
    service: [],
    taxe: [],
    baterie: [],
    cauciucuri: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('combustibil');
  
  useEffect(() => {
    if (an) {
      fetchCategoryMonthlyData();
    }
  }, [numarInmatriculare, an]);
  
  function fetchCategoryMonthlyData() {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    const categories = {
      combustibil: 2,
      service: 5,
      taxe: 1,
      baterie: 4,
      cauciucuri: 3 
    };
  
    const promises = Object.keys(categories).map(category => {
      const categoryPromises = months.map(month => {
        return getCheltuieliAnLuna(numarInmatriculare, an, month)
          .then(response => {
            const totalSum = response.data
              .filter(item => item.idCategorieCheltuieli === categories[category])
              .reduce((sum, item) => sum + item.suma, 0);
            return totalSum;
          })
          .catch(error => {
            console.error(error);
            return 0;
          });
      });
  
      return Promise.all(categoryPromises).then(monthlySums => ({ [category]: monthlySums }));
    });
  
    Promise.all(promises).then(results => {
      const newCategoryMonthlySums = results.reduce((acc, result) => ({ ...acc, ...result }), {});
      setCategoryMonthlySums(newCategoryMonthlySums);
    });
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }


  const areaChartData = {
    series: [
      {
        name: `Cheltuieli cu ${selectedCategory}`,
        data: categoryMonthlySums[selectedCategory],
        color: '#D4526E',
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [
          'Ianuarie',
          'Februarie',
          'Martie',
          'Aprilie',
          'Mai',
          'Iunie',
          'Iulie',
          'August',
          'Septembrie',
          'Octombrie',
          'Noiembrie',
          'Decembrie'
        ]
      }
    }
  };

  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-12-31'));

  useEffect(() => {
    if (numarInmatriculare && startDate && endDate) {
      fetchCategoryMonthlyData();
    }
  }, [numarInmatriculare, startDate, endDate]);

  function formatDate(date) {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function fetchCategoryMonthlyData() {
    const categories = {
      combustibil: 2,
      service: 5,
      taxe: 1,
      baterie: 4,
      cauciucuri: 3,
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const promises = Object.keys(categories).map(category => {
      return getCheltuieliStartEndDate(numarInmatriculare, formattedStartDate, formattedEndDate)
        .then(response => {
          const monthlySums = new Array(12).fill(0); // Array to hold sums for each month

          response.data.forEach(item => {
            if (item.idCategorieCheltuieli === categories[category]) {
              const month = new Date(item.data).getMonth(); // Get month from date
              monthlySums[month] += item.suma; // Add sum to corresponding month
            }
          });

          return { [category]: monthlySums };
        })
        .catch(error => {
          console.error(error);
          return { [category]: new Array(12).fill(0) };
        });
    });

    Promise.all(promises).then(results => {
      const newCategoryMonthlySums = results.reduce((acc, result) => ({ ...acc, ...result }), {});
      setCategoryMonthlySums(newCategoryMonthlySums);
    });
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const barChartData = {
    series: [
      {
        name: 'Cheltuieli cu combustibil',
        data: categoryMonthlySums.combustibil,
      },
      {
        name: 'Cheltuieli cu service',
        data: categoryMonthlySums.service,
      },
      {
        name: 'Cheltuieli cu taxe',
        data: categoryMonthlySums.taxe,
      },
      {
        name: 'Cheltuieli cu bateria',
        data: categoryMonthlySums.baterie,
      },
      {
        name: 'Cheltuieli cu cauciucuri',
        data: categoryMonthlySums.cauciucuri,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Ianuarie',
          'Februarie',
          'Martie',
          'Aprilie',
          'Mai',
          'Iunie',
          'Iulie',
          'August',
          'Septembrie',
          'Octombrie',
          'Noiembrie',
          'Decembrie',
        ],
      },
      yaxis: {
        title: {
          text: 'Suma (RON)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + ' RON';
          },
        },
      },
    },
  };
  
  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setAn(selectedYear);
  }
  
  return (
    <>
      <div className='text-center'>
        <h2 className='mt-5'>Statistici cheltuieli</h2>
      </div>
      <br />
      <div className="container mt-4 mb-4">
        <div className="col-12">
          <div className='d-flex justify-content-end align-items-end mb-3'>
            <select className="form-select w-auto" aria-label="Alegeti anul" value={an} onChange={handleYearChange}>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Cheltuieli Totale pe anul {an}</h2>
          <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={400} />
        </div>
      </div>
      <br />
      <div className="container-fluid mt-4">
        <div className="row g-3 p-3">
          <div className="col-6 text-left">
            <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Cheltuieli pe categorii</h2>
            <ReactApexChart options={categoryChartData.options} series={categoryChartData.series} type="pie" height={350} />
          </div>
          <div className="col-6 text-right">
          <div className='d-grid justify-content-end align-items-end mb-3'>
              <select className="form-select w-auto" aria-label="Selecteaza categoria" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="combustibil">Cheltuieli cu combustibil</option>
                <option value="service">Cheltuieli cu service</option>
                <option value="taxe">Cheltuieli cu taxe</option>
                <option value="baterie">Cheltuieli cu bateria</option>
                <option value="cauciucuri">Cheltuieli cu cauciucuri</option>
              </select>
            </div>
            <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Cheltuieli totale pe categoria </h2>
            <ReactApexChart options={areaChartData.options} series={areaChartData.series} type="line" height={350} />
          </div>
        </div>
      </div>


      <div className="container mt-4 mb-4">
        <div className="col-12">
        <div className="d-grid justify-content-end align-items-center mb-3">
            <div className="me-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="start_date"
                name="start_date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div>
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                id="end_date"
                name="end_date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          <h2 style={{ textAlign: 'center', fontSize: '20px' }}>Cheltuieli Totale</h2>
          <ReactApexChart options={barChartData.options} series={barChartData.series} type="bar" height={400} />
        </div>
      </div>
    </>
  );
};

export default ChartComponent;
