import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export default function ListCheltuieliComponent() {
    const [expenses, setExpenses] = useState([
        { id_taxa: '1', data: '2024-04-01', data_expirare: '2025-04-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '1' },
        { id_taxa: '8', data: '2024-05-01', data_expirare: '2024-05-01', suma: '350', tip: 'alimentare', id_categorie_cheltuieli: '2' },
        { id_taxa: '10', data: '2024-04-01', data_expirare: '2024-04-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '3' },
        { id_taxa: '11', data: '2024-05-01', data_expirare: '2024-04-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '3' },
        { id_taxa: '1', data: '2024-04-01', data_expirare: '2025-04-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '1' },
        { id_taxa: '8', data: '2024-05-01', data_expirare: '2025-04-01', suma: '350', tip: 'alimentare', id_categorie_cheltuieli: '2' }
    ]);

    const navigator = useNavigate();

    useEffect(() => {
        const updatedExpenses = expenses.map(expense => ({
            ...expense,
            expired: new Date(expense.data_expirare) <= new Date()
        }));
        setExpenses(updatedExpenses);
    }, []);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id_categorie_cheltuieli: { value: null, matchMode: FilterMatchMode.EQUALS },
        expired: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const categorii = [
        { label: 'CHELTUIELI_CU_TAXA', value: '1', severity: 'danger' },
        { label: 'CHELTUIELI_CU_COMBUSTIBIL', value: '2', severity: 'success' },
        { label: 'CHELTUIELI_CU_CAUCIUCURI', value: '3', severity: 'info' },
        { label: 'CHELTUIELI_CU_BATERIA', value: '4', severity: 'warning' },
        { label: 'CHELTUIELI_CU_SERVICE', value: '5', severity: null }
    ];

    const categoryTemplate = (rowData) => {
        const category = categorii.find(c => c.value === rowData.id_categorie_cheltuieli);
        return category ? <Tag value={category.label} severity={category.severity} /> : "Necunoscut";
    };

    const categoryOptionTemplate = (option) => {
        return <Tag value={option.label} severity={option.severity} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={categorii} onChange={(e) => options.filterApplyCallback(e.value)}
                itemTemplate={categoryOptionTemplate} placeholder="Alegeti categoria" className="p-column-filter"
                showClear style={{ minWidth: '8rem', fontSize: '12px' }} />
        );
    };

    const handleDelete = (rowData) => {
        setExpenses(expenses.filter(expense => expense.id_taxa !== rowData.id_taxa));
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
            <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
        );
    };

    function goToAddCheltuieli(){
        navigator('/add-cheltuieli')
    }

    return (
        <>
            <br /><br />
            <div className="text-center">
                <h2>Cheltuieli pentru masina x</h2>
            </div>
            <br />

            <div className="card-pers">
                <div className="text-right justify-content-end mb-3">
                    <Button className="btn btn-outline-dark" onClick={goToAddCheltuieli}>Adauga cheltuiala</Button>
                </div>
                <DataTable value={expenses} paginator rows={4} responsiveLayout="scroll" filters={filters}
                    filterDisplay="row" globalFilterFields={['id_categorie_cheltuieli', 'expired']}>
                    <Column field="data" header="Data" sortable></Column>
                    <Column field="data_expirare" header="Data Expirare" sortable></Column>
                    <Column field="suma" header="Sumă" sortable></Column>
                    <Column field="tip" header="Tip" sortable></Column>
                    <Column field="id_categorie_cheltuieli" header="Categorie"
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
