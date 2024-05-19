import {useEffect} from 'react'
import CardsSection from './CardsSection/CardsSection'
import FAQSection from './FAQSection/FAQSection'
import LandingCarrousel from './LandigCarrousel/LandingCarrousel'
import MidSection from './MidSection/MidSection'
import { useNavigate } from 'react-router-dom'
import useJob from '../../hooks/useJob'

const Landing = () => {
  const { 4: dataLocalStorage } = useJob();
  const navigate = useNavigate();
  useEffect(() => {
    if (dataLocalStorage.email && dataLocalStorage.email !== "") {
      if (dataLocalStorage.role === "candidate") navigate("/candidateProfile");
      if (dataLocalStorage.role === "recruiter") navigate("/recruiterProfile");
    }
  }, [dataLocalStorage]);
  return (
    <div>
        <LandingCarrousel />
        <MidSection />
        <CardsSection />
        <FAQSection />
    </div>
  )
}

export default Landing