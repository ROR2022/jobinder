//import React from 'react'
import { useEffect } from 'react';
import DataTable from "react-data-table-component";
import PropTypes from 'prop-types';

const VacanciesDataTable = ({
    columns,
    data,
    loading,
    perPage,
    totalRows,
    currentPage,
    handlePageChange,
    handlePerRowsChange
}) => {
    useEffect(()=>{

    },[data])
    useEffect(()=>{
        //console.log('nuevo valor de limit(perPage)(son):..',perPage)
    },[perPage])
    useEffect(()=>{

    },[totalRows])
    useEffect(()=>{
      //console.log('nuevo valor de currentPage(son):..',currentPage)
    },[currentPage])
  return (
    <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        responsive
        striped
        pagination
        paginationServer
        paginationPerPage={perPage}
        paginationTotalRows={totalRows}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        highlightOnHover
        dense
      />
  )
}

VacanciesDataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    perPage: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    handlePerRowsChange: PropTypes.func.isRequired
}

export default VacanciesDataTable