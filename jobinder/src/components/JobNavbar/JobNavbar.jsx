import { useEffect, useState } from "react";
import BasicNavbar from "./BasicNavbar";
import LoggedNavbar from "./LoggedNavbar";
import useJob from "../../hooks/useJob";

const JobNavbar = () => {
  const { 4: dataLocalStorage } = useJob();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    //console.log('Navbar:...',dataLocalStorage)
    if (dataLocalStorage.email && dataLocalStorage.email !== "") {
      setIsLogged(true);
    }else{
      setIsLogged(false);
    }
  }, [dataLocalStorage]);

  return <>{isLogged ? <LoggedNavbar /> : <BasicNavbar />}</>;
};

export default JobNavbar;
