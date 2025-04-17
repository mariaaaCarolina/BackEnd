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
const cancelledApplicationController = require("./controllers/cancelledApplicationController");
// const forgotPasswordController = require("./controllers/forgotPassword");
const candidateController = require("./controllers/candidatesController");
const router = express.Router();
require("dotenv").config();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                   cpf:
 *                     type: string
 *                     description: CPF do usuário
 *                   email:
 *                     type: string
 *                     description: E-mail do usuário
 *                   phoneNumber:
 *                     type: string
 *                     description: Número de telefone do usuário
 *                   password:
 *                     type: string
 *                     description: Senha do usuário (hash)
 *                   curriculumId:
 *                     type: integer
 *                     description: ID do currículo associado
 *       500:
 *         description: Erro ao buscar usuários
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 password:
 *                   type: string
 *                 curriculumId:
 *                   type: integer
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar usuário
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               curriculumId:
 *                 type: integer
 *               vacancyId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro ao criar usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               curriculumId:
 *                 type: integer
 *               vacancyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Dados do usuário atualizados
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao excluir usuário
 */

/**
 * @swagger
 * /users/{id}/curriculum:
 *   put:
 *     summary: Associa um currículo a um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               curriculumId:
 *                 type: integer
 *                 description: ID do currículo a ser associado
 *     responses:
 *       200:
 *         description: Currículo associado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao associar currículo
 */

/**
 * @swagger
 * /userdata/{userId}/{curriculumId}:
 *   delete:
 *     summary: Exclui os dados de um usuário e seu currículo
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *       - in: path
 *         name: curriculumId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do currículo
 *     responses:
 *       200:
 *         description: Dados do usuário e currículo excluídos
 *       400:
 *         description: Parâmetros ausentes
 *       500:
 *         description: Erro ao excluir dados
 */

//Rotas para Usuários
router.get("/candidates", candidateController.getAll);
router.get("/candidate/:userId", candidateController.getCandidateByUserId);
router.get("/candidateid/:id", candidateController.getCandidateById);
router.post("/candidate", candidateController.createCandidate);
router.put("/candidate/:id", candidateController.updateCandidate);
router.delete("/candidate/:id", candidateController.deleteCandidate);
router.put("/candidate/:id/curriculum", candidateController.addCurriculum);
router.delete(
    "/candidateData/:candidateId/:curriculumId",
    candidateController.deleteCandidateData
);

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Gerenciamento de empresas
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Lista todas as empresas
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da empresa
 *                   name:
 *                     type: string
 *                     description: Nome da empresa
 *                   cnpj:
 *                     type: string
 *                     description: CNPJ da empresa
 *                   segment:
 *                     type: string
 *                     description: Segmento da empresa
 *                   responsible:
 *                     type: string
 *                     description: Nome do responsável pela empresa
 *                   email:
 *                     type: string
 *                     description: Email da empresa
 *                   phoneNumber:
 *                     type: string
 *                     description: Telefone da empresa
 *                   city:
 *                     type: string
 *                     description: Cidade da empresa
 *                   cep:
 *                     type: string
 *                     description: CEP da empresa
 *                   address:
 *                     type: string
 *                     description: Endereço da empresa
 *                   addressNumber:
 *                     type: integer
 *                     description: Número do endereço
 *                   uf:
 *                     type: string
 *                     description: UF da empresa
 *                   url:
 *                     type: string
 *                     description: URL do site da empresa
 *                   logo:
 *                     type: string
 *                     description: URL do logo da empresa
 *       500:
 *         description: Erro ao buscar empresas
 */

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Busca uma empresa pelo ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Dados da empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 cnpj:
 *                   type: string
 *                 segment:
 *                   type: string
 *                 responsible:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 city:
 *                   type: string
 *                 cep:
 *                   type: string
 *                 address:
 *                   type: string
 *                 addressNumber:
 *                   type: integer
 *                 uf:
 *                   type: string
 *                 url:
 *                   type: string
 *                 logo:
 *                   type: string
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Erro ao buscar empresa
 */

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Cria uma nova empresa
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               segment:
 *                 type: string
 *               responsible:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               cep:
 *                 type: string
 *               address:
 *                 type: string
 *               addressNumber:
 *                 type: integer
 *               uf:
 *                 type: string
 *               url:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *       500:
 *         description: Erro ao criar empresa
 */

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Atualiza os dados de uma empresa pelo ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               segment:
 *                 type: string
 *               responsible:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               cep:
 *                 type: string
 *               address:
 *                 type: string
 *               addressNumber:
 *                 type: integer
 *               uf:
 *                 type: string
 *               url:
 *                 type: string
 *               logo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados da empresa atualizados
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Erro ao atualizar empresa
 */

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Exclui uma empresa pelo ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       204:
 *         description: Empresa excluída com sucesso
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Erro ao excluir empresa
 */

/**
 * @swagger
 * /company/{id}:
 *   delete:
 *     summary: Exclui todos os dados relacionados a uma empresa
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Dados excluídos com sucesso
 *       500:
 *         description: Erro ao excluir dados da empresa
 */

// Rotas para Empresas
router.get("/companies", companyController.getAll);
router.get("/companies/:userId", companyController.getCompanyById);
router.post("/companies", companyController.createCompany);
router.put("/companies/:id", companyController.updateCompany);
router.delete("/companies/:id", companyController.deleteCompany);
router.delete("/company/:id", companyController.deleteCompanyData);

/**
 * @swagger
 * tags:s
 *   name: Curriculums
 *   description: Gerenciamento de currículos
 */

/**
 * @swagger
 * /curriculum:
 *   get:
 *     summary: Lista todos os currículos
 *     tags: [Curriculums]
 *     responses:
 *       200:
 *         description: Lista de currículos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do currículo
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     description: Data de nascimento
 *                   age:
 *                     type: integer
 *                     description: Idade
 *                   gender:
 *                     type: string
 *                     description: Gênero
 *                   race:
 *                     type: string
 *                     description: Raça
 *                   city:
 *                     type: string
 *                     description: Cidade
 *                   address:
 *                     type: string
 *                     description: Endereço
 *                   addressNumber:
 *                     type: string
 *                     description: Número do endereço
 *                   cep:
 *                     type: string
 *                     description: CEP
 *                   uf:
 *                     type: string
 *                     description: Estado
 *                   attached:
 *                     type: string
 *                     description: Arquivo anexado
 *                   description:
 *                     type: string
 *                     description: Descrição
 *                   userId:
 *                     type: integer
 *                     description: ID do usuário associado
 *       500:
 *         description: Erro ao buscar currículos
 */

