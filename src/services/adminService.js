import db from "../models";
import moment from "moment/moment";

let handlePostCompany = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.companyName ||
        !inputData.address ||
        !inputData.provinceId ||
        !inputData.contact ||
        !inputData.image
      ) {
        resolve({
          errorCode: 1,
          message: "Missing paramters",
        });
      } else {
        db.Company.create({
          companyName: inputData.companyName,
          address: inputData.address,
          provinceId: inputData.provinceId,
          contact: inputData.contact,
          image: inputData.image,
        });
        resolve({
          errorCode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handlePostJob = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputData.jobName || !inputData.companyId) {
        resolve({
          errorCode: 1,
          message: "Missing paramters...",
        });
      } else {
        await db.Job.create({
          jobName: inputData.jobName,
          companyId: inputData.companyId,
          datePost: moment(new Date()).startOf("days").valueOf(),
          dateExpiration: inputData.dateExpiration,
          jobType: inputData.jobType,
          jobGroup: inputData.jobGroup,
          contentHTML: inputData.contentHTML,
          contentMarkdown: inputData.contentMarkdown,
          image: inputData.image || "",
        });
        resolve({
          errorCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetCompanyById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (!inputId) {
        resolve({
          errorCode: 1,
          message: "Missing parameters",
        });
      } else {
        if (inputId === "ALL") {
          data = await db.Company.findAll({
            include: {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueVi"],
            },
            raw: true,
            nest: true,
          });
        }
        if (inputId && inputId !== "ALL") {
          data = await db.Company.findOne({
            where: { id: inputId },
            include: {
              model: db.Allcode,
              as: "provinceData",
              attributes: ["valueVi"],
            },
            raw: true,
            nest: true,
          });
        }
        resolve({
          errorCode: 0,
          message: "Ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetJobById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {};
      if (!inputId) {
        resolve({
          errorCode: 1,
          message: "Missing parameters",
        });
      } else {
        if (inputId === "ALL") {
          data = await db.Job.findAll({
            include: [
              {
                model: db.Allcode,
                as: "jobTypeData",
                attributes: ["valueVi"],
              },
              {
                model: db.Allcode,
                as: "jobGroupData",
                attributes: ["valueVi"],
              },
              {
                model: db.Company,
                as: "companyData",
                attributes: ["address", "provinceId", "image"],
                include: [
                  {
                    model: db.Allcode,
                    as: "provinceData",
                    attributes: ["valueVi"],
                  },
                ],
                raw: true,
                nest: true,
              },
            ],
            raw: true,
            nest: true,
          });
        }
        if (inputId && inputId !== "ALL") {
          data = await db.Job.findOne({
            where: { id: inputId },
            include: [
              {
                model: db.Allcode,
                as: "jobTypeData",
                attributes: ["valueVi"],
              },
              {
                model: db.Allcode,
                as: "jobGroupData",
                attributes: ["valueVi"],
              },
              {
                model: db.Company,
                as: "companyData",
                attributes: ["address", "provinceId"],
                include: [
                  {
                    model: db.Allcode,
                    as: "provinceData",
                    attributes: ["valueVi"],
                  },
                ],
                raw: true,
                nest: true,
              },
            ],
            raw: true,
            nest: true,
          });
        }
        resolve({
          errorCode: 0,
          message: "Ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSearchJob = (inputData) => {
  return new Promise(async (resolve, reject) => {
    let jobs;
    let filter = inputData;

    for (let i in filter) {
      if (!filter[i]) {
        delete filter[i];
      }
    }
    console.log("check filter", inputData);
    try {
      let res = await db.Job.findAll({
        where: {
          ...filter,
        },
        include: [
          {
            model: db.Allcode,
            as: "jobTypeData",
            attributes: ["valueVi"],
          },
          {
            model: db.Allcode,
            as: "jobGroupData",
            attributes: ["valueVi"],
          },
          {
            model: db.Company,
            as: "companyData",
            attributes: ["address", "provinceId", "image"],
            include: [
              {
                model: db.Allcode,
                as: "provinceData",
                attributes: ["valueVi"],
              },
            ],
            raw: true,
            nest: true,
          },
        ],
        raw: true,
        nest: true,
      });
      if (res && res.length > 0) {
        jobs = res;
      } else {
        jobs = [];
      }
      resolve({
        errorCode: 0,
        message: "Ok",
        data: jobs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handlePostCompany,
  handlePostJob,
  handleGetCompanyById,
  handleGetJobById,
  handleSearchJob,
};
