import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { getCheltuieliMasina } from '../service/CheltuieliService';

export default function ListCheltuieliComponent() {

    const { numarInmatriculare } = useParams();
    const [cheltuieli, setCheltuieli] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        idCategorieCheltuieli: { value: null, matchMode: FilterMatchMode.EQUALS },
        expired: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const categorii = [
        { label: 'CHELTUIELI_CU_TAXA', value: '1', severity: 'danger' },
        { label: 'CHELTUIELI_CU_COMBUSTIBIL', value: '2', severity: 'success' },
        { label: 'CHELTUIELI_CU_CAUCIUCURI', value: '3', severity: 'info' },
        { label: 'CHELTUIELI_CU_BATERIA', value: '4', severity: 'warning' },
        { label: 'CHELTUIELI_CU_SERVICE', value: '5', severity: null }
    ];

    const listCheltuieli = () => {
        getCheltuieliMasina(numarInmatriculare).then((response) => {
            const updatedCheltuieli = response.data.map(cheltuiala => ({
                ...cheltuiala,
                expired: cheltuiala.dataExpirare ? new Date(cheltuiala.dataExpirare) <= new Date() : false
            }));
            setCheltuieli(updatedCheltuieli);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        listCheltuieli();
    }, [numarInmatriculare]);

    const navigator = useNavigate();

    const categoryTemplate = (rowData) => {
        if (!rowData.idCategorieCheltuieli) {
            return "Necunoscut";
        }
        const category = categorii.find(c => c.value === rowData.idCategorieCheltuieli.toString());
        return category ? <Tag value={category.label} severity={category.severity} /> : "Necunoscut";
    };

    const categoryOptionTemplate = (option) => {
        return <Tag value={option.label} severity={option.severity} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={categorii} onChange={(e) => {
                setFilters({
                    ...filters,
                    idCategorieCheltuieli: { value: e.value, matchMode: FilterMatchMode.EQUALS }
                });
            }} itemTemplate={categoryOptionTemplate} placeholder="Alegeti categoria" className="p-column-filter"
                showClear style={{ minWidth: '8rem', fontSize: '12px' }} />
        );
    };

    const handleDelete = (rowData) => {
        setCheltuieli(cheltuieli.filter(cheltuiala => cheltuiala.id_taxa !== rowData.id_taxa));
    };

    const handleEdit = (rowData) => {
        console.log('Editare:', rowData);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-mr-2 custom-button" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text custom-button" onClick={() => handleDelete(rowData)} />
            </div>
        );
    };

    const expiredBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'pi-check-circle': rowData.expired, 'pi-times-circle': !rowData.expired })}></i>;
    };

    const expiredRowFilterTemplate = (options) => {
        return (
            <TriStateCheckbox value={options.value || undefined} onChange={(e) => {
                setFilters({
                    ...filters,
                    expired: { value: e.value, matchMode: FilterMatchMode.EQUALS }
                });
            }} />
        );
    };

    const goToAddCheltuieli = () => {
        navigator('/add-cheltuieli');
    };

    return (
        <>
            <br /><br />
            <div className="text-center">
                <h2>Cheltuieli pentru masina {numarInmatriculare}</h2>
            </div>
            <br />

            <div className="card-pers">
                <div className="text-right justify-content-end mb-3">
                    <Button className="btn btn-outline-dark" onClick={goToAddCheltuieli}>Adauga cheltuiala</Button>
                </div>
                <DataTable value={cheltuieli} paginator rows={4} responsiveLayout="scroll" filters={filters}
                    filterDisplay="row" globalFilterFields={['idCategorieCheltuieli', 'expired']}>
                    <Column field="data" header="Data" sortable></Column>
                    <Column field="dataExpirare" header="Data Expirare" sortable></Column>
                    <Column field="suma" header="Sumă" sortable></Column>
                    <Column field="tip" header="Tip" sortable></Column>
                    <Column field="idCategorieCheltuieli" header="Categorie"
                        body={categoryTemplate} showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }}
                        filter filterElement={statusRowFilterTemplate} sortable>
                    </Column>
                    <Column header="Expirate" field="expired" dataType="boolean" style={{ minWidth: '6rem' }}
                        body={expiredBodyTemplate} filter filterElement={expiredRowFilterTemplate} />
                    <Column header="Acțiuni" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
                </DataTable>
            </div>
        </>
    );
}