/**
 * @swagger
 * /curriculum/{id}:
 *   get:
 *     summary: Busca um currículo pelo ID
 *     tags: [Curriculums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do currículo
 *     responses:
 *       200:
 *         description: Dados do currículo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                 age:
 *                   type: integer
 *                 gender:
 *                   type: string
 *                 race:
 *                   type: string
 *                 city:
 *                   type: string
 *                 address:
 *                   type: string
 *                 addressNumber:
 *                   type: string
 *                 cep:
 *                   type: string
 *                 uf:
 *                   type: string
 *                 attached:
 *                   type: string
 *                 description:
 *                   type: string
 *                 userId:
 *                   type: integer
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro ao buscar currículo
 */

/**
 * @swagger
 * /curriculum:
 *   post:
 *     summary: Cria um novo currículo
 *     tags: [Curriculums]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               race:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               addressNumber:
 *                 type: string
 *               cep:
 *                 type: string
 *               uf:
 *                 type: string
 *               attached:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Currículo criado com sucesso
 *       500:
 *         description: Erro ao criar currículo
 */

/**
 * @swagger
 * /curriculum/{id}:
 *   put:
 *     summary: Atualiza os dados de um currículo pelo ID
 *     tags: [Curriculums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do currículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               race:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               addressNumber:
 *                 type: string
 *               cep:
 *                 type: string
 *               uf:
 *                 type: string
 *               attached:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Currículo atualizado com sucesso
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro ao atualizar currículo
 */

/**
 * @swagger
 * /curriculum/{id}:
 *   delete:
 *     summary: Exclui um currículo pelo ID
 *     tags: [Curriculums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do currículo
 *     responses:
 *       200:
 *         description: Currículo excluído com sucesso
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro ao excluir currículo
 */

/**
 * @swagger
 * /curriculum/{id}/addData:
 *   put:
 *     summary: Adiciona informações ao currículo
 *     tags: [Curriculums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do currículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               attached:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dados adicionados com sucesso
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro ao adicionar dados ao currículo
 */

/**
 * @swagger
 * /curriculum/{id}/addSchoolData:
 *   put:
 *     summary: Adiciona informações escolares ao currículo
 *     tags: [Curriculums]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do currículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolName:
 *                 type: string
 *               schoolYear:
 *                 type: string
 *               schoolCity:
 *                 type: string
 *               schoolStartDate:
 *                 type: string
 *                 format: date
 *               schoolEndDate:
 *                 type: string
 *                 format: date
 *               isCurrentlyStudying:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Dados escolares adicionados com sucesso
 *       404:
 *         description: Currículo não encontrado
 *       500:
 *         description: Erro ao adicionar dados escolares
 */

// Rotas para curriculum pg1 + dados escolares + pg4
router.get("/curriculum", curriculumController.getAll);
router.get("/curriculum/:id", curriculumController.getCurriculumById);
router.post("/curriculum", curriculumController.createCurriculum);
router.put("/curriculum/:id", curriculumController.updateCurriculum);
router.delete("/curriculum/:id", curriculumController.deleteCurriculum);
router.put(
    "/curriculum/:userId/addData",
    curriculumController.addDataToCurriculum
);
router.put("/curriculum/:id/addSchoolData", curriculumController.addSchoolData);

/**
 * @swagger
 * tags:
 *   name: Academic Data
 *   description: Gerenciamento de dados acadêmicos
 */

/**
 * @swagger
 * /academicData/{id}:
 *   get:
 *     tags: [Academic Data]
 *     summary: Retorna dados acadêmicos pelo ID do currículo
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do currículo.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados acadêmicos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AcademicData'
 *       404:
 *         description: Dados acadêmicos não encontrados.
 *       500:
 *         description: Erro ao buscar dados acadêmicos.
 */

/**
 * @swagger
 * /academicData:
 *   post:
 *     tags: [Academic Data]
 *     summary: Cria um novo dado acadêmico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcademicData'
 *     responses:
 *       201:
 *         description: Dado acadêmico criado com sucesso.
 *       500:
 *         description: Erro ao criar dado acadêmico.
 */

/**
 * @swagger
 * /academicData/{id}:
 *   put:
 *     tags: [Academic Data]
 *     summary: Atualiza dados acadêmicos pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do dado acadêmico a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AcademicData'
 *     responses:
 *       200:
 *         description: Dados acadêmicos atualizados com sucesso.
 *       404:
 *         description: Dado acadêmico não encontrado.
 *       500:
 *         description: Erro ao atualizar dados acadêmicos.
 */

/**
 * @swagger
 * /academicData/{id}:
 *   delete:
 *     tags: [Academic Data]
 *     summary: Deleta um dado acadêmico pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: O ID do dado acadêmico a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dado acadêmico removido com sucesso.
 *       404:
 *         description: Dado acadêmico não encontrado.
 *       500:
 *         description: Erro ao deletar dado acadêmico.
 */

// Rotas para curriculo (academicData) pg2
router.get("/academicData", academicDataController.getAll);
router.get("/academicData/:id", academicDataController.getAcademicDataById);
router.post("/academicData", academicDataController.createAcademicData);
router.put("/academicData/:id", academicDataController.updateAcademicData);
router.delete("/academicData/:id", academicDataController.deleteAcademicData);

/**
 * @swagger
 * tags:
 *   name: Courses Data
 *   description: Gerenciamento de cursos
 */

/**
 * @swagger
 * /coursesData:
 *   get:
 *     summary: Recupera todos os dados de cursos.
 *     tags:
 *       - Courses Data
 *     responses:
 *       200:
 *         description: Lista de dados dos cursos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - name
 *                   - modality
 *                   - duration
 *                   - endDate
 *                   - isCurrentlyStudying
 *                   - institutionName
 *                   - curriculumId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID do curso.
 *                   name:
 *                     type: string
 *                     description: O nome do curso.
 *                   modality:
 *                     type: string
 *                     description: A modalidade do curso (presencial, online, etc).
 *                   duration:
 *                     type: string
 *                     description: A duração do curso.
 *                   endDate:
 *                     type: string
 *                     format: date
 *                     description: A data de término do curso.
 *                   isCurrentlyStudying:
 *                     type: boolean
 *                     description: Se o aluno ainda está cursando o curso (true ou false).
 *                   institutionName:
 *                     type: string
 *                     description: O nome da instituição que oferece o curso.
 *                   curriculumId:
 *                     type: integer
 *                     description: O ID do currículo associado ao curso.
 *       500:
 *         description: Erro ao buscar os cursos.
 */

