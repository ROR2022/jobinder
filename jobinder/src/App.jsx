import { useState,useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { basicRouter, candidateRouter, recruiterRouter } from './router/router'
import './App.css'
import { useLocalStorage } from "usehooks-ts";
//import { useNavigate } from "react-router-dom";
import JobContext from "./context/JobContext";


function App() {
  const [dataLocalStorage, setDataLocalStorage] = useLocalStorage(
    "accessToken",
    true
  );
  const [dataRecruiter, setDataRecruiter] = useState({});
  const [dataCandidate, setDataCandidate] = useState({});
  const [myRouter, setMyRouter] = useState(basicRouter);
  //const navigate = useNavigate();

  useEffect(() => {
    if (dataLocalStorage?.role === "candidate") {
      setDataCandidate(dataLocalStorage);
      setMyRouter(candidateRouter)
      //navigate("/dashboard-candidato/search");
    }
    if (dataLocalStorage?.role === "recrutier") {
      setDataRecruiter(dataLocalStorage);
      setMyRouter(recruiterRouter)
      //navigate("/dashboard-recruiter/vacancy");
    }
  }, []);

  useEffect(() => {
    //console.log("Actualizando dataLocalStorage:..");
    //console.log("Role: ", dataLocalStorage?.role);
    if (dataLocalStorage?.role === "candidate") {
      setDataCandidate(dataLocalStorage);
      setMyRouter(candidateRouter)
      
    }
    if (dataLocalStorage?.role === "recrutier") {
      setDataRecruiter(dataLocalStorage);
      setMyRouter(recruiterRouter)
    }
  }, [dataLocalStorage]);

  useEffect(() => {
    
  }, [dataCandidate, dataRecruiter]);

  return (
    <>
    <JobContext.Provider
      value={[
        dataCandidate,
        setDataCandidate,
        dataRecruiter,
        setDataRecruiter,
        dataLocalStorage,
        setDataLocalStorage,
      ]}
    >
      <RouterProvider router={myRouter}/>
      </JobContext.Provider>
    </>
  )
}

export default App
