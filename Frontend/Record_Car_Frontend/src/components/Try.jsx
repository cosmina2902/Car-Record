import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';

export default function Try() {
    const [expenses] = useState([
        { id_taxa: '1', data: '2024-04-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '1' },
        { id_taxa: '8', data: '2024-05-01', suma: '350', tip: 'alimentare', id_categorie_cheltuieli: '2' },
        { id_taxa: '10', data: '2024-04-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '3' },
        { id_taxa: '11', data: '2024-05-01', suma: '234', tip: 'schimb', id_categorie_cheltuieli: '3' }
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.value);
    };

    const filters = selectedCategory ? { id_categorie_cheltuieli: { value: selectedCategory, matchMode: 'equals' } } : {};

    return (
        <div className="card">
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <Dropdown value={selectedCategory} options={categorii} onChange={handleCategoryChange}
                          optionLabel="label" placeholder="Alegeti categoria" showClear
                          style={{ width: '300px' }} />
            </div>
            <DataTable value={expenses} paginator rows={6} responsiveLayout="scroll" filters={filters}>
                
                <Column field="data" header="Data" sortable></Column>
                <Column field="suma" header="Sumă" sortable></Column>
                <Column field="tip" header="Tip" sortable></Column>
                <Column field="id_categorie_cheltuieli" header="Categorie" body={categoryTemplate} sortable>   
                </Column>
            </DataTable>
        </div>
    );
}