/**
 * @swagger
 * /coursesData/{id}:
 *   get:
 *     summary: Recupera um curso pelo ID.
 *     tags:
 *       - Courses Data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do curso a ser recuperado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do curso encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - modality
 *                 - duration
 *                 - endDate
 *                 - isCurrentlyStudying
 *                 - institutionName
 *                 - curriculumId
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID do curso.
 *                 name:
 *                   type: string
 *                   description: O nome do curso.
 *                 modality:
 *                   type: string
 *                   description: A modalidade do curso (presencial, online, etc).
 *                 duration:
 *                   type: string
 *                   description: A duração do curso.
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: A data de término do curso.
 *                 isCurrentlyStudying:
 *                   type: boolean
 *                   description: Se o aluno ainda está cursando o curso (true ou false).
 *                 institutionName:
 *                   type: string
 *                   description: O nome da instituição que oferece o curso.
 *                 curriculumId:
 *                   type: integer
 *                   description: O ID do currículo associado ao curso.
 *       404:
 *         description: Curso não encontrado.
 *       500:
 *         description: Erro ao buscar o curso.
 */

/**
 * @swagger
 * /courseData:
 *   post:
 *     summary: Cria um novo curso.
 *     tags:
 *       - Courses Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - modality
 *               - duration
 *               - endDate
 *               - isCurrentlyStudying
 *               - institutionName
 *               - curriculumId
 *             properties:
 *               name:
 *                 type: string
 *                 description: O nome do curso.
 *               modality:
 *                 type: string
 *                 description: A modalidade do curso (presencial, online, etc).
 *               duration:
 *                 type: string
 *                 description: A duração do curso.
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: A data de término do curso.
 *               isCurrentlyStudying:
 *                 type: boolean
 *                 description: Se o aluno ainda está cursando o curso (true ou false).
 *               institutionName:
 *                 type: string
 *                 description: O nome da instituição que oferece o curso.
 *               curriculumId:
 *                 type: integer
 *                 description: O ID do currículo associado ao curso.
 *     responses:
 *       201:
 *         description: Curso criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID do curso.
 *                 name:
 *                   type: string
 *                   description: O nome do curso.
 *                 modality:
 *                   type: string
 *                   description: A modalidade do curso (presencial, online, etc).
 *                 duration:
 *                   type: string
 *                   description: A duração do curso.
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: A data de término do curso.
 *                 isCurrentlyStudying:
 *                   type: boolean
 *                   description: Se o aluno ainda está cursando o curso (true ou false).
 *                 institutionName:
 *                   type: string
 *                   description: O nome da instituição que oferece o curso.
 *                 curriculumId:
 *                   type: integer
 *                   description: O ID do currículo associado ao curso.
 *       500:
 *         description: Erro ao criar o curso.
 */

/**
 * @swagger
 * /courseData/{id}:
 *   put:
 *     summary: Atualiza os dados de um curso pelo ID.
 *     tags:
 *       - Courses Data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do curso a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseData'
 *     responses:
 *       200:
 *         description: Dados do curso atualizados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseData'
 *       404:
 *         description: Curso não encontrado.
 *       500:
 *         description: Erro ao atualizar o curso.
 */

/**
 * @swagger
 * /courseData/{id}:
 *   delete:
 *     summary: Deleta um curso pelo ID.
 *     tags:
 *       - Courses Data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do curso a ser deletado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curso deletado com sucesso.
 *       404:
 *         description: Curso não encontrado.
 *       500:
 *         description: Erro ao deletar o curso.
 */

//Rotas para curriculo (coursesData) pg3
router.get("/coursesData", coursesDataController.getAll);
router.get("/coursesData/:id", coursesDataController.getCoursesDataById);
router.post("/courseData", coursesDataController.createCourseData);
router.put("/courseData/:id", coursesDataController.updateCourseData);
router.delete("/courseData/:id", coursesDataController.deleteCourseData);

/**
 * @swagger
 * tags:
 *   name: Competences Data
 *   description: Gerenciamento de competências
 */

/**
 * @swagger
 * /competences:
 *   get:
 *     summary: Recupera todas as competências.
 *     tags:
 *       - Competences Data
 *     responses:
 *       200:
 *         description: Lista de competências.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - name
 *                   - curriculumId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da competência.
 *                   name:
 *                     type: string
 *                     description: O nome da competência.
 *                   curriculumId:
 *                     type: integer
 *                     description: O ID do currículo associado à competência.
 *       500:
 *         description: Erro ao buscar competências.
 */

/**
 * @swagger
 * /competences/{id}:
 *   get:
 *     summary: Recupera uma competência pelo ID.
 *     tags:
 *       - Competences Data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da competência a ser recuperada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da competência encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - name
 *                 - curriculumId
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da competência.
 *                 name:
 *                   type: string
 *                   description: O nome da competência.
 *                 curriculumId:
 *                   type: integer
 *                   description: O ID do currículo associado à competência.
 *       404:
 *         description: Competência não encontrada.
 *       500:
 *         description: Erro ao buscar a competência.
 */

/**
 * @swagger
 * /competences:
 *   post:
 *     summary: Cria uma nova competência.
 *     tags:
 *       - Competences Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - curriculumId
 *             properties:
 *               name:
 *                 type: string
 *                 description: O nome da competência.
 *               curriculumId:
 *                 type: integer
 *                 description: O ID do currículo associado à competência.
 *     responses:
 *       201:
 *         description: Competência criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da competência.
 *                 name:
 *                   type: string
 *                   description: O nome da competência.
 *                 curriculumId:
 *                   type: integer
 *                   description: O ID do currículo associado à competência.
 *       500:
 *         description: Erro ao criar a competência.
 */

