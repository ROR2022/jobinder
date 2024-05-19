import JobVacancy from "../models/jobvacancy.model.js";
import User from "../models/user.model.js";
import { uploadOneFileToBucket } from "../lib/awsLib.js";
import { AWS_BUCKETNAME } from "../config.js";
import { sendRejectEmail, sendMailsCandidatesInVacancy } from "../lib/nodeMailer.js";
import jwt from "jsonwebtoken";
import fs from "fs";
//import { populate } from "dotenv";

const mainDir = process.cwd();

export const getVacanciesService = async (req, res, next) => {
    //console.log("Recuperando datos de las ofertas de empleo:..");
    try {
      const { page=1, limit=10 } = req.query;
      const query = {};
      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: "desc" },
        populate: "applicants",
        populate: "job_skills",
        populate: "rejecteds"
      };
      await JobVacancy.paginate(query, options, (err, docs) => {
        //console.log(docs);
        res.send({
          item: docs,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export const createVacancyService = async (req, res, next) => {
    let objRes = {};
    try {
      //const { token } = req.params;
      //const { _id } = await jwtServices.verify(token);

      // ----------------------------------- ADD AVATAR_URL
      const {
        userToken,
        username,
        companyName,
        avatar_url,
        title,
        type,
        mode,
        city,
        salary,
        activities,
        status,
        job_skills,
      } = req.body;
      const { _id } = await jwt.verify(userToken, process.env.JWT_SECRET);
      if(!_id) return res.status(401).json({message:'Unauthorized'});
      const bodyParams = { ...req.body, username: _id };
      let tempArrTask = [];

      if (activities) {
        if (Array.isArray(activities)) {
          for (let task of activities) {
            tempArrTask.push(JSON.parse(task));
          }
          bodyParams.activities = [...tempArrTask];
        } else {
          const newAct = JSON.parse(activities);
          tempArrTask.push(newAct);
          bodyParams.activities = [...tempArrTask];
        }
      }

      console.log("bodyParams:..", bodyParams);
      const file = req?.files?.image;
      objRes = {
        bodyParams,
        file,
      };
      const newVacancy = new JobVacancy({
        ...bodyParams,
      });
      await newVacancy.save();
      const user = await User.findById({ _id: _id });
      user.company_names.push(newVacancy);
      await user.save({ validateBeforeSave: false });
      // res.status(201).json({message:'Create Ok',newVacancy});
      // const {} = newVacancy;
      const id = newVacancy._id;
      //console.log("id vacancy", id);
      if (file) {
        const responseUploadFile = await uploadOneFileToBucket(file, id);
        if (responseUploadFile) {
          bodyParams.avatar_url = `https://${AWS_BUCKETNAME}.s3.amazonaws.com/${id}/${file.name}`;
          const updatedVacancy = await JobVacancy.findByIdAndUpdate(
            { _id: id },
            { ...bodyParams },
            { new: true }
          );

          if (updatedVacancy) {
             res.status(201).json({ message: "Created Ok", updatedVacancy });
          } else {
             res.status(404).send({ message: "Not Created!" });
          }
          fs.unlink(`${mainDir}/${file.tempFilePath}`, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully deleted the file.");
            }
          });
        }
      } else {
        console.log("Falto imagen", file);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export const updateVacancyService = async (req, res, next) => {
    try {
      const { idVacancie } = req.params;
      const { userToken, username, companyName, avatar_url, title, type, mode, city, salary, activities, status, job_skills, deleteApplicant } = req.body;
      const { _id, role } = await jwt.verify(userToken, process.env.JWT_SECRET);
      if(!_id) return res.status(401).json({message:'Unauthorized'});
      const bodyParams = { ...req.body };
      let tempArrTask = [];
      if (activities) {
        if (Array.isArray(activities)) {
          for (let task of activities) {
            tempArrTask.push(JSON.parse(task));
          }
          bodyParams.activities = [...tempArrTask];
        } else {
          const newAct = JSON.parse(activities);
          tempArrTask.push(newAct);
          bodyParams.activities = [...tempArrTask];
        }
      }
      if (userToken&&role==='candidate') {
        //const { _id } = await jwtServices.verify(bodyParams.token);
        const retriveDataVacancie = await JobVacancy.findById(idVacancie);
        //este caso es cuando se agrega un id al array de applicants
        if (deleteApplicant===undefined) {
          if (retriveDataVacancie?.applicants) {
            bodyParams.applicants = [...retriveDataVacancie.applicants, _id];
          } else {
            bodyParams.applicants = [_id];
          }
          delete bodyParams.token;
        }
        //este es el caso cuando se elimina un id del array de applicants
        if (deleteApplicant===true) {
          if (retriveDataVacancie?.applicants) {
            bodyParams.applicants = retriveDataVacancie.applicants.filter(
              (item) => String(item._id) !== String(_id)
            );
          }
          delete bodyParams.deleteApplicant;
          delete bodyParams.userToken;
        }
        console.log("--------(NUEVOS DATOS...)bodyParams:..", bodyParams);
      }
      const file = req?.files?.image;
      if (file) {
        const responseUploadFile = await uploadOneFileToBucket(file, idVacancie);
        //console.log("responseUploadFile:..", responseUploadFile);
        if (responseUploadFile) {
          bodyParams.avatar_url = `https://${AWS_BUCKETNAME}.s3.amazonaws.com/${idVacancie}/${file.name}`;
          const updatedVacancy = await JobVacancy.findByIdAndUpdate(
            { _id: idVacancie },
            { ...bodyParams },
            { new: true }
          );
          //console.log("updatedVacancy:..", updatedVacancy);
          if (updatedVacancy) {
              res.status(201).json({ message: "Created Ok", updatedVacancy });
          } else {
             res.status(404).send({ message: "Not Created!" });
          }
          fs.unlink(`${mainDir}/${file.tempFilePath}`, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully deleted the file.");
            }
          });
        }
        return;
      } else {
        console.log("Falto imagen", file);
      }
      const updatedVacancy = await JobVacancy.findByIdAndUpdate(
        { _id: idVacancie },
        { ...bodyParams },
        { new: true }
      );
      if (updatedVacancy) {
        res.status(201).json({ message: "Updated Ok", updatedVacancy });
      } else {
        res.status(404).send({ message: "Not Updated!" });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  export const getVacancyByIdService = async (req, res, next) => {
    try {
      const { idVacancie } = req.params;
      //console.log("idVacancie:..", idVacancie);
      const infoVacancy = await JobVacancy
        .findById(idVacancie)
        .populate("applicants")
        .populate("job_skills");
      if (!infoVacancy) {
        return res.status(404).send({ message: "Vacancy not found!" });
      }
      res.status(201).send({ infoVacancy });
      //console.log("datos por vacante", infoVacancy);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export const getVacanciesByRecrutierIdService = async (req, res, next) => {
    try {
      const { token, page=1, limit=10 } = req.query;
      const { _id } = await jwt.verify(token, process.env.JWT_SECRET);
      console.log("token(idRecrutier):..", _id);
      if(!_id) return res.status(401).json({message:'Unauthorized'});
      const query = { username: _id };
      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: "desc" },
      };
      await JobVacancy.paginate(query, options, (err, docs) => {
        //console.log(docs);
        res.status(201).json({ item:docs });
      });
      
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const getTitlesVacancies = async (req, res, next) => {
    let objRes = {};
    try {
      const distinctTitles = await JobVacancy.distinct("title");
      let tempDataTitles = [];
      if (distinctTitles) {
        distinctTitles.forEach((item) => {
          const tempItem = item?.toLowerCase().trim();
          const findItem = tempDataTitles.find(
            (el) => el.toLowerCase().trim() === tempItem
          );
          if (!findItem) {
            tempDataTitles.push(item);
          }
        });
      }
      const distinctCompanies = await JobVacancy.distinct("companyName");
      let tempDataCompanies = [];
      if (distinctCompanies) {
        distinctCompanies.forEach((item) => {
          const tempItem = item?.toLowerCase().trim();
          const findItem = tempDataCompanies.find(
            (el) => el.toLowerCase().trim() === tempItem
          );
          if (!findItem) {
            tempDataCompanies.push(item);
          }
        });
      }
      const distinctTypes = await JobVacancy.distinct("type");
      let tempDataTypes = [];
      if (distinctTypes) {
        distinctTypes.forEach((item) => {
          const tempItem = item?.toLowerCase().trim();
          const findItem = tempDataTypes.find(
            (el) => el.toLowerCase().trim() === tempItem
          );
          if (!findItem) {
            tempDataTypes.push(item);
          }
        });
      }
      const distinctModes = await JobVacancy.distinct("mode");
      let tempDataModes = [];
      if (distinctModes) {
        distinctModes.forEach((item) => {
          const tempItem = item?.toLowerCase().trim();
          const findItem = tempDataModes.find(
            (el) => el.toLowerCase().trim() === tempItem
          );
          if (!findItem) {
            tempDataModes.push(item);
          }
        });
      }
      const distinctCities = await JobVacancy.distinct("city");
      let tempDataCities = [];
      if (distinctCities) {
        distinctCities.forEach((item) => {
          const tempItem = item?.toLowerCase().trim();
          const findItem = tempDataCities.find(
            (el) => el.toLowerCase().trim() === tempItem
          );
          if (!findItem) {
            tempDataCities.push(item);
          }
        });
      }
      objRes = {
        distinctCompanies: tempDataCompanies,
        distinctTitles: tempDataTitles,
        distinctTypes: tempDataTypes,
        distinctModes: tempDataModes,
        distinctCities: tempDataCities,
      };
      res.status(200).json(objRes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export const getDataConsult = async (req, res, next) => {
    const { value, page, limit } = req.query;
    try {

      const query = {
        $or: [
          { title: value },
          { companyName: value },
          { type: value },
          { city: value },
          { mode: value },
        ],
        status:'Iniciado',
      };
      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: "desc" },
        populate: "applicants",
        populate: "job_skills",
        // status:'Iniciado'
      };

      /*
      const resultConsult = await jobVacancy.find({
        $or: [
          { title: value },
          { companyName: value },
          { type: value },
          { city: value },
          { mode: value },
        ],
      });*/
      await JobVacancy.paginate(query, options, (err, docs) => {
        res.status(200).json({
          item: docs,
        });
      });
      //res.status(200).json(resultConsult);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export const getUsersInVacancie = async (req, res, next) => {
    try {
      const { idVacancie, page=1, limit=10 } = req.query;
      const query = { _id: idVacancie };
      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: "desc" },
        populate: "applicants",
      };
      await JobVacancy.paginate(query, options, (err, docs) => {
        res.status(200).json({
          item: docs,
        });
      });

      
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const updateListApplicantsInVacancie = async (req, res, next) => {
    const { idCandidate, idVacancy, emailUser } = req.body;
    //console.log("emailUser:..", emailUser);
    try {
      const result = await JobVacancy.findByIdAndUpdate(
        { _id: idVacancy },
        {
          $addToSet: { rejecteds: idCandidate },
          $pull: { applicants: idCandidate },
          
        },
        { new: true }
      );
      const findUser = await User.findById({ _id: idCandidate });
      let tempDataPhaseStatus = [];
      if (findUser) {
        if (findUser?.phase_status?.length > 0) {
          tempDataPhaseStatus = [...findUser.phase_status];
          const newPhaseStatus = tempDataPhaseStatus?.filter(
            (el) => String(el.idVacancy) === String(idVacancy)
          );
          tempDataPhaseStatus = [...newPhaseStatus];
        } else {
          tempDataPhaseStatus = [...tempDataPhaseStatus];
        }
      }
      const updateUserMyVacancies = await User.findByIdAndUpdate(
        { _id: idCandidate },
        {
          $pull: { my_vacancies: idVacancy },
          phase_status: [...tempDataPhaseStatus],
        },
        { new: true }
      );
      sendRejectEmail(updateUserMyVacancies, result);
      //console.log('resultUpdate (jobVacancyController):..',{result,updateUserMyVacancies});
      res.status(200).json({ result, updateUserMyVacancies });
    } catch (error) {
      console.log("Error en JobVacancy:..", error);
      next(error);
    }
  };

  export const closeVacancy = async (req, res, next) => {
    let objRes = {};
    try {
      const { idVacancy, listIdsApplicants } = req.body;

      const resultCloseVacancy = await JobVacancy.findByIdAndUpdate(
        { _id: idVacancy },
        { status: "Cerrado" },
        { new: true }
      );
      const dataVacancy = { ...resultCloseVacancy?._doc };
      objRes = {
        idVacancy,
        listIdsApplicants,
        resultCloseVacancy,
      };

      if (listIdsApplicants) {
        let listMailsCandidates = [];
        for (let i = 0; i < listIdsApplicants.length; i++) {
          const dataApplicant = await User.findById(listIdsApplicants[i]);
          if (dataApplicant?.email) {
            listMailsCandidates.push(dataApplicant.email);
          }
        }
        if (listMailsCandidates.length > 0) {
          const stringMails = listMailsCandidates.toString();
          console.log("dataVacancy(enviando datos a NodeMailer):..", dataVacancy);
          const resultSendMails = await sendMailsCandidatesInVacancy(
            stringMails,
            dataVacancy
          );
          objRes = {
            ...objRes,
            listMailsCandidates,
            stringMails,
            resultSendMails,
          };
        }
      }

      res.status(200).json(objRes);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };