const express = require("express");
const userController = require("./controllers/userController");
// const auth = require("./auth");
const companyController = require("./controllers/companyController");
const curriculumController = require("./controllers/curriculumController");
const coursesDataController = require("./controllers/coursesDataController");
const academicDataController = require("./controllers/academicDataController");
const competencesController = require("./controllers/competencesController");
const vacancyController = require("./controllers/vacancyController");
const questionsController = require("./controllers/questionsController");
const applicationController = require("./controllers/applicationController");
const answersController = require("./controllers/answersController");
const messagesController = require("./controllers/messagesController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/"));
    },
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s/g, "_");
        cb(null, Date.now() + "-" + safeName);
    },
});
const uploads = multer({ storage });

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/attachments/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage2,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|docx|doc|txt/;
        const extname = allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(
                new Error(
                    "Arquivo inválido. Somente PDF, DOCX, DOC e TXT são permitidos."
                )
            );
        }
    },
});

//Rotas para Usuários
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/:id/curriculum", userController.addCurriculum);
router.delete("/userdata/:userId/:curriculumId", userController.deleteUserData);

// Rotas para Empresas
router.get("/companies", companyController.getAll);
router.get("/companies/:id", companyController.getCompanyById);
router.post(
    "/companies",
    uploads.single("logo"),
    companyController.createCompany
);
router.put(
    "/companies/:id",
    uploads.single("logo"),
    companyController.updateCompany
);
router.delete("/companies/:id", companyController.deleteCompany);
router.delete("/company/:id", companyController.deleteCompanyData);

// Rotas para curriculum pg1 + dados escolares + pg4
router.get("/curriculum", curriculumController.getAll);
router.get("/curriculum/:id", curriculumController.getCurriculumById);
router.post(
    "/curriculum",
    upload.single("attached"),
    curriculumController.createCurriculum
);
router.put(
    "/curriculum/:id",
    upload.single("attached"),
    curriculumController.updateCurriculum
);
router.delete("/curriculum/:id", curriculumController.deleteCurriculum);
router.put("/curriculum/:id/addData", curriculumController.addDataToCurriculum);
router.put("/curriculum/:id/addSchoolData", curriculumController.addSchoolData);

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
router.put("/competences/:id", competencesController.updateCompetence);
router.delete("/competences/:id", competencesController.deleteCompetence);

// Rotas para Vagas
router.get("/vacancies", vacancyController.getAll);
router.get("/vacancies/:id", vacancyController.getVacanciesById);
router.post("/vacancy", vacancyController.createVacancy);
router.put("/vacancy/:id", vacancyController.updateVacancy);
router.delete("/vacancy/:id", vacancyController.deleteVacancy);
router.put("/vacancyIsActive/:id", vacancyController.updateIsActive);
router.put("/vacancyIsFilled/:id", vacancyController.updateIsFilled);

// Rotas para Perguntas da vaga
router.get("/vacancy/questions", questionsController.getAll);
router.get("/vacancy/:id/questions/:id", questionsController.getById);
router.post("/vacancy/questions", questionsController.createQuestion);
router.put("/vacancy/:id/questions/:id", questionsController.updateQuestion);
router.delete("/vacancy/:id/questions/:id", questionsController.deleteQuestion);
router.get(
    "/questions/vacancy/:vacancyId",
    questionsController.getAllByVacancyId
); // todas as perguntas relacionas a vaga pelo id

// Rotas para Candidatura
router.get("/applications", applicationController.getAll);
router.get("/applications/:id", applicationController.getApplicationById);
router.post("/application", applicationController.createApplication);
router.put("/application", applicationController.updateApplication);
router.delete("/application/:id", applicationController.deleteApplication);

//Rotas para respostas das perguntas da vaga
router.get("/answers", answersController.getAll);
router.get("/answer/:id", answersController.getById);
router.post("/answer", answersController.createAnswer);
router.put("/answer/:id", answersController.updateAnswer);
router.delete("/answer/:id", answersController.deleteAnswer);
router.get(
    "/answers/question/:questionId",
    answersController.getAllByQuestionId
); // todas as respostas de uma pergunta x

//Rotas para as mensagens do chat
router.get("/messages", messagesController.getAll);
router.get("/message/:id", messagesController.getById);
router.post("/message", messagesController.createMessage);
router.put("/message/:id", messagesController.updateMessage);
router.delete("/message/:id", messagesController.deleteMessage);

module.exports = router;
