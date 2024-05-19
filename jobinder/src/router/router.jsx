import { createHashRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import BasicTemplate from "../pages/BasicTemplate";
import Error from "../pages/Error";
import PoliticaPrivacidad from "../components/Landing/PoliticaPrivacidad/PoliticaPrivacidad";
import TYC from "../components/Landing/TYC/TYC";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import UpdatePassword from "../components/UpdatePassword/UpdatePassword";
import CandidateProfile from "../components/Candidate/CandidateProfile/CandidateProfile";
import RecrutierProfile from "../components/Recrutier/RecrutierProfile/RecrutierProfile";
import SearchVacancies from "../components/Candidate/SearchVacancies/SearchVacancies";
import MyVacancies from "../components/Candidate/MyVacancies/MyVacancies";
import Vacancies from "../components/Recrutier/Vacancies/Vacancies";
import Applicants from "../components/Recrutier/Applicants/Applicants";
import AddEditVacancie from "../components/Recrutier/Vacancies/AddEditVacancie";
import VacancieDetail from "../components/Recrutier/Applicants/VacancieDetail";
import RecPanel from "../components/Recrutier/Applicants/RecPanel";

const basicArrayRoutes = [
  {
    path: "/",
    element: (
      <BasicTemplate>
        <Home />
      </BasicTemplate>
    ),
    errorElement: (
      <BasicTemplate>
        <Error />
      </BasicTemplate>
    ),
  },
  {
    path: "/about",
    element: (
      <BasicTemplate>
        <About />
      </BasicTemplate>
    ),
  },
  {
    path: "/PoliticaPrivacidad",
    element: (
      <BasicTemplate>
        <PoliticaPrivacidad />
      </BasicTemplate>
    ),
  },
  {
    path: "/TerminosyCondiciones",
    element: (
      <BasicTemplate>
        <TYC />
      </BasicTemplate>
    ),
  },
  {
    path: "/login",
    element: (
      <BasicTemplate>
        <Login />
      </BasicTemplate>
    ),
  },
  {
    path: "/register",
    element: (
      <BasicTemplate>
        <Register />
      </BasicTemplate>
    ),
  },
  {
    path: "/updatePassword/:email",
    element: (
      <BasicTemplate>
        <UpdatePassword />
      </BasicTemplate>
    ),
  },
  {
    path: "*",
    element: (
      <BasicTemplate>
        <Error />
      </BasicTemplate>
    ),
  },
];

export const basicRouter = createHashRouter([
  ...basicArrayRoutes,
]);


export const candidateRouter = createHashRouter([
  ...basicArrayRoutes,
  {
    path: "/candidateProfile",
    element: (
      <BasicTemplate>
        <CandidateProfile />
      </BasicTemplate>
    ),
  },
  {
    path: "/searchVacancies",
    element: (
      <BasicTemplate>
        <SearchVacancies />
      </BasicTemplate>
    ),
  },
  {
    path: "/myVacancies",
    element: (
      <BasicTemplate>
        <MyVacancies />
      </BasicTemplate>
    ),
  },
  {
    path:"/addEditVacancie",
    element: (
      <BasicTemplate>
        <AddEditVacancie />
      </BasicTemplate>
    ),
  },
]);

export const recruiterRouter = createHashRouter([
  ...basicArrayRoutes,
  {
    path: "/recrutierProfile",
    element: (
      <BasicTemplate>
        <RecrutierProfile />
      </BasicTemplate>
    ),
  },
  {
    path:"/vacancies",
    element: (
      <BasicTemplate>
        <Vacancies />
      </BasicTemplate>
    ),
  },
  {
    path:"/addEditVacancie",
    element: (
      <BasicTemplate>
        <AddEditVacancie />
      </BasicTemplate>
    ),
  },
  {
    path:"/applicants",
    element: (
      <BasicTemplate>
        <Applicants />
      </BasicTemplate>
    ),
  },
  {
    path:"/vacancieDetail",
    element: (
      <BasicTemplate>
        <VacancieDetail />
      </BasicTemplate>
    ),
  },
  {
    path: "/candidateProfile",
    element: (
      <BasicTemplate>
        <CandidateProfile />
      </BasicTemplate>
    ),
  },
  {
    path:"/recPanel",
    element: (
      <BasicTemplate>
        <RecPanel />
      </BasicTemplate>
    ),
  }
]);