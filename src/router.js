const express = require("express");
const userController = require("./controllers/userController");
// const auth = require("./auth");
const companyController = require("./controllers/companyController");
const curriculumController = require("./controllers/curriculumController");
const coursesDataController = require("./controllers/coursesDataController");
const academicDataController = require("./controllers/academicDataController");
const competencesController = require("./controllers/competencesController");
const vacancyController = require("./controllers/vacancyController");
const { route } = require("./app");
// const candidatoController = require("./controllers/candidatoController");

const router = express.Router();
require("dotenv").config();

//Rotas para Usuários
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Rotas para Empresas
router.get("/companies", companyController.getAll);
router.get("/companies/:id", companyController.getCompanyById);
router.post("/companies", companyController.createCompany);
router.put("/companies/:id", companyController.updateCompany);
router.delete("/companies/:id", companyController.deleteCompany);

// Rotas para curriculum pg1 + dados escolares + pg4
router.get("/curriculum", curriculumController.getAll);
router.get("/curriculum/:id", curriculumController.getCurriculumById);
router.post("/curriculum", curriculumController.createCurriculum);
router.put("/curriculum/:id", curriculumController.updateCurriculum);
router.delete("/curriculum/:id", curriculumController.deleteCurriculum);

// Rotas para curriculo (academicData) pg2
router.get("/academicData", academicDataController.getAll);
router.get("/academicData/:id", academicDataController.getAcademicDataById);
router.post("/academicData", academicDataController.createAcademicData);
router.put("/academicData/:id", academicDataController.updateAcademicData);
router.delete("/academicData/:id", academicDataController.deleteAcademicData);

//Rotas para curriculo (coursesData) pg3
router.get("/coursesData", coursesDataController.getAll);
router.get("/coursesData/:id", coursesDataController.getCoursesDataById);
router.post("/courseData", coursesDataController.createCourseData);
router.put("/courseData/:id", coursesDataController.updateCourseData);
router.delete("/courseData/:id", coursesDataController.deleteCourseData);

// Rotas para competencias do curriculo //funciona porém nem tanto
router.get("/competences", competencesController.getAll);
router.get("/competences/:id", competencesController.getCompetencesById);
router.post("/competences", competencesController.createCompetence);

// Rotas para Vagas
router.get("/vacancies", vacancyController.getAll);
router.get("/vacancies/:id", vacancyController.getVacanciesById);
router.post("/vacancy", vacancyController.createVacancy);
router.put("/vacancy/:id", vacancyController.updateVacancy);
router.delete("/vacancy/:id", vacancyController.deleteVacancy);

// Rotas para Candidatos
// router.get("/candidatos", candidatoController.getAll);
// router.post("/candidatos", candidatoController.createCandidato);

// router.post("/login", userController.loginUser);

module.exports = router;
