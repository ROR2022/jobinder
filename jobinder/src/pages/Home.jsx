//import React from 'react'
import useJob from '../hooks/useJob'
import { useNavigate } from 'react-router-dom';
import Landing from "../components/Landing/Landing"
import { useEffect } from 'react';

const Home = () => {
  const { 4: dataLocalStorage}= useJob();
  const navigate = useNavigate();
  useEffect(() => {
    if(dataLocalStorage.email&&dataLocalStorage.email!==''){
      if(dataLocalStorage.role==='candidate'){
        navigate('/candidateProfile')
      }
      if(dataLocalStorage.role==='recrutier'){
        navigate('/recrutierProfile')
      }
    }
  }, [dataLocalStorage])
  return (
    <div>
      <Landing />
    </div>
  )
}

export default Home