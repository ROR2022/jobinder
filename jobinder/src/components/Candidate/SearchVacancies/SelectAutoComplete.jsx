import { useEffect, useState } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SelectAutoComplete = ({
  dataSelect,
  handleConsult,
  resetConsult,
  setResetConsult,
  setCurrentPage,
  setPerPage,
  setDataConsult,
}) => {
  const [dataOptions, setDataOptions] = useState(options);
  const [valueSelect, setValueSelect] = useState("Filtrar...");
  useEffect(() => {
    if (dataSelect?.length > 0) {
      formatDataSelect();
    }
  }, [dataSelect]);
  useEffect(() => {
    if (resetConsult === true) {
      setValueSelect("Filtrar...");
    }
  }, [resetConsult]);
  useEffect(() => {}, [valueSelect]);
  const formatDataSelect = () => {
    let tempDataSelect = [];
    dataSelect.forEach((item) => {
      const tempObj = {
        value: item,
        label: item,
      };
      tempDataSelect.push(tempObj);
    });
    setDataOptions([...tempDataSelect]);
  };

  const handleChange = ({ value, label }) => {
    //console.log('evento de change:..',value);
    setResetConsult(false);
    handleConsult(value);
    setValueSelect({ value, label });
    setCurrentPage(1);
    setPerPage(10);
    setDataConsult(value);
  };
  return (
    <Select
      value={valueSelect}
      className="w-75 me-auto ms-auto my-2"
      options={dataOptions}
      placeholder="Buscar..."
      onChange={handleChange}
    />
  );
};

SelectAutoComplete.propTypes = {
  dataSelect: PropTypes.array.isRequired,
  handleConsult: PropTypes.func.isRequired,
  resetConsult: PropTypes.bool.isRequired,
  setResetConsult: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setPerPage: PropTypes.func.isRequired,
  setDataConsult: PropTypes.func.isRequired,
}

export default SelectAutoComplete;
