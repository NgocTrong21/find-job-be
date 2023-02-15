import adminService from "../services/adminService";

let postCompany = async (req, res) => {
  try {
    let data = await adminService.handlePostCompany(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server..",
    });
  }
};

let postJob = async (req, res) => {
  try {
    let data = await adminService.handlePostJob(req.body);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errorCode: -1,
      message: "Error from Server...",
    });
  }
};

let getCompanyById = async (req, res) => {
  try {
    let data = await adminService.handleGetCompanyById(req.query.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

let getJobById = async (req, res) => {
  try {
    let data = await adminService.handleGetJobById(req.query.id);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

let searchJob = async (req, res) => {
  try {
    console.log("check data", req.body);
    let data = await adminService.handleSearchJob(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errorCode: -1,
      message: "Error from server...",
    });
  }
};

module.exports = {
  postCompany,
  postJob,
  getCompanyById,
  getJobById,
  searchJob,
};
