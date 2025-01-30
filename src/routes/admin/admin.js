// Authentication routes
const express = require("express");
const router = express.Router();

const { signIn } = require("../../controllers/auth/admin/auth");
const {
  getAllUsers,
  deleteUser,
} = require("../../controllers/company/admin/usersController");
const {
  getAllCompanies,
  deleteCompany,
} = require("../../controllers/company/admin/companiesComtroller");
const {
  listApplications,
} = require("../../controllers/company/admin/applicationsController");

router.post("/login", signIn);
router.get("/get-users", getAllUsers); // get all users
router.get("/get-companies", getAllCompanies); // get all companies

router.delete("/delete-user/:id", deleteUser); // delete user by ID
router.delete("/delete-company/:id", deleteCompany); // delete company by ID

router.get("/list-applications", listApplications);

module.exports = router;
