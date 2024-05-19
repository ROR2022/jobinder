import { getRandomInt } from "../lib/helperLib.js";
import { sendCodeEmail } from "../lib/nodeMailer.js";
import User from "../models/user.model.js";
import JobVacancy from "../models/jobVacancy.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { JWT_EXPIRESIN, JWT_SECRET } from "../config.js";
import { uploadOneFileToBucket } from "../lib/awsLib.js";
import {AWS_BUCKETNAME} from "../config.js";
import fs from "fs";
//import _ from "mongoose-paginate-v2";



export const getAllUser = async (req, res, next) => {
    console.log("Recuperando datos de los usuarios:..");
    try {
      const { page, limit } = req.query;
      const query = {};
      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: "desc" },
      };
      await User.paginate(query, options, (err, docs) => {
        console.log(docs);
        res.send({
          item: docs,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  export const findUserByEmail = async (req, res, next) => {
    //console.log("Recuperando datos de los usuarios por email:..");
    const regexEmail = /\S+@\S+\.\S+/;
    try {
      const { email } = req.params;
      console.log("Recuperando datos de los usuarios por email:..", email);
      //distinguir si es un email o un id
      if (!regexEmail.test(email)) {
        const user = await User.findById(email)
          .populate("my_vacancies")
          .populate("user_skills");
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json("Usuario no encontrado");
        }
      } else {
        const user = await User.findOne({ email })
          .populate("my_vacancies")
          .populate("user_skills");
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json("Usuario no encontrado");
        }
      }
      
    }
    catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const loginUser = async (req, res, next) => {
    console.log("Login de usuario:..", req.body);
    try {
       const { email, password, role } = req.body;
       
      const resUser = await User.findOne({ email })
        .populate("my_vacancies")
        .populate("user_skills")
        .populate("working_experience")
        .populate("phase_status")
        .populate("company_names");
      if (!resUser) {
        console.log("Usuario no encontrado");
        return res.status(404).json("Usuario no encontrado");
      }
      const validPassword = await bcrypt.compare(password, resUser.password);
      if (!validPassword) {
        console.log("Contraseña incorrecta");
        return res.status(400).json("Contraseña incorrecta");
      }
      //create token
      const accessToken = jwt.sign(
        {
          _id: resUser._id,
          email, 
          role
        }, JWT_SECRET, {expiresIn: JWT_EXPIRESIN});
        let dataUser = {};
        if(resUser){
        const {_id,password, ...user} = resUser._doc;
        dataUser = {...user, accessToken};
        }
        console.log("Login de usuario Exitoso:..", dataUser);
      return res.status(200).json({msg:'Login de usuario:..', user:dataUser});
      
    }
    catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const registerUser = async (req, res, next) => {
    console.log("Registro de usuario:..", req.body);
    try {
      const { email, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10);
       const resUser = new User({ email, password:hash, role });
      await resUser.save();
      //create token
      const accessToken = jwt.sign(
        {
          _id: resUser._id,
          email, 
          role
        }, JWT_SECRET, {expiresIn: JWT_EXPIRESIN});
        let dataUser = {};
        if(resUser){
        const {_id,password, ...user} = resUser._doc;
        dataUser = {...user, accessToken};
        }
      res.status(200).json({msg:'Registro de usuario:..', user:dataUser});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const sendCode = async (req, res, next) => {
    //console.log("Enviando código de verificación:..");
    try {
      const { email } = req.params;
      console.log("Enviando código de verificación:..", email);
      const code = getRandomInt(1000, 9999);
      const result = await sendCodeEmail({ email, code });
      res.status(200).json({msg:'Enviando código de verificación:..', code});
    }
    catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const updatePassword = async (req, res, next) => {
    console.log("Actualizando contraseña:..", req.body);
    try {
      const { email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const resUser = await User.findOneAndUpdate({ email }, { password: hash });
      if (resUser) {
        const {_id,password, ...user} = resUser._doc;
        //crear token
        const accessToken = jwt.sign(
          {
            _id: resUser._id,
            email: resUser.email,
            role: resUser.role
          }, JWT_SECRET, {expiresIn: JWT_EXPIRESIN});
          const dataUser = {...user, accessToken};
        res.status(200).json({msg:'Contraseña actualizada con éxito:..', user:dataUser});
      } else {
        res.status(404).json("Usuario no encontrado");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const updateProfile = async (req, res, next) => {
    let objRes = {};
    console.log("Actualizando dataUser:..", req.body);
    

    //debuging 1
    try {
      const { token } = req.params;
      console.log("token:..", token);
      const { _id, password } = await jwt.verify(token, JWT_SECRET);
      const bodyParams = { ...req.body };
      const {working_experience, my_vacancies}=bodyParams;
      let tempArrarExp=[];
      if(working_experience){
        if(Array.isArray(working_experience)){
          //console.log('tamaño del working_experience...',working_experience.length);
          if(working_experience?.length>0){
            for (let i=0;i<working_experience.length;i++){
              //console.log(`Agregando experiencia (${i}):..`,working_experience[i]);
              tempArrarExp.push(JSON.parse(working_experience[i] ) );
            }
            bodyParams.working_experience=[...tempArrarExp];
          }
        }else{
          if(working_experience!=='none'){
            tempArrarExp.push(JSON.parse(working_experience))
            bodyParams.working_experience=[...tempArrarExp];
          }
          if(working_experience==='none'){
            bodyParams.working_experience=[...tempArrarExp]
          }
          
        }
      }
      /* if(my_vacancies){
        tempArrarExp=[];
        if(Array.isArray(my_vacancies)){
          
          if(my_vacancies?.length>0){
            for (let i=0;i<my_vacancies.length;i++){
              
              tempArrarExp.push(JSON.parse(my_vacancies[i] ) );
            }
            bodyParams.my_vacancies=[...tempArrarExp];
          }
        }else{
          if(my_vacancies!==''){
            tempArrarExp.push(JSON.parse(my_vacancies))
            bodyParams.my_vacancies=[...tempArrarExp];
          }
          if(working_experience===''){
            bodyParams.my_vacancies=[]
          }
          
        }
      } */
      const file = req?.files?.image;
      const mainDir = process.cwd();
      //console.log("file:..", file);
      //console.log("mainDir:..", mainDir);
      if (bodyParams?.password !== "" && bodyParams?.password !== undefined) {
        const tempPass = bodyParams.password;
        const hashedPassword = await bcrypt.hash(tempPass, 10);
        bodyParams.password = hashedPassword;
      } else {
        bodyParams.password = password;
      }

      objRes = {
        bodyParams,
        file,
      };
      if (file) {
        const responseUploadFile = await uploadOneFileToBucket(file, _id);
        if (responseUploadFile) {
          bodyParams.avatar_url = `https://${AWS_BUCKETNAME}.s3.amazonaws.com/${_id}/${file.name}`;
          const updateUser = await User.findByIdAndUpdate(_id, bodyParams, {
            new: true,
          })
            .populate("my_vacancies")
            .populate("user_skills");
          if (!updateUser) {
            res.status(404).send({ message: "User not found!" });
          } else {
            delete updateUser.password;
            delete updateUser._id;
            res.status(201).json({ message: "Update User Ok", updateUser });
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
        const updateUser = await User.findByIdAndUpdate(_id, bodyParams, {
          new: true,
        })
          .populate("my_vacancies")
          .populate("user_skills")
          .populate("working_experience")
          .populate("phase_status");
        if (!updateUser) {
          res.status(404).send({ message: "User not found!" });
        } else {
          delete updateUser.password;
          delete updateUser._id;
          res.status(201).json({ message: "Update User Ok", updateUser });
        }
      }
      //res.status(200).json(objRes)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  export const getAllUsersInVacancy = async (req, res, next) => {
    try {
      
      const { id,page, limit } = req.query;

      const query = {
        my_vacancies: `${id}`,
      };
      const options = {
        page: page,
        limit: limit,
        sort: { createdAt: "asc" },
        populate: "user_skills",
      };

      await User.paginate(query, options, (err, docs) => {
        console.log(docs);
        res.status(200).send({
          item: docs,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };