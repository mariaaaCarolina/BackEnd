const connect = require("../connection");

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
        const [rows] = await conn.query(
            "SELECT COUNT(*) AS total FROM curriculums;"
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
            "SELECT segment AS segmento, COUNT(*) AS quantidade FROM companies GROUP BY segment ORDER BY quantidade DESC;"
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
            "SELECT age AS idade, COUNT(*) AS quantidade FROM curriculums GROUP BY age ORDER BY age ASC;"
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
        const [rows] = await conn.query("SELECT level FROM vacancies;");

        const decryptedLevelsCount = {};
        for (const row of rows) {
            if (row.level) {
                const decryptedLevel = decrypt(row.level);
                decryptedLevelsCount[decryptedLevel] =
                    (decryptedLevelsCount[decryptedLevel] || 0) + 1;
            }
        }
        const chartData = Object.keys(decryptedLevelsCount).map((level) => ({
            senioridade: level,
            quantidade: decryptedLevelsCount[level],
        }));

        chartData.sort((a, b) => {
            // // Exemplo de ordenação específica para senioridade:
            // const order = { 'Jovem Aprendiz': 1, 'Estágio': 2, 'Pleno': 3, 'Sênior': 4, 'Especialista': 5, 'Líder': 6 };
            // return (order[a.senioridade] || 99) - (order[b.senioridade] || 99);
            // Se você não tiver uma ordem específica, pode ordenar por quantidade:
            return b.quantidade - a.quantidade; // Maior para menor
        });

        return res.status(200).json(chartData);
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
            "SELECT COUNT(*) AS total FROM curriculums;"
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
            "SELECT COUNT(*) AS total FROM curriculums;"
        );
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