/**
 * @swagger
 * /competences/{id}:
 *   put:
 *     summary: Atualiza os dados de uma competência pelo ID.
 *     tags:
 *       - Competences Data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da competência a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - curriculumId
 *             properties:
 *               name:
 *                 type: string
 *                 description: O nome da competência.
 *               curriculumId:
 *                 type: integer
 *                 description: O ID do currículo associado à competência.
 *     responses:
 *       200:
 *         description: Dados da competência atualizados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da competência.
 *                 name:
 *                   type: string
 *                   description: O nome da competência.
 *                 curriculumId:
 *                   type: integer
 *                   description: O ID do currículo associado à competência.
 *       404:
 *         description: Competência não encontrada.
 *       500:
 *         description: Erro ao atualizar a competência.
 */

/**
 * @swagger
 * /competences/{id}:
 *   delete:
 *     summary: Deleta uma competência pelo ID.
 *     tags:
 *       - Competences Data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da competência a ser deletada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Competência deletada com sucesso.
 *       404:
 *         description: Competência não encontrada.
 *       500:
 *         description: Erro ao deletar a competência.
 */

// Rotas para competencias do curriculo //funciona porém nem tanto
router.get("/competences", competencesController.getAll);
router.get("/competences/:id", competencesController.getCompetencesById);
router.post("/competences", competencesController.createCompetence);
router.put("/competences/:id", competencesController.updateCompetence);
router.delete("/competences/:id", competencesController.deleteCompetence);

/**
 * @swagger
 * tags:
 *   name: Vacancies
 *   description: Gerenciamento de vagas
 */

/**
 * @swagger
 * /vacancies:
 *   get:
 *     summary: Recupera todas as vagas.
 *     tags:
 *       - Vacancies
 *     responses:
 *       200:
 *         description: Lista de vagas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - title
 *                   - description
 *                   - companyId
 *                   - locality
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da vaga.
 *                   title:
 *                     type: string
 *                     description: O título da vaga.
 *                   description:
 *                     type: string
 *                     description: A descrição da vaga.
 *                   aboutCompany:
 *                     type: string
 *                     description: Informações sobre a empresa.
 *                   benefits:
 *                     type: string
 *                     description: Benefícios oferecidos.
 *                   requirements:
 *                     type: string
 *                     description: Requisitos para a vaga.
 *                   modality:
 *                     type: string
 *                     description: Modalidade da vaga.
 *                   locality:
 *                     type: string
 *                     description: Localidade da vaga.
 *                   uf:
 *                     type: string
 *                     description: UF onde a vaga está localizada.
 *                   contact:
 *                     type: string
 *                     description: Contato para a vaga.
 *                   salary:
 *                     type: string
 *                     description: Salário oferecido.
 *                   level:
 *                     type: string
 *                     description: Nível da vaga.
 *                   companyId:
 *                     type: integer
 *                     description: ID da empresa que oferece a vaga.
 *       500:
 *         description: Erro ao buscar vagas.
 */

/**
 * @swagger
 * /vacancies/{id}:
 *   get:
 *     summary: Recupera uma vaga pelo ID.
 *     tags:
 *       - Vacancies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga a ser recuperada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da vaga encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - description
 *                 - companyId
 *                 - locality
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da vaga.
 *                 title:
 *                   type: string
 *                   description: O título da vaga.
 *                 description:
 *                   type: string
 *                   description: A descrição da vaga.
 *                 aboutCompany:
 *                   type: string
 *                   description: Informações sobre a empresa.
 *                 benefits:
 *                   type: string
 *                   description: Benefícios oferecidos.
 *                 requirements:
 *                   type: string
 *                   description: Requisitos para a vaga.
 *                 modality:
 *                   type: string
 *                   description: Modalidade da vaga.
 *                 locality:
 *                   type: string
 *                   description: Localidade da vaga.
 *                 uf:
 *                   type: string
 *                   description: UF onde a vaga está localizada.
 *                 contact:
 *                   type: string
 *                   description: Contato para a vaga.
 *                 salary:
 *                   type: string
 *                   description: Salário oferecido.
 *                 level:
 *                   type: string
 *                   description: Nível da vaga.
 *                 companyId:
 *                   type: integer
 *                   description: ID da empresa que oferece a vaga.
 *       404:
 *         description: Vaga não encontrada.
 *       500:
 *         description: Erro ao buscar a vaga.
 */

/**
 * @swagger
 * /vacancy:
 *   post:
 *     summary: Cria uma nova vaga.
 *     tags:
 *       - Vacancies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - companyId
 *               - locality
 *             properties:
 *               title:
 *                 type: string
 *                 description: O título da vaga.
 *               description:
 *                 type: string
 *                 description: A descrição da vaga.
 *               aboutCompany:
 *                 type: string
 *                 description: Informações sobre a empresa.
 *               benefits:
 *                 type: string
 *                 description: Benefícios oferecidos.
 *               requirements:
 *                 type: string
 *                 description: Requisitos para a vaga.
 *               modality:
 *                 type: string
 *                 description: Modalidade da vaga.
 *               locality:
 *                 type: string
 *                 description: Localidade da vaga.
 *               uf:
 *                 type: string
 *                 description: UF onde a vaga está localizada.
 *               contact:
 *                 type: string
 *                 description: Contato para a vaga.
 *               salary:
 *                 type: string
 *                 description: Salário oferecido.
 *               level:
 *                 type: string
 *                 description: Nível da vaga.
 *               companyId:
 *                 type: integer
 *                 description: ID da empresa que oferece a vaga.
 *     responses:
 *       200:
 *         description: Vaga criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da vaga.
 *                 title:
 *                   type: string
 *                   description: O título da vaga.
 *                 description:
 *                   type: string
 *                   description: A descrição da vaga.
 *                 aboutCompany:
 *                   type: string
 *                   description: Informações sobre a empresa.
 *                 benefits:
 *                   type: string
 *                   description: Benefícios oferecidos.
 *                 requirements:
 *                   type: string
 *                   description: Requisitos para a vaga.
 *                 modality:
 *                   type: string
 *                   description: Modalidade da vaga.
 *                 locality:
 *                   type: string
 *                   description: Localidade da vaga.
 *                 uf:
 *                   type: string
 *                   description: UF onde a vaga está localizada.
 *                 contact:
 *                   type: string
 *                   description: Contato para a vaga.
 *                 salary:
 *                   type: string
 *                   description: Salário oferecido.
 *                 level:
 *                   type: string
 *                   description: Nível da vaga.
 *                 companyId:
 *                   type: integer
 *                   description: ID da empresa que oferece a vaga.
 *       500:
 *         description: Erro ao criar a vaga.
 */

