import nodemailer from "nodemailer";
import { linksImgs, rorLinks } from "./linksImgs.js";
import  { USER_MAILER, PASS_MAILER } from "../config.js";

//integrando

const stringFooter = `
<div style="background-color: #498ba6">
<ul
  class=""
  style="
    display: block;
    margin-top: 50px;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
    width: 350px;
    padding-left: 0%;
  "
>
  <li style="display: inline; vertical-align: middle; margin-left: 10px">
    <a
      href=${rorLinks.rorLinkedin}
    >
      <img
        width="40px"
        style="border-radius: 50%; background-color: #ddd"
        src=${linksImgs.logoLinkedin}
        alt="linkedin"
      />
    </a>
  </li>
  <li style="display: inline; vertical-align: middle; margin-left: 10px">
    <a href=${rorLinks.rorGithub}>
      <img
        width="40px"
        style="border-radius: 50%"
        src=${linksImgs.logoGithub}
        alt="github"
      />
    </a>
  </li>
  <li style="display: inline; vertical-align: middle; margin-left: 10px">
    <a
      href=${rorLinks.rorCV}
    >
      <img
        width="40px"
        style="border-radius: 50%"
        src=${linksImgs.logoCV}
        alt="rorCV"
      />
    </a>
  </li>
  <li style="display: inline; vertical-align: middle; margin-left: 10px">
    <a href=${rorLinks.rorCode}>
      <img
        width="40px"
        style="border-radius: 50%"
        src=${linksImgs.logoCode}
        alt="jobinderCode"
      />
    </a>
  </li>
</ul>
<div style="text-align: center; color: #fff; width: 100%">
  © Jobinder 2023. All Rights Reserved.
</div>
</div>
`;
export const sendCodeEmail = async (objEmail) => {
  console.log("objEmail:..", objEmail);
  
  let objRes = {
    msg: "Enviando Email al usuario:..",
  };
  const userNameEmail = objEmail.email.split("@")[0];
  const confirmPage = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>EmailCode</title>
    </head>
    <!-- src="" -->
    <body>
      <div>
        <a href=${rorLinks.jobinderDeploy}>
          <img
            width="30%"
            style="
              display: block;
              margin-left: auto;
              margin-right: auto;
              margin-top: 1%;
              margin-bottom: 1%;
            "
            src=${linksImgs.mainLogo}
            alt="logo"
          />
        </a>
        <h3 style="text-align: center; color: #666; font-size: 14px">
          Bienvenid@:
          <span style="color: #000; font-size: 18px">${userNameEmail}</span>
          tu código de acceso es:
        </h3>
        <h1
          style="
            text-align: center;
            color: #444;
            background-color: aqua;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
          "
        >
          ${objEmail.code}
        </h1>
        ${stringFooter}
      </div>
    </body>
  </html>  
  `;

  try {
    //console.log("USER_MAILER:..", USER_MAILER);
    //console.log("PASS_MAILER:..", PASS_MAILER);
    const transporter = nodemailer.createTransport({
      host: "mail.gmx.com",
      port: 587,
      secure: false,
      auth: {
        user: USER_MAILER,
        pass: PASS_MAILER,
      },
    });

    let mailOptions = {
      from: USER_MAILER,
      to: objEmail.email,
      subject: `Tu Código de Acceso es: ${objEmail.code}`,
      html: confirmPage,
    };

    //aqui verificamos que el mailerService esta activo
    transporter.verify(function (error, success) {
      if (error) {
        console.log("No responde el mailerService:..", error);
      } else {
        console.log("Server is ready to take our messages:..");
      }
    });

    const result = await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
          objRes = {
            ...objRes,
            estatus: "Error al enviar email",
            message: error,
          };
          console.log(objRes);
          return objRes;
        } else {
          console.log("Email enviado: " + info.response);
          //await addToLoggerNewUserFile(`Result del envio del Código..${result}`);
          objRes = {
            ...objRes,
            estatus: "Email enviado",
            message: info.response,
          };
          console.log(objRes);
          return objRes;
        }
      }
    );

    objRes = {
      ...objRes,
      result: result ? result : "",
    };

    return objRes;
  } catch (error) {
    return error;
  }
};

export const sendRejectEmail = async (dataUser, dataVacancy) => {
  //console.log('objEmail:..',objEmail);
  let objRes = {
    msg: "Enviando Email al usuario:..",
  };
  const emailUser = dataUser.email;
  const userNameEmail = dataUser.name;
  const confirmPage = `
  <div>
  <a style="display: block;" href="https://web.jobinder.org/">
    <img
      width="30%"
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1%;
        margin-bottom: 1%;
      "
      src="https://frontjobinderimg.s3.amazonaws.com/logo.png"
      alt="logo"
    />
  </a>
  <h3 style="text-align: center; color: #666; font-size: 14px">
    Hola:
    <span style="color: #000; font-size: 18px">${userNameEmail}</span>
    Respecto a la Vacante:
    <span style="color: #000; background-color: aqua">${dataVacancy.title}</span>
    de la empresa:
    <span style="color: #000; background-color: aqua">${dataVacancy.companyName}</span>
    Agradecemos tu Interes pero hemos decidido no continuar con tu proceso
    de reclutamiento, seguiremos en contacto por si hay algun cambio mas
    adelante buen dia.
  </h3>
  ${stringFooter}
</div>
`;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.gmx.com",
      port: 587,
      secure: false,
      auth: {
        user: USER_MAILER,
        pass: PASS_MAILER,
      },
    });

    let mailOptions = {
      from: USER_MAILER,
      to: emailUser,
      subject: `FeedBack Jobinder`,
      html: confirmPage,
    };

    //aqui verificamos que el mailerService esta activo
    transporter.verify(function (error, success) {
      if (error) {
        console.log("No responde el mailerService:..", error);
      } else {
        console.log("Server is ready to take our messages:..");
      }
    });

    const result = await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
          objRes = {
            ...objRes,
            estatus: "Error al enviar email",
            message: error,
          };
          console.log(objRes);
          return objRes;
        } else {
          console.log("Email enviado: " + info.response);
          //await addToLoggerNewUserFile(`Result del envio del Código..${result}`);
          objRes = {
            ...objRes,
            estatus: "Email enviado",
            message: info.response,
          };
          console.log(objRes);
          return objRes;
        }
      }
    );

    objRes = {
      ...objRes,
      result: result ? result : "",
    };

    return objRes;
  } catch (error) {
    return error;
  }
};

export const sendMailsCandidatesInVacancy = async (listMails, dataVacancy) => {
  console.log("dataVacancy(recibiendo datos):..", dataVacancy);
  const tempMails =
    "rami.ror279@gmail.com,miguelangel.serapio@iest.edu.mx,cinthizz1997@gmail.com";

  let objRes = {
    msg: "Enviando Email al usuario:..",
  };
  //const userNameEmail = emailUser.split("@")[0];
  const confirmPage = `
  <div>
  <a style="display: block;" href="https://web.jobinder.org/">
    <img
      width="30%"
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1%;
        margin-bottom: 1%;
      "
      src="https://frontjobinderimg.s3.amazonaws.com/logo.png"
      alt="logo"
    />
  </a>
  <h3 style="text-align: center; color: #666; font-size: 14px">
    Respecto a la Vacante:
    <span style="color: #000; background-color: aqua">${dataVacancy.title}</span>
    de la empresa:
    <span style="color: #000; background-color: aqua">${dataVacancy.companyName}</span>
    Agradecemos tu Interes en el proceso de reclutamiento, pero por el momento esta vacante ya se encuentra cerrada,
    seguiremos en contacto por si hay algun cambio mas adelante buen dia.
  </h3>
  ${stringFooter}
</div>
`;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.gmx.com",
      port: 587,
      secure: false,
      auth: {
        user: USER_MAILER,
        pass: PASS_MAILER,
      },
    });

    let mailOptions = {
      from: USER_MAILER,
      to: listMails,
      subject: `FeedBack Jobinder`,
      html: confirmPage,
    };

    //aqui verificamos que el mailerService esta activo
    transporter.verify(function (error, success) {
      if (error) {
        console.log("No responde el mailerService:..", error);
      } else {
        console.log("Server is ready to take our messages:..");
      }
    });

    const result = await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
          objRes = {
            ...objRes,
            estatus: "Error al enviar email",
            message: error,
          };
          console.log(objRes);
          return objRes;
        } else {
          console.log("Email enviado: " + info.response);
          //await addToLoggerNewUserFile(`Result del envio del Código..${result}`);
          objRes = {
            ...objRes,
            estatus: "Email enviado",
            message: info.response,
          };
          console.log(objRes);
          return objRes;
        }
      }
    );

    objRes = {
      ...objRes,
      result: result ? result : "",
    };

    return objRes;
  } catch (error) {
    return error;
  }
};

export const notificationPhaseEmailUser = async (
  dataUser,
  phase,
  dataVacancy
) => {
  let objRes = {
    msg: "Enviando Email al usuario:..",
  };
  const { email, name } = dataUser;
  const { companyName, title } = dataVacancy;
  const emailUser = email;
  //const userNameEmail = emailUser.split("@")[0];
  const userNameEmail = name;
  const confirmPage = `
  <div>
  <a style="display: block" href="https://web.jobinder.org/">
    <img
      width="30%"
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1%;
        margin-bottom: 1%;
      "
      src="https://frontjobinderimg.s3.amazonaws.com/logo.png"
      alt="logo"
    />
  </a>
  <h3 style="text-align: center; color: #666; font-size: 14px">
    Hola:
    <span style="color: #000; font-size: 18px">${userNameEmail}</span>
    Respecto a la Vacante:
    <span style="color: #000; background-color: aqua">${title}</span>
    de la empresa:
    <span style="color: #000; background-color: aqua">${companyName}</span>
    Nos agrada informarte que has avanzado a la fase de:
    <span style="color: #000; background-color: aqua">${phase}</span>,
    Seguiremos en contacto para continuar con tu proceso de reclutamiento
    saludos.
  </h3>
  ${stringFooter}
</div>
`;

  try {
    const transporter = nodemailer.createTransport({
      host: "mail.gmx.com",
      port: 587,
      secure: false,
      auth: {
        user: USER_MAILER,
        pass: PASS_MAILER,
      },
    });

    let mailOptions = {
      from: USER_MAILER,
      to: emailUser,
      subject: `FeedBack Jobinder`,
      html: confirmPage,
    };

    //aqui verificamos que el mailerService esta activo
    transporter.verify(function (error, success) {
      if (error) {
        console.log("No responde el mailerService:..", error);
      } else {
        console.log("Server is ready to take our messages:..");
      }
    });

    const result = await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
          objRes = {
            ...objRes,
            estatus: "Error al enviar email",
            message: error,
          };
          console.log(objRes);
          return objRes;
        } else {
          console.log("Email enviado: " + info.response);
          //await addToLoggerNewUserFile(`Result del envio del Código..${result}`);
          objRes = {
            ...objRes,
            estatus: "Email enviado",
            emailUser,
            message: info.response,
          };
          console.log(objRes);
          return objRes;
        }
      }
    );

    objRes = {
      ...objRes,
      result: result ? result : "",
    };

    return objRes;
  } catch (error) {
    return error;
  }
};

export const notificationContratado = async (dataUser, dataVacancy) => {
  let objRes = {
    msg: "Enviando Email al usuario:..",
  };
  const { email, name } = dataUser;
  const { companyName, title } = dataVacancy;
  const emailUser = email;
  //const userNameEmail = emailUser.split("@")[0];
  const userNameEmail = name;
  const confirmPage = `
  <div>
  <a style="display: block" href="https://web.jobinder.org/">
    <img
      width="30%"
      style="
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 1%;
        margin-bottom: 1%;
      "
      src="https://frontjobinderimg.s3.amazonaws.com/logo.png"
      alt="logo"
    />
  </a>
  <h3 style="text-align: center; color: #666; font-size: 14px">
    Hola:
    <span style="color: #000; font-size: 18px">${userNameEmail}</span>
    Respecto a la Vacante:
    <span style="color: #000; background-color: aqua">${title}</span>
    de la empresa:
    <span style="color: #000; background-color: aqua">${companyName}</span>
    Nos agrada informarte que has sido: 
    <span style="color: #000; background-color: aqua">CONTRATADO</span>,
    , te deseamos mucho exito en tu nuevo trabajo,
    en breve nos pondremos en contacto contigo para darte mas detalles,
    saludos.
  </h3>
  ${stringFooter}
</div>
`;
  try {
    const transporter = nodemailer.createTransport({
      host: "mail.gmx.com",
      port: 587,
      secure: false,
      auth: {
        user: USER_MAILER,
        pass: PASS_MAILER,
      },
    });

    let mailOptions = {
      from: USER_MAILER,
      to: emailUser,
      subject: `FeedBack Jobinder`,
      html: confirmPage,
    };

    //aqui verificamos que el mailerService esta activo
    transporter.verify(function (error, success) {
      if (error) {
        console.log("No responde el mailerService:..", error);
      } else {
        console.log("Server is ready to take our messages:..");
      }
    });

    const result = await transporter.sendMail(
      mailOptions,
      function (error, info) {
        if (error) {
          console.log(error);
          objRes = {
            ...objRes,
            estatus: "Error al enviar email",
            message: error,
          };
          console.log(objRes);
          return objRes;
        } else {
          console.log("Email enviado: " + info.response);
          //await addToLoggerNewUserFile(`Result del envio del Código..${result}`);
          objRes = {
            ...objRes,
            estatus: "Email enviado",
            emailUser,
            message: info.response,
          };
          console.log(objRes);
          return objRes;
        }
      }
    );

    objRes = {
      ...objRes,
      result: result ? result : "",
    };

    return objRes;
    
  } catch (error) {
    console.log('error:..',error);
    return error;
  }
}
