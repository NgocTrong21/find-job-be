import express from "express";
import userController from "../controllers/userController";
import adminController from "../controllers/adminController";

let router = express.Router();

let initWebRoutes = (app) => {
  //api
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.handleGetAllCode);

  //company
  router.post("/post-company", adminController.postCompany);
  router.get("/get-company-by-id", adminController.getCompanyById);

  //job
  router.post("/post-job", adminController.postJob);
  router.get("/get-job-by-id", adminController.getJobById);
  router.post("/search-job", adminController.searchJob);

  return app.use("/", router);
};

module.exports = initWebRoutes;