/**
 * @swagger
 * /vacancy/{id}:
 *   put:
 *     summary: Atualiza os dados de uma vaga pelo ID.
 *     tags:
 *       - Vacancies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - companyId
 *               - locality
 *             properties:
 *               title:
 *                 type: string
 *                 description: O título da vaga.
 *               description:
 *                 type: string
 *                 description: A descrição da vaga.
 *               aboutCompany:
 *                 type: string
 *                 description: Informações sobre a empresa.
 *               benefits:
 *                 type: string
 *                 description: Benefícios oferecidos.
 *               requirements:
 *                 type: string
 *                 description: Requisitos para a vaga.
 *               modality:
 *                 type: string
 *                 description: Modalidade da vaga.
 *               locality:
 *                 type: string
 *                 description: Localidade da vaga.
 *               uf:
 *                 type: string
 *                 description: UF onde a vaga está localizada.
 *               contact:
 *                 type: string
 *                 description: Contato para a vaga.
 *               salary:
 *                 type: string
 *                 description: Salário oferecido.
 *               level:
 *                 type: string
 *                 description: Nível da vaga.
 *               companyId:
 *                 type: integer
 *                 description: ID da empresa que oferece a vaga.
 *     responses:
 *       200:
 *         description: Vaga atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da vaga.
 *                 title:
 *                   type: string
 *                   description: O título da vaga.
 *                 description:
 *                   type: string
 *                   description: A descrição da vaga.
 *                 aboutCompany:
 *                   type: string
 *                   description: Informações sobre a empresa.
 *                 benefits:
 *                   type: string
 *                   description: Benefícios oferecidos.
 *                 requirements:
 *                   type: string
 *                   description: Requisitos para a vaga.
 *                 modality:
 *                   type: string
 *                   description: Modalidade da vaga.
 *                 locality:
 *                   type: string
 *                   description: Localidade da vaga.
 *                 uf:
 *                   type: string
 *                   description: UF onde a vaga está localizada.
 *                 contact:
 *                   type: string
 *                   description: Contato para a vaga.
 *                 salary:
 *                   type: string
 *                   description: Salário oferecido.
 *                 level:
 *                   type: string
 *                   description: Nível da vaga.
 *                 companyId:
 *                   type: integer
 *                   description: ID da empresa que oferece a vaga.
 *       404:
 *         description: Vaga não encontrada.
 *       500:
 *         description: Erro ao atualizar a vaga.
 */

/**
 * @swagger
 * /vacancyIsActive/{id}:
 *   put:
 *     summary: Atualiza o status de atividade de uma vaga pelo ID.
 *     tags:
 *       - Vacancies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 description: O status de atividade da vaga.
 *     responses:
 *       200:
 *         description: Status de atividade da vaga atualizado com sucesso.
 *       400:
 *         description: Erro no valor do campo `isActive`.
 *       404:
 *         description: Vaga não encontrada.
 *       500:
 *         description: Erro ao atualizar o status de atividade da vaga.
 */

/**
 * @swagger
 * /vacancyIsFilled/{id}:
 *   put:
 *     summary: Atualiza o status de preenchimento de uma vaga pelo ID.
 *     tags:
 *       - Vacancies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isFilled
 *             properties:
 *               isFilled:
 *                 type: boolean
 *                 description: O status de preenchimento da vaga.
 *     responses:
 *       200:
 *         description: Status de preenchimento da vaga atualizado com sucesso.
 *       400:
 *         description: Erro no valor do campo `isFilled`.
 *       404:
 *         description: Vaga não encontrada.
 *       500:
 *         description: Erro ao atualizar o status de preenchimento da vaga.
 */

/**
 * @swagger
 * /vacancy/{id}:
 *   delete:
 *     summary: Deleta uma vaga pelo ID.
 *     tags:
 *       - Vacancies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga a ser deletada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vaga deletada com sucesso.
 *       404:
 *         description: Vaga não encontrada.
 *       500:
 *         description: Erro ao deletar a vaga.
 */

// Rotas para Vagas
router.get("/vacancies", vacancyController.getAll);
router.get("/vacancies/:id", vacancyController.getVacanciesById);
router.post("/vacancy", vacancyController.createVacancy);
router.put("/vacancy/:id", vacancyController.updateVacancy);
router.delete("/vacancy/:id", vacancyController.deleteVacancy);
router.put("/vacancyIsActive/:id", vacancyController.updateIsActive);
router.put("/vacancyIsFilled/:id", vacancyController.updateIsFilled);

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Gerenciamento de perguntas
 */

/**
 * @swagger
 * /vacancy/questions:
 *   get:
 *     summary: Recupera todas as perguntas.
 *     tags:
 *       - Questions
 *     responses:
 *       200:
 *         description: Lista de perguntas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - question
 *                   - vacancyId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da pergunta.
 *                   question:
 *                     type: string
 *                     description: O conteúdo da pergunta.
 *                   vacancyId:
 *                     type: integer
 *                     description: ID da vaga à qual a pergunta pertence.
 *       500:
 *         description: Erro ao buscar perguntas.
 */

/**
 * @swagger
 * /vacancy/{id}/questions/{id}:
 *   get:
 *     summary: Recupera uma pergunta pelo ID.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da pergunta a ser recuperada.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga a qual a pergunta pertence.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da pergunta encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - question
 *                 - vacancyId
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da pergunta.
 *                 question:
 *                   type: string
 *                   description: O conteúdo da pergunta.
 *                 vacancyId:
 *                   type: integer
 *                   description: ID da vaga à qual a pergunta pertence.
 *       404:
 *         description: Pergunta não encontrada.
 *       500:
 *         description: Erro ao buscar a pergunta.
 */

/**
 * @swagger
 * /vacancy/questions:
 *   post:
 *     summary: Cria uma nova pergunta.
 *     tags:
 *       - Questions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - vacancyId
 *             properties:
 *               question:
 *                 type: string
 *                 description: O conteúdo da pergunta.
 *               vacancyId:
 *                 type: integer
 *                 description: ID da vaga à qual a pergunta pertence.
 *     responses:
 *       201:
 *         description: Pergunta criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da pergunta.
 *                 question:
 *                   type: string
 *                   description: O conteúdo da pergunta.
 *                 vacancyId:
 *                   type: integer
 *                   description: ID da vaga à qual a pergunta pertence.
 *       500:
 *         description: Erro ao criar a pergunta.
 */

/**
 * @swagger
 * /vacancy/{id}/questions/{id}:
 *   put:
 *     summary: Atualiza uma pergunta pelo ID.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da pergunta a ser atualizada.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga à qual a pergunta pertence.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - vacancyId
 *             properties:
 *               question:
 *                 type: string
 *                 description: O conteúdo da pergunta.
 *               vacancyId:
 *                 type: integer
 *                 description: ID da vaga à qual a pergunta pertence.
 *     responses:
 *       200:
 *         description: Pergunta atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da pergunta.
 *                 question:
 *                   type: string
 *                   description: O conteúdo da pergunta.
 *                 vacancyId:
 *                   type: integer
 *                   description: ID da vaga à qual a pergunta pertence.
 *       404:
 *         description: Pergunta não encontrada.
 *       500:
 *         description: Erro ao atualizar a pergunta.
 */

/**
 * @swagger
 * /vacancy/{id}/questions/{id}:
 *   delete:
 *     summary: Deleta uma pergunta pelo ID.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da pergunta a ser deletada.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da vaga à qual a pergunta pertence.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pergunta deletada com sucesso.
 *       404:
 *         description: Pergunta não encontrada.
 *       500:
 *         description: Erro ao deletar a pergunta.
 */

/**
 * @swagger
 * /questions/vacancy/{vacancyId}:
 *   get:
 *     summary: Recupera todas as perguntas de uma vaga pelo ID.
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: vacancyId
 *         required: true
 *         description: O ID da vaga para a qual as perguntas serão recuperadas.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de perguntas para a vaga.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - question
 *                   - vacancyId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da pergunta.
 *                   question:
 *                     type: string
 *                     description: O conteúdo da pergunta.
 *                   vacancyId:
 *                     type: integer
 *                     description: ID da vaga à qual a pergunta pertence.
 *       404:
 *         description: Nenhuma pergunta encontrada para a vaga.
 *       500:
 *         description: Erro ao buscar perguntas para a vaga.
 */

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

/**
 * @swagger
 * tags:
 *   name: Applications
 *   description: Gerenciamento de candidaturas
 */

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Recupera todas as candidaturas.
 *     tags:
 *       - Applications
 *     responses:
 *       200:
 *         description: Lista de candidaturas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - userId
 *                   - vacancyId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da candidatura.
 *                   userId:
 *                     type: integer
 *                     description: O ID do usuário que fez a candidatura.
 *                   vacancyId:
 *                     type: integer
 *                     description: O ID da vaga para a qual a candidatura foi feita.
 *       500:
 *         description: Erro ao buscar candidaturas.
 */

/**
 * @swagger
 * /applications/{id}:
 *   get:
 *     summary: Recupera uma candidatura pelo ID do usuário.
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do usuário para recuperar a candidatura.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da candidatura encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - vacancyId
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da candidatura.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário que fez a candidatura.
 *                 vacancyId:
 *                   type: integer
 *                   description: O ID da vaga para a qual a candidatura foi feita.
 *       404:
 *         description: Candidatura não encontrada.
 *       500:
 *         description: Erro ao buscar a candidatura.
 */

/**
 * @swagger
 * /application:
 *   post:
 *     summary: Cria uma nova candidatura.
 *     tags:
 *       - Applications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - vacancyId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: O ID do usuário.
 *               vacancyId:
 *                 type: integer
 *                 description: O ID da vaga.
 *     responses:
 *       201:
 *         description: Candidatura criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da candidatura.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *                 vacancyId:
 *                   type: integer
 *                   description: O ID da vaga.
 *       500:
 *         description: Erro ao criar a candidatura.
 */

/**
 * @swagger
 * /application/{id}:
 *   put:
 *     summary: Atualiza uma candidatura.
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da candidatura a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - vacancyId
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: O ID do usuário.
 *               vacancyId:
 *                 type: integer
 *                 description: O ID da vaga.
 *     responses:
 *       200:
 *         description: Candidatura atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da candidatura.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *                 vacancyId:
 *                   type: integer
 *                   description: O ID da vaga.
 *       404:
 *         description: Candidatura não encontrada.
 *       500:
 *         description: Erro ao atualizar a candidatura.
 */

/**
 * @swagger
 * /application/{userId}/{vacancyId}:
 *   delete:
 *     summary: Deleta uma candidatura pelo userId e vacancyId.
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: O ID do usuário da candidatura a ser deletada.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: vacancyId
 *         required: true
 *         description: O ID da vaga da candidatura a ser deletada.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Candidatura deletada com sucesso.
 *       400:
 *         description: Os parâmetros userId e vacancyId são obrigatórios.
 *       404:
 *         description: Candidatura não encontrada.
 *       500:
 *         description: Erro ao deletar a candidatura.
 */

/**
 * @swagger
 * /applications/vacancy/{vacancyId}:
 *   get:
 *     summary: Recupera todas as candidaturas de uma vaga pelo ID.
 *     tags:
 *       - Applications
 *     parameters:
 *       - in: path
 *         name: vacancyId
 *         required: true
 *         description: O ID da vaga para a qual as candidaturas serão recuperadas.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de candidaturas para a vaga.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - userId
 *                   - vacancyId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da candidatura.
 *                   userId:
 *                     type: integer
 *                     description: O ID do usuário que fez a candidatura.
 *                   vacancyId:
 *                     type: integer
 *                     description: O ID da vaga para a qual a candidatura foi feita.
 *       500:
 *         description: Erro ao buscar candidaturas.
 */

// Rotas para Candidatura
router.get("/applications", applicationController.getAll);
router.get("/applications/:id", applicationController.getApplicationById);
router.post("/application", applicationController.createApplication);
router.put("/application/:id", applicationController.updateApplication);
router.delete(
    "/application/:userId/:vacancyId",
    applicationController.deleteApplication
);
router.get(
    "/applications/vacancy/:vacancyId",
    applicationController.getApplicationsByVacancyId
);

/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Gerenciamento de respostas
 */

/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Recupera todas as respostas.
 *     tags:
 *       - Answers
 *     responses:
 *       200:
 *         description: Lista de respostas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - answer
 *                   - questionId
 *                   - userId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da resposta.
 *                   answer:
 *                     type: string
 *                     description: O texto da resposta.
 *                   questionId:
 *                     type: integer
 *                     description: O ID da pergunta para a qual a resposta foi dada.
 *                   userId:
 *                     type: integer
 *                     description: O ID do usuário que deu a resposta.
 *       500:
 *         description: Erro ao buscar respostas.
 */

/**
 * @swagger
 * /answer/{id}:
 *   get:
 *     summary: Recupera uma resposta pelo ID.
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da resposta.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da resposta encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - answer
 *                 - questionId
 *                 - userId
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da resposta.
 *                 answer:
 *                   type: string
 *                   description: O texto da resposta.
 *                 questionId:
 *                   type: integer
 *                   description: O ID da pergunta para a qual a resposta foi dada.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário que deu a resposta.
 *       404:
 *         description: Resposta não encontrada.
 *       500:
 *         description: Erro ao buscar a resposta.
 */

/**
 * @swagger
 * /answer:
 *   post:
 *     summary: Cria uma nova resposta.
 *     tags:
 *       - Answers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *               - questionId
 *               - userId
 *             properties:
 *               answer:
 *                 type: string
 *                 description: O texto da resposta.
 *               questionId:
 *                 type: integer
 *                 description: O ID da pergunta.
 *               userId:
 *                 type: integer
 *                 description: O ID do usuário.
 *     responses:
 *       201:
 *         description: Resposta criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da resposta.
 *                 answer:
 *                   type: string
 *                   description: O texto da resposta.
 *                 questionId:
 *                   type: integer
 *                   description: O ID da pergunta.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *       500:
 *         description: Erro ao criar a resposta.
 */

/**
 * @swagger
 * /answer/{id}:
 *   put:
 *     summary: Atualiza uma resposta.
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da resposta a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - answer
 *               - questionId
 *               - userId
 *             properties:
 *               answer:
 *                 type: string
 *                 description: O texto da resposta.
 *               questionId:
 *                 type: integer
 *                 description: O ID da pergunta.
 *               userId:
 *                 type: integer
 *                 description: O ID do usuário.
 *     responses:
 *       200:
 *         description: Resposta atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da resposta.
 *                 answer:
 *                   type: string
 *                   description: O texto da resposta.
 *                 questionId:
 *                   type: integer
 *                   description: O ID da pergunta.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *       404:
 *         description: Resposta não encontrada.
 *       500:
 *         description: Erro ao atualizar a resposta.
 */

/**
 * @swagger
 * /answer/{id}:
 *   delete:
 *     summary: Deleta uma resposta pelo ID.
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da resposta a ser deletada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resposta deletada com sucesso.
 *       404:
 *         description: Resposta não encontrada.
 *       500:
 *         description: Erro ao deletar a resposta.
 */

/**
 * @swagger
 * /answers/question/{questionId}:
 *   get:
 *     summary: Recupera todas as respostas de uma pergunta pelo ID.
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         description: O ID da pergunta para a qual as respostas serão recuperadas.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de respostas para a pergunta.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - answer
 *                   - questionId
 *                   - userId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da resposta.
 *                   answer:
 *                     type: string
 *                     description: O texto da resposta.
 *                   questionId:
 *                     type: integer
 *                     description: O ID da pergunta para a qual a resposta foi dada.
 *                   userId:
 *                     type: integer
 *                     description: O ID do usuário que deu a resposta.
 *       404:
 *         description: Nenhuma resposta encontrada para esta pergunta.
 *       500:
 *         description: Erro ao buscar respostas da pergunta.
 */

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

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Gerenciamento de mensagens
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Recupera todas as mensagens.
 *     tags:
 *       - Messages
 *     responses:
 *       200:
 *         description: Lista de mensagens.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - sender_id
 *                   - content
 *                   - sender_name
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da mensagem.
 *                   sender_id:
 *                     type: integer
 *                     description: O ID do remetente.
 *                   content:
 *                     type: string
 *                     description: O conteúdo da mensagem.
 *                   sender_name:
 *                     type: string
 *                     description: O nome do remetente.
 *       500:
 *         description: Erro ao buscar mensagens.
 */

/**
 * @swagger
 * /message/{id}:
 *   get:
 *     summary: Recupera uma mensagem pelo ID.
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da mensagem.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da mensagem encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - sender_id
 *                 - content
 *                 - sender_name
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da mensagem.
 *                 sender_id:
 *                   type: integer
 *                   description: O ID do remetente.
 *                 content:
 *                   type: string
 *                   description: O conteúdo da mensagem.
 *                 sender_name:
 *                   type: string
 *                   description: O nome do remetente.
 *       404:
 *         description: Mensagem não encontrada.
 *       500:
 *         description: Erro ao buscar a mensagem.
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Cria uma nova mensagem.
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender_id
 *               - content
 *               - sender_name
 *             properties:
 *               sender_id:
 *                 type: integer
 *                 description: O ID do remetente.
 *               content:
 *                 type: string
 *                 description: O conteúdo da mensagem.
 *               sender_name:
 *                 type: string
 *                 description: O nome do remetente.
 *     responses:
 *       201:
 *         description: Mensagem criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da mensagem.
 *                 sender_id:
 *                   type: integer
 *                   description: O ID do remetente.
 *                 content:
 *                   type: string
 *                   description: O conteúdo da mensagem.
 *                 sender_name:
 *                   type: string
 *                   description: O nome do remetente.
 *       500:
 *         description: Erro ao criar a mensagem.
 */

/**
 * @swagger
 * /message/{id}:
 *   put:
 *     summary: Atualiza uma mensagem.
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da mensagem a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender_id
 *               - content
 *               - sender_name
 *             properties:
 *               sender_id:
 *                 type: integer
 *                 description: O ID do remetente.
 *               content:
 *                 type: string
 *                 description: O conteúdo da mensagem.
 *               sender_name:
 *                 type: string
 *                 description: O nome do remetente.
 *     responses:
 *       200:
 *         description: Mensagem atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da mensagem.
 *                 sender_id:
 *                   type: integer
 *                   description: O ID do remetente.
 *                 content:
 *                   type: string
 *                   description: O conteúdo da mensagem.
 *                 sender_name:
 *                   type: string
 *                   description: O nome do remetente.
 *       404:
 *         description: Mensagem não encontrada.
 *       500:
 *         description: Erro ao atualizar a mensagem.
 */

/**
 * @swagger
 * /message/{id}:
 *   delete:
 *     summary: Deleta uma mensagem pelo ID.
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da mensagem a ser deletada.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mensagem deletada com sucesso.
 *       404:
 *         description: Mensagem não encontrada.
 *       500:
 *         description: Erro ao deletar a mensagem.
 */

//Rotas para as mensagens do chat
router.get("/messages", messagesController.getAll);
router.get("/message/:id", messagesController.getById);
router.post("/message", messagesController.createMessage);
router.put("/message/:id", messagesController.updateMessage);
router.delete("/message/:id", messagesController.deleteMessage);

/**
 * @swagger
 * tags:
 *   name: Cancelled Applications
 *   description: Gerenciamento de candidaturas canceladas
 */

/**
 * @swagger
 * /cancelledApplications:
 *   get:
 *     summary: Recupera todas as candidaturas canceladas.
 *     tags:
 *       - Cancelled Applications
 *     responses:
 *       200:
 *         description: Lista de candidaturas canceladas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required:
 *                   - vacancyId
 *                   - userId
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: O ID da candidatura cancelada.
 *                   vacancyId:
 *                     type: integer
 *                     description: O ID da vaga.
 *                   userId:
 *                     type: integer
 *                     description: O ID do usuário.
 *       500:
 *         description: Erro ao buscar candidaturas canceladas.
 */

/**
 * @swagger
 * /cancelledApplication/{userId}:
 *   get:
 *     summary: Recupera uma candidatura cancelada pelo userId.
 *     tags:
 *       - Cancelled Applications
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: O ID do usuário.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados da candidatura cancelada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - vacancyId
 *                 - userId
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da candidatura cancelada.
 *                 vacancyId:
 *                   type: integer
 *                   description: O ID da vaga.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *       404:
 *         description: Candidatura cancelada não encontrada.
 *       500:
 *         description: Erro ao buscar a candidatura cancelada.
 */

/**
 * @swagger
 * /cancelledApplication:
 *   post:
 *     summary: Cria uma nova candidatura cancelada.
 *     tags:
 *       - Cancelled Applications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vacancyId
 *               - userId
 *             properties:
 *               vacancyId:
 *                 type: integer
 *                 description: O ID da vaga.
 *               userId:
 *                 type: integer
 *                 description: O ID do usuário.
 *     responses:
 *       201:
 *         description: Candidatura cancelada criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da candidatura cancelada.
 *                 vacancyId:
 *                   type: integer
 *                   description: O ID da vaga.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *       500:
 *         description: Erro ao criar candidatura cancelada.
 */

/**
 * @swagger
 * /cancelledApplication/{id}:
 *   put:
 *     summary: Atualiza uma candidatura cancelada.
 *     tags:
 *       - Cancelled Applications
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID da candidatura cancelada a ser atualizada.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vacancyId
 *               - userId
 *             properties:
 *               vacancyId:
 *                 type: integer
 *                 description: O ID da vaga.
 *               userId:
 *                 type: integer
 *                 description: O ID do usuário.
 *     responses:
 *       200:
 *         description: Candidatura cancelada atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: O ID da candidatura cancelada.
 *                 vacancyId:
 *                   type: integer
 *                   description: O ID da vaga.
 *                 userId:
 *                   type: integer
 *                   description: O ID do usuário.
 *       404:
 *         description: Candidatura cancelada não encontrada.
 *       500:
 *         description: Erro ao atualizar a candidatura cancelada.
 */

/**
 * @swagger
 * /cancelledApplication/{userId}/{vacancyId}:
 *   delete:
 *     summary: Deleta uma candidatura cancelada.
 *     tags:
 *       - Cancelled Applications
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: O ID do usuário.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: vacancyId
 *         required: true
 *         description: O ID da vaga.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Candidatura cancelada excluída com sucesso.
 *       404:
 *         description: Candidatura cancelada não encontrada.
 *       500:
 *         description: Erro ao excluir candidatura cancelada.
 */

//Rotas para candidaturas canceladas
router.get("/cancelledApplications", cancelledApplicationController.getAll);
router.get(
    "/cancelledApplication/:userId",
    cancelledApplicationController.getCancelledApplicationById
);
router.post(
    "/cancelledApplication",
    cancelledApplicationController.createCancelledApplication
);
router.put(
    "/cancelledApplication/:id",
    cancelledApplicationController.updateCancelledApplication
);
router.delete(
    "/cancelledApplication/:userId/:vacancyId",
    cancelledApplicationController.deleteCancelledApplication
);
/**
 * @swagger
 * tags:
 *   - name: Redefinir Senha
 *     description: Operações relacionadas à redefinição de senha
 */

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     tags: [Redefinir Senha]
 *     summary: Enviar email para recuperação de senha
 *     description: Envia um email com um link para redefinir a senha do usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário para o qual o link de redefinição de senha será enviado.
 *                 example: usuario@exemplo.com
 *     responses:
 *       200:
 *         description: E-mail de recuperação enviado com sucesso.
 *       400:
 *         description: E-mail não fornecido ou inválido.
 *       500:
 *         description: Erro ao enviar o e-mail.
 */
// router.post("/forgotPassword", forgotPasswordController.forgotPassword);

/**
 * @swagger
 * /resetPassword:
 *   post:
 *     tags: [Redefinir Senha]
 *     summary: Redefinir a senha do usuário
 *     description: Permite que o usuário redefina sua senha usando um token de recuperação enviado por e-mail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: O token gerado para a recuperação da senha.
 *                 example: "abcd1234xyz"
 *               newPassword:
 *                 type: string
 *                 description: A nova senha do usuário.
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso.
 *       400:
 *         description: Token inválido, expirado ou senha não fornecida.
 *       404:
 *         description: Usuário não encontrado com o e-mail correspondente.
 *       500:
 *         description: Erro ao atualizar a senha no banco de dados.
 */
// router.post("/resetPassword", forgotPasswordController.resetPassword);

router.get("/users", userController.getAll);
router.get("/user/:id", userController.getUserById);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
