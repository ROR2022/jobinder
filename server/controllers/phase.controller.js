import Phase from '../models/phase.model.js'
import User from '../models/user.model.js'
import JobVacancy from '../models/jobvacancy.model.js'
import { notificationContratado, notificationPhaseEmailUser } from '../lib/nodeMailer.js'
//import jwt from 'jsonwebtoken'


export const createPhase = async (req, res) => {
    try {
        const { name, stage } = req.body;
  
        const newPhase = new Phase({
          name,
        });
        await newPhase.save();
        res.status(201).json({ message: "Created Ok", newPhase });
      } catch (error) {
        next(error);
      }
}

export const getPhase = async (req, res, next) => {
    try {
      //const { id } = req.params;
      const { phase } = req.query;
      const infoPhase = await Phase.findOne({ name: phase });
      //console.log("infoPase:..", infoPhase);
      if (!infoPhase) {
        return res.status(404).send({ message: "Phase not found!" });
      } else {
        res.status(201).json({ message: "Get Ok", infoPhase });
      }
    } catch (error) {
      console.log("Error Phase:...", error);
      next(error);
    }
  };


  const updateUserPhaseStatus=(idVacancy,phase,phase_status,emailUser)=>{
    let prevPhase='';
    let newPhase='';
     const tempPhaseStatus = phase_status;
       if(tempPhaseStatus.length===0){
         tempPhaseStatus.push({
           idVacancy,
           phase
         })
       }
       if(tempPhaseStatus.length>0){
         const findVacancy= tempPhaseStatus.find(itemA=>String(itemA.idVacancy)===idVacancy);
 
         if(findVacancy){
           //console.log('vacante encontrada:..',idVacancy);
           tempPhaseStatus.forEach(item=>{
             if(String(item.idVacancy)===idVacancy){
               //console.log('---Analizando usuario:...---',emailUser);
               //console.log('----Fase anterior:...----',item.phase);
               prevPhase=item.phase;
               newPhase=phase;
               item.phase=phase
             }
           })
         }else{
           tempPhaseStatus.push({
             idVacancy,
             phase
           })
         }
 
       }
       //console.log('Subproceso Actualizacion de phase_status:..',tempPhaseStatus);
    return {tempPhaseStatus,prevPhase,newPhase}
   };
   export const updatePhase = async (req, res, next) => {
     const { phase, idVacancie, idCandidate } = req.query;
     //const { _id } = await jwtServices.verify(tokenCandidate);
     console.log(
       "Iniciando Actualizacion de Phase:..",
       phase,
       idVacancie,
       idCandidate
     );
     try {
       
       const dataUser = await User.findById({_id:idCandidate});
       const dataVacancy= await JobVacancy.findById({_id:idVacancie});
       const tempPhaseStatus= updateUserPhaseStatus(idVacancie,phase,dataUser.phase_status)?.tempPhaseStatus;
       //enviaremos notificacion por correo al candidato de su avance
       const resultNotification= await notificationPhaseEmailUser(dataUser,phase,dataVacancy);
       // actualizando status_phase en el candidato
       const resultUpdateSatusPhase= await User.findByIdAndUpdate(
         {_id:idCandidate},
         {phase_status:[...tempPhaseStatus]},
         {new:true})
         console.log('resultUpdatePhaseStatus:..',resultUpdateSatusPhase);
       const resultFind = await Phase.findOne({ name: phase });
       const dataVacancies = resultFind?.vacancies;
       //console.log("dataVacancies:..", dataVacancies);
       const findVacancieInPhase = dataVacancies.find(
         (item) => String(item.idVacancie) === idVacancie
       );
       let tempDataVacancies = [...dataVacancies];
       let caso = "ninguno";
 
       console.log("findVacancieInPhase:..", findVacancieInPhase);
       if (!findVacancieInPhase) {
         caso = "basico";
         tempDataVacancies.push({
           idVacancie: idVacancie,
           applicants: [idCandidate],
         });
       } else {
         caso = "secundario";
         tempDataVacancies = dataVacancies.map((item) => {
           if (String(item.idVacancie) === idVacancie) {
             const tempObj = { ...item };
             let tempArray = [...item.applicants, idCandidate];
             console.log("Nuevo array de datos:..", tempArray);
             tempObj._doc.applicants = [...tempArray];
             return tempObj;
           } else {
             return item;
           }
         });
       }
 
       const resultUpdate = await Phase.findOneAndUpdate(
         { name: phase },
         { vacancies: tempDataVacancies },
         { new: true }
       );
 
       const objRes = {
         namePhase: phase,
         idVacancie,
         idCandidate,
         resultFind,
         dataVacancies,
         resultUpdate,
         caso,
         tempDataVacancies,
         resultNotification
       };
       res.status(200).json(objRes);
     } catch (error) {
       console.log("Error UpdatePhase:...", error);
       next(error);
     }
   };

   export const updatePanel = async (req, res, next) => {
    try {
      const {
        idVacancie,
        listIdsApplicantsPhase1,
        listIdsApplicantsPhase2,
        listIdsApplicantsPhase3,
        listIdsApplicantsPhase4,
      } = req.body;
      const phases = ["Llamada", "Entrevista", "Pruebas", "Contratado"];
      const listas = [
        listIdsApplicantsPhase1,
        listIdsApplicantsPhase2,
        listIdsApplicantsPhase3,
        listIdsApplicantsPhase4,
      ];
      //Notificaremos a los Candidatos su avance 
      const dataVacancy= await JobVacancy.findById({_id:idVacancie});

      for (const phase of phases) {
        const numList = phases.indexOf(phase);

        //Notificaremos a los usuarios de su avance
        for(let user of listas[numList]){
          const dataUser = await User.findById({_id:user});
          const prevPhaseStatus = [...dataUser.phase_status];
          const tempPhaseStatusData= updateUserPhaseStatus(idVacancie,phase,prevPhaseStatus,dataUser.email);
          const tempPhaseStatus= tempPhaseStatusData?.tempPhaseStatus;
          const prevPhase = tempPhaseStatusData.prevPhase;
          const newPhase = tempPhaseStatusData.newPhase;
          const resultUpdateSatusPhase= await User.findByIdAndUpdate(
            {_id:user},
            {phase_status:[...tempPhaseStatus]},
            {new:true})
            //console.log('resultUpdatePhaseStatus:..',resultUpdateSatusPhase);
          const newPhaseStatus= [...tempPhaseStatus];

          if(prevPhase!==newPhase){
            const resultNotification= await notificationPhaseEmailUser(dataUser,phase,dataVacancy);
          }
          if(newPhase==='Contratado'){
            await notificationContratado(dataUser,dataVacancy);
          }
          
        }
        const resFind = await Phase.findOne({ name: phase });
        let tempVacancies = resFind.vacancies;
        const isExistVacancy = tempVacancies.find(
          (el) => String(el.idVacancie) === idVacancie
        );
        if (isExistVacancy) {
          tempVacancies.forEach((item) => {
            if (String(item.idVacancie) === idVacancie) {
              item.applicants = [...listas[numList]];
            }
          });
        } else {
          tempVacancies = [
            ...tempVacancies,
            { idVacancie: idVacancie, applicants: [...listas[numList]] },
          ];
        }

        await Phase.findOneAndUpdate(
          { name: phase },
          { vacancies: tempVacancies },
          { new: true }
        );
      }

      const objRes = {
        idVacancie,
        listIdsApplicantsPhase1,
        listIdsApplicantsPhase2,
        listIdsApplicantsPhase3,
        listIdsApplicantsPhase4,
      };
      res.status(200).json(objRes);
    } catch (error) {
      console.log("Error UpdatePanel:...", error);
      next(error);
    }
  };