const connect = require("../connection"); // Conecta diretamente ao DB

// Funções para os KPIs
const getKpiApplications = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            "SELECT COUNT(*) AS total FROM applications;"
        );
        return res.status(200).json(rows[0].total);
    } catch (error) {
        console.error("Erro ao buscar total de candidaturas (KPI):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getKpiCompanies = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            "SELECT COUNT(*) AS total FROM companies;"
        );
        return res.status(200).json(rows[0].total);
    } catch (error) {
        console.error("Erro ao buscar total de empresas (KPI):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getKpiResumes = async (req, res) => {
    try {
        const conn = await connect();
        // Ajuste a query se sua tabela de currículos for diferente ou se 'candidateId' não é o total direto.
        const [rows] = await conn.query(
            "SELECT COUNT(DISTINCT candidateId) AS total FROM applications;"
        );
        return res.status(200).json(rows[0].total);
    } catch (error) {
        console.error("Erro ao buscar total de currículos (KPI):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getKpiVacancies = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            "SELECT COUNT(*) AS total FROM vacancies;"
        );
        return res.status(200).json(rows[0].total);
    } catch (error) {
        console.error("Erro ao buscar total de vagas (KPI):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getKpiUsers = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query("SELECT COUNT(*) AS total FROM users;");
        return res.status(200).json(rows[0].total);
    } catch (error) {
        console.error("Erro ao buscar total de usuários (KPI):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

// Funções para os Gráficos
const getChartCompanySegments = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            "SELECT segmento, COUNT(*) AS quantidade FROM companies GROUP BY segmento ORDER BY quantidade DESC;"
        );
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar segmentos de empresas (Gráfico):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getChartCandidateAges = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            "SELECT idade, COUNT(*) AS quantidade FROM candidates GROUP BY idade ORDER BY idade ASC;"
        );
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar relação de idades (Gráfico):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getChartVacancySeniority = async (req, res) => {
    try {
        const conn = await connect();
        const [rows] = await conn.query(
            "SELECT senioridade, COUNT(*) AS quantidade FROM vacancies GROUP BY senioridade ORDER BY quantidade DESC;"
        );
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar senioridade das vagas (Gráfico):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getChartCompanyCandidateRelation = async (req, res) => {
    try {
        const conn = await connect();
        const [companiesCount] = await conn.query(
            "SELECT COUNT(*) AS total FROM companies;"
        );
        const [candidatesCount] = await conn.query(
            "SELECT COUNT(*) AS total FROM candidates;"
        );
        return res.status(200).json({
            companies: companiesCount[0].total,
            candidates: candidatesCount[0].total,
        });
    } catch (error) {
        console.error(
            "Erro ao buscar relação empresa-candidato (Gráfico):",
            error
        );
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

const getChartUserResumeRelation = async (req, res) => {
    try {
        const conn = await connect();
        const [usersCount] = await conn.query(
            "SELECT COUNT(*) AS total FROM users;"
        );
        const [resumesCount] = await conn.query(
            "SELECT COUNT(*) AS total FROM candidates;"
        ); // Ou 'resumes' se for uma tabela separada
        return res.status(200).json({
            users: usersCount[0].total,
            resumes: resumesCount[0].total,
        });
    } catch (error) {
        console.error(
            "Erro ao buscar relação usuário-currículo (Gráfico):",
            error
        );
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
};

module.exports = {
    getKpiApplications,
    getKpiCompanies,
    getKpiResumes,
    getKpiVacancies,
    getKpiUsers,
    getChartCompanySegments,
    getChartCandidateAges,
    getChartVacancySeniority,
    getChartCompanyCandidateRelation,
    getChartUserResumeRelation,
};
