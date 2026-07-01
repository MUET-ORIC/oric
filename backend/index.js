const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { parse } = require("csv-parse");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
const BASE_DATA_DIR = path.join(__dirname, "data");

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────
const getKpiPath = (moduleName, department, kpiName) => {
    const safeDept = department.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    const base = path.join(BASE_DATA_DIR, moduleName, safeDept, kpiName);
    return {
        csvPath: path.join(base, `${kpiName}.csv`),
        docsFolder: path.join(base, "Evidences"),
        baseFolder: base,
    };
};

const getGlobalKpiPath = (moduleName, kpiName) => {
    const base = path.join(BASE_DATA_DIR, moduleName);
    return { csvPath: path.join(base, `${kpiName}.csv`), baseFolder: base };
};

const getGlobalEvidencesPath = (moduleName) => {
    return path.join(BASE_DATA_DIR, moduleName, "Evidences");
};

const isFileLocked = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) return false;
        const fd = fs.openSync(filePath, 'r+');
        fs.writeSync(fd, '');
        fs.closeSync(fd);
        return false;
    } catch (err) {
        if (err.code === 'EBUSY' || err.code === 'EPERM' || err.code === 'EACCES') return true;
        return false;
    }
};

// ─── ATOMIC CSV WRITER (FIXED) ──────────────────────────────────────────
const writeCSVAtomically = (csvPath, headers, row) => {
    const folder = path.dirname(csvPath);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const fileExists = fs.existsSync(csvPath);
    let existingData = "";

    if (!fileExists) {
        const headerRow = headers.map(h => h.title).join(",");
        existingData = headerRow + "\n";
    } else {
        existingData = fs.readFileSync(csvPath, "utf8");
    }

    const rowValues = headers.map(h => {
        const val = row[h.id] !== undefined ? row[h.id] : "";
        if (typeof val === "string" && (val.includes(",") || val.includes('"'))) {
            return `"${val.replace(/"/g, '""')}"`;
        }
        return val;
    });
    const newLine = rowValues.join(",") + "\n";

    const tempPath = csvPath + ".tmp";
    fs.writeFileSync(tempPath, existingData + newLine, "utf8");
    fs.renameSync(tempPath, csvPath);
};

// ─── MULTER SETUP ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const urlParts = req.originalUrl.split('/');
        const moduleName = urlParts[2] === 'research' ? 'ResearchExcellence' :
            urlParts[2] === 'innovation' ? 'InnovationCommercialization' :
                'SustainabilityCapacityBuilding';
        const department = req.body.department || "Unknown";
        const kpi = urlParts[urlParts.length - 1];
        const kpiName = kpi.toUpperCase();
        const { docsFolder } = getKpiPath(moduleName, department, kpiName);
        if (!fs.existsSync(docsFolder)) fs.mkdirSync(docsFolder, { recursive: true });
        cb(null, docsFolder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") cb(null, true);
        else cb(new Error("Only PDF files are allowed"), false);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

// ─── GENERIC POST HANDLER ──────────────────────────────────────────────────
const handleKpiPost = async (req, res, moduleName, kpiName, headers, fieldMapping) => {
    try {
        const b = req.body;
        const file = req.file;
        const department = b.department || "Unknown";

        const deptCsvPath = getKpiPath(moduleName, department, kpiName).csvPath;
        const globalCsvPath = getGlobalKpiPath(moduleName, kpiName).csvPath;

        if (isFileLocked(deptCsvPath) || isFileLocked(globalCsvPath)) {
            return res.status(409).json({
                success: false,
                message: "CSV file is open in another program. Close and retry."
            });
        }

        const row = {};
        Object.keys(fieldMapping).forEach(key => {
            row[key] = b[key] || "NIL";
        });
        row.document = file ? file.filename : "NIL";

        const getNextSr = (csvPath) => {
            if (!fs.existsSync(csvPath)) return 1;
            const data = fs.readFileSync(csvPath, "utf8");
            const lines = data.split("\n").filter(line => line.trim() !== "");
            return lines.length;
        };

        const srDept = getNextSr(deptCsvPath);
        const srGlobal = getNextSr(globalCsvPath);

        const deptRow = { ...row, sr: srDept };
        writeCSVAtomically(deptCsvPath, headers, deptRow);

        const globalRow = { ...row, sr: srGlobal };
        writeCSVAtomically(globalCsvPath, headers, globalRow);

        if (file) {
            const globalEvidencesDir = getGlobalEvidencesPath(moduleName);
            if (!fs.existsSync(globalEvidencesDir)) {
                fs.mkdirSync(globalEvidencesDir, { recursive: true });
            }
            const sourcePath = file.path;
            const targetPath = path.join(globalEvidencesDir, file.filename);
            fs.copyFileSync(sourcePath, targetPath);
        }

        res.json({ success: true, message: `${kpiName} saved`, row: deptRow, globalSr: srGlobal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// ─── READ CSV → JSON ENDPOINT ──────────────────────────────────────────
app.get('/api/data/:module/:kpi', (req, res) => {
    const { module, kpi } = req.params;
    const department = req.query.department || 'Unknown';

    const deptPath = getKpiPath(module, department, kpi).csvPath;
    const globalPath = getGlobalKpiPath(module, kpi).csvPath;

    const readCSV = (filePath) => {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(filePath)) return resolve([]);
            const records = [];
            fs.createReadStream(filePath)
                .pipe(parse({ columns: true, trim: true }))
                .on('data', (row) => records.push(row))
                .on('end', () => resolve(records))
                .on('error', reject);
        });
    };

    Promise.all([readCSV(deptPath), readCSV(globalPath)])
        .then(([deptData, globalData]) => {
            res.json({ success: true, department: deptData, global: globalData });
        })
        .catch((err) => {
            console.error('CSV read error:', err);
            res.status(500).json({ success: false, message: err.message });
        });
});

// ════════════════════════════════════════════════════════════════════════════
//  1.  RESEARCH EXCELLENCE (18 KPIs)
// ════════════════════════════════════════════════════════════════════════════
const RESEARCH_MODULE = "ResearchExcellence";

// ─── Research Headers ─────────────────────────────────────────────────
const researchKpi1Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "submissionDate", title: "Date of Proposal Submission" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingRequested", title: "Total Funding Requested (PKR Million)" },
    { id: "collaborators", title: "Collaborating Partner(s) Details" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "status", title: "Status" },
    { id: "remarks", title: "Remarks / Any other information" },
    { id: "document", title: "Annex Page Ref. No. (Proposal Submission Email Copy)" },
];
const researchKpi2Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "approvalDate", title: "Date of Proposal Approval" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Funding Approved (PKR Million)" },
    { id: "collaborators", title: "Collaborating Partner(s) Details" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "oricOverhead", title: "ORIC Overhead in Approved Funding" },
    { id: "dateOfApproval", title: "Date of Approval" },
    { id: "status", title: "Status" },
    { id: "remarks", title: "Remarks / Any other information" },
    { id: "document", title: "Annex Page Ref. No. (Award Letter Copy)" },
];
const researchKpi3Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "piName", title: "Name of PI" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Due Date (Scheduled Completion)" },
    { id: "funding", title: "Total Funding (PKR)" },
    { id: "collaborators", title: "Collaborating Partner(s) Details" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "status", title: "Status" },
    { id: "remarks", title: "Remarks / Any other information" },
    { id: "document", title: "Annex Page Ref. No. (Completion Letter Copy)" },
];
const researchKpi4Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "completionDate", title: "Date of Project Completion" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "status", title: "Status of Project" },
    { id: "fundingUtilized", title: "Total Funding Utilized (Rs.)" },
    { id: "fundingReleased", title: "Total Funding Released (PKR Million)" },
    { id: "deliverables", title: "Key Project Deliverables" },
    { id: "outcomes", title: "Key Project Outcomes" },
    { id: "document", title: "Annex Page Ref. No. (Completion Letter Copy)" },
];
const researchKpi5Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "submissionDate", title: "Date of Proposal Submission" },
    { id: "nationalInternational", title: "National or International" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingRequested", title: "Total Funding Requested (PKR Million)" },
    { id: "collaborators", title: "Collaborating Partner(s) Details" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "status", title: "Status" },
    { id: "document", title: "Annex Page Ref. No. (Proposal Submission Email)" },
];
const researchKpi6Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "approvalDate", title: "Date of Proposal Approval" },
    { id: "nationalInternational", title: "National or International" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Funding Approved (PKR Million)" },
    { id: "collaborators", title: "Collaborating Partner(s) Details" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "dateOfApproval", title: "Date of Approval" },
    { id: "document", title: "Annexure Page Ref. No. (Award Letter Copy)" },
];
const researchKpi7Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant and Funding Body" },
    { id: "completionDate", title: "Date of Project Completion" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "status", title: "Status of Project" },
    { id: "fundingUtilized", title: "Total Funding Utilized (Rs.)" },
    { id: "fundingReleased", title: "Total Funding Released (PKR Million)" },
    { id: "deliverables", title: "Key Project Deliverables" },
    { id: "outcomes", title: "Key Project Outcomes" },
    { id: "document", title: "Annex Page Ref. No. (Completion Letter Copy)" },
];
const researchKpi8Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Joint Research Grant & Funding Agency" },
    { id: "approvalDate", title: "Date of Joint Project Approval" },
    { id: "nationalInternational", title: "National or International" },
    { id: "piName", title: "Name of PI with Designation and Department" },
    { id: "coPiName", title: "Name of Co-PI with Designation, Department & University" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Funding Approved (PKR Million)" },
    { id: "coFunding", title: "Co Funding Partner(s) Details" },
    { id: "status", title: "Status / Remarks" },
    { id: "document", title: "Annex Page Ref. No. (Award Letter Copy)" },
];
const researchKpi9Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant and Funding Body" },
    { id: "executionDate", title: "Date of Project Execution" },
    { id: "piName", title: "Name of PI with Designation & Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "fundingApproved", title: "Total Amount Approved (PKR Millions)" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "oricOverhead", title: "ORIC Overhead in Approved Funding" },
    { id: "deliverables", title: "Key Project Expected Deliverables" },
    { id: "outcomes", title: "Key Project Expected Outcomes" },
    { id: "approvalDate", title: "Date of Approval" },
    { id: "document", title: "Annex Page Ref. No. (Award Letter Copy)" },
];
const researchKpi10Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant and Funding Body Applied" },
    { id: "reviewDate", title: "Date of Review" },
    { id: "piName", title: "Name of PI with Designation & Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "thematic", title: "Thematic Area" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "fundingRequested", title: "Total Amount Requested (PKR Millions)" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "approvalDate", title: "Date of Approval" },
    { id: "deliverables", title: "Key Project Expected Deliverables" },
    { id: "outcomes", title: "Key Project Expected Outcomes" },
    { id: "irbDecision", title: "IRB Meeting Decision" },
    { id: "document", title: "Annex Page Ref. No. (IRB Meeting Minutes Copy)" },
];
const researchKpi11Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "governmentBody", title: "Name of Government Body Presented" },
    { id: "presentationDate", title: "Date of Presentation" },
    { id: "piName", title: "Name of PI with Designation & Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "areaAdvocated", title: "Area Advocated" },
    { id: "brief", title: "Brief" },
    { id: "coalitionPartners", title: "Coalition Partners in Advocacy" },
    { id: "issueVerification", title: "Issue Verification" },
    { id: "backingResearch", title: "Backing Research Status" },
    { id: "advocacyTools", title: "Advocacy Tools Adopted" },
    { id: "document", title: "Annex Page Ref. No. (Policy / Case Study Brief Copy)" },
];
const researchKpi12Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "linkageType", title: "Type of Linkage" },
    { id: "mouDate", title: "Date of MoU/Agreement" },
    { id: "nationalInternational", title: "National or International" },
    { id: "hostInstitution", title: "Name and Address with Country of Host Institution" },
    { id: "collaboratingAgency", title: "Name and Address of Collaborating Agency/Institution" },
    { id: "fieldOfStudy", title: "Field of Study / Research Broader Areas" },
    { id: "scope", title: "Scope of Collaboration" },
    { id: "salientFeatures", title: "Salient Features of Linkage" },
    { id: "document", title: "Annex Page Ref. No. (MoU Copy)" },
];
const researchKpi13Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "thematicTitle", title: "Thematic Areas and Title of Research Proposal" },
    { id: "contractDate", title: "Date of Contract Signed" },
    { id: "piName", title: "Name of PI with Designation, Department" },
    { id: "coPiName", title: "Name of Co-PI with Designation, Department & University" },
    { id: "sponsoringAgency", title: "Sponsoring Agency Name and Address & Country" },
    { id: "nationalInternational", title: "National / International" },
    { id: "industryCounterpart", title: "Counterpart from Industry (address with country)" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Amount Approved (PKR Millions)" },
    { id: "deliverables", title: "Project Expected Deliverables and Outcomes" },
    { id: "contractDateSigned", title: "Date of Contract" },
    { id: "document", title: "Annex Page Ref. No. (Contract Research Agreement Copy)" },
];
const researchKpi14Headers = researchKpi13Headers;
const researchKpi15Headers = researchKpi13Headers;
const researchKpi16Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "eventTitle", title: "Title of Event / Initiative" },
    { id: "eventDate", title: "Date of Event" },
    { id: "communityComponent", title: "Component of community involved / addressed to" },
    { id: "outcome", title: "Outcome" },
    { id: "collaboration", title: "Collaboration developed" },
    { id: "csos", title: "CSOs/NGOs engaged" },
    { id: "sponsor", title: "Name of sponsoring agency (Grant Value/ Sponsors)" },
    { id: "arrangedParticipated", title: "Will be Arranged/ Participated" },
    { id: "dissemination", title: "Dissemination/ outcome Material/ Literature" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No. (Brief Event Report / Brochures etc.)" },
];
const researchKpi17Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "projectTitle", title: "Title of Project" },
    { id: "executionDate", title: "Date of Execution" },
    { id: "piName", title: "Name of PI with Designation, Department" },
    { id: "designation", title: "Designation of PI" },
    { id: "department", title: "Department of PI" },
    { id: "companyDetails", title: "Company Details (Name, Country, etc.)" },
    { id: "contractValue", title: "Contract Value (PKR Millions)" },
    { id: "startDate", title: "Project Timelines (Start)" },
    { id: "endDate", title: "Project Timelines (End)" },
    { id: "consultancyType", title: "Type of Consultancy Services" },
    { id: "deliverables", title: "Key Deliverables out of the Consultancy Contract" },
    { id: "oricPercentage", title: "ORIC Percentage (if any)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No. (Contract Copy)" },
];
const researchKpi18Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "liaisonDeveloped", title: "Liaison Developed with" },
    { id: "executionDate", title: "Date of Execution" },
    { id: "document", title: "Annex Page Ref. No." },
];

// ─── Research Field Maps ────────────────────────────────────────────────
const researchFieldMaps = [
    { grantName: "grantName", submissionDate: "submissionDate", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", fundingRequested: "fundingRequested", collaborators: "collaborators", coFunding: "coFunding", status: "status", remarks: "remarks" },
    { grantName: "grantName", approvalDate: "approvalDate", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", collaborators: "collaborators", coFunding: "coFunding", oricOverhead: "oricOverhead", dateOfApproval: "dateOfApproval", status: "status", remarks: "remarks" },
    { grantName: "grantName", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", funding: "funding", collaborators: "collaborators", coFunding: "coFunding", status: "status", remarks: "remarks" },
    { grantName: "grantName", completionDate: "completionDate", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", status: "status", fundingUtilized: "fundingUtilized", fundingReleased: "fundingReleased", deliverables: "deliverables", outcomes: "outcomes" },
    { grantName: "grantName", submissionDate: "submissionDate", nationalInternational: "nationalInternational", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", fundingRequested: "fundingRequested", collaborators: "collaborators", coFunding: "coFunding", status: "status" },
    { grantName: "grantName", approvalDate: "approvalDate", nationalInternational: "nationalInternational", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", collaborators: "collaborators", coFunding: "coFunding", dateOfApproval: "dateOfApproval" },
    { grantName: "grantName", completionDate: "completionDate", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", status: "status", fundingUtilized: "fundingUtilized", fundingReleased: "fundingReleased", deliverables: "deliverables", outcomes: "outcomes" },
    { grantName: "grantName", approvalDate: "approvalDate", nationalInternational: "nationalInternational", piName: "piName", coPiName: "coPiName", thematic: "thematic", title: "title", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", coFunding: "coFunding", status: "status" },
    { grantName: "grantName", executionDate: "executionDate", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", fundingApproved: "fundingApproved", startDate: "startDate", endDate: "endDate", oricOverhead: "oricOverhead", deliverables: "deliverables", outcomes: "outcomes", approvalDate: "approvalDate" },
    { grantName: "grantName", reviewDate: "reviewDate", piName: "piName", designation: "designation", department: "department", thematic: "thematic", title: "title", fundingRequested: "fundingRequested", startDate: "startDate", endDate: "endDate", approvalDate: "approvalDate", deliverables: "deliverables", outcomes: "outcomes", irbDecision: "irbDecision" },
    { governmentBody: "governmentBody", presentationDate: "presentationDate", piName: "piName", designation: "designation", department: "department", areaAdvocated: "areaAdvocated", brief: "brief", coalitionPartners: "coalitionPartners", issueVerification: "issueVerification", backingResearch: "backingResearch", advocacyTools: "advocacyTools" },
    { linkageType: "linkageType", mouDate: "mouDate", nationalInternational: "nationalInternational", hostInstitution: "hostInstitution", collaboratingAgency: "collaboratingAgency", fieldOfStudy: "fieldOfStudy", scope: "scope", salientFeatures: "salientFeatures" },
    { thematicTitle: "thematicTitle", contractDate: "contractDate", piName: "piName", coPiName: "coPiName", sponsoringAgency: "sponsoringAgency", nationalInternational: "nationalInternational", industryCounterpart: "industryCounterpart", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", deliverables: "deliverables", contractDateSigned: "contractDateSigned" },
    { thematicTitle: "thematicTitle", contractDate: "contractDate", piName: "piName", coPiName: "coPiName", sponsoringAgency: "sponsoringAgency", nationalInternational: "nationalInternational", industryCounterpart: "industryCounterpart", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", deliverables: "deliverables", contractDateSigned: "contractDateSigned" },
    { thematicTitle: "thematicTitle", contractDate: "contractDate", piName: "piName", coPiName: "coPiName", sponsoringAgency: "sponsoringAgency", nationalInternational: "nationalInternational", industryCounterpart: "industryCounterpart", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", deliverables: "deliverables", contractDateSigned: "contractDateSigned" },
    { eventTitle: "eventTitle", eventDate: "eventDate", communityComponent: "communityComponent", outcome: "outcome", collaboration: "collaboration", csos: "csos", sponsor: "sponsor", arrangedParticipated: "arrangedParticipated", dissemination: "dissemination", remarks: "remarks" },
    { projectTitle: "projectTitle", executionDate: "executionDate", piName: "piName", designation: "designation", department: "department", companyDetails: "companyDetails", contractValue: "contractValue", startDate: "startDate", endDate: "endDate", consultancyType: "consultancyType", deliverables: "deliverables", oricPercentage: "oricPercentage", remarks: "remarks" },
    { liaisonDeveloped: "liaisonDeveloped", executionDate: "executionDate" }
];

// ─── Research Routes ──────────────────────────────────────────────────
app.post("/submit/research/kpi1", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI1", researchKpi1Headers, researchFieldMaps[0]);
});
app.post("/submit/research/kpi2", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI2", researchKpi2Headers, researchFieldMaps[1]);
});
app.post("/submit/research/kpi3", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI3", researchKpi3Headers, researchFieldMaps[2]);
});
app.post("/submit/research/kpi4", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI4", researchKpi4Headers, researchFieldMaps[3]);
});
app.post("/submit/research/kpi5", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI5", researchKpi5Headers, researchFieldMaps[4]);
});
app.post("/submit/research/kpi6", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI6", researchKpi6Headers, researchFieldMaps[5]);
});
app.post("/submit/research/kpi7", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI7", researchKpi7Headers, researchFieldMaps[6]);
});
app.post("/submit/research/kpi8", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI8", researchKpi8Headers, researchFieldMaps[7]);
});
app.post("/submit/research/kpi9", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI9", researchKpi9Headers, researchFieldMaps[8]);
});
app.post("/submit/research/kpi10", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI10", researchKpi10Headers, researchFieldMaps[9]);
});
app.post("/submit/research/kpi11", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI11", researchKpi11Headers, researchFieldMaps[10]);
});
app.post("/submit/research/kpi12", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI12", researchKpi12Headers, researchFieldMaps[11]);
});
app.post("/submit/research/kpi13", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI13", researchKpi13Headers, researchFieldMaps[12]);
});
app.post("/submit/research/kpi14", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI14", researchKpi14Headers, researchFieldMaps[13]);
});
app.post("/submit/research/kpi15", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI15", researchKpi15Headers, researchFieldMaps[14]);
});
app.post("/submit/research/kpi16", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI16", researchKpi16Headers, researchFieldMaps[15]);
});
app.post("/submit/research/kpi17", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI17", researchKpi17Headers, researchFieldMaps[16]);
});
app.post("/submit/research/kpi18", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, RESEARCH_MODULE, "KPI18", researchKpi18Headers, researchFieldMaps[17]);
});

// ════════════════════════════════════════════════════════════════════════════
//  2.  INNOVATION & COMMERCIALIZATION (17 KPIs)
// ════════════════════════════════════════════════════════════════════════════
const INNOVATION_MODULE = "InnovationCommercialization";

const innovationKpi1Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "policyTitle", title: "Title of HEI Research Policy" },
    { id: "policyRef", title: "Research Policy Ref. No" },
    { id: "approvalDate", title: "Date of Approval" },
    { id: "approvedBy", title: "Approved by" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi2Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "policyTitle", title: "Title of HEI IP Policy" },
    { id: "policyRef", title: "IP Policy Ref. No" },
    { id: "approvalDate", title: "Date of Approval" },
    { id: "approvedBy", title: "Approved by" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi3Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "policyTitle", title: "Title of Policy" },
    { id: "policyRef", title: "Policy Ref. No" },
    { id: "approvalDate", title: "Date of Approval" },
    { id: "approvedBy", title: "Approved by" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi4Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title of Disclosure" },
    { id: "category", title: "Category (Product/Process/Technology)" },
    { id: "status", title: "Development Status" },
    { id: "keyAspects", title: "Key Scientific Aspects" },
    { id: "publisher", title: "Publisher / Journal" },
    { id: "nationalInternational", title: "National / International" },
    { id: "fieldOfUse", title: "Field of Use" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi5Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title of Invention" },
    { id: "category", title: "Category" },
    { id: "status", title: "Development Status" },
    { id: "keyAspects", title: "Key Scientific Aspects" },
    { id: "nationalInternational", title: "National / International" },
    { id: "fieldOfUse", title: "Field of Use" },
    { id: "filingDate", title: "Date of Filing" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi6Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title of Invention" },
    { id: "category", title: "Category" },
    { id: "status", title: "Development Status" },
    { id: "keyAspects", title: "Key Scientific Aspects" },
    { id: "nationalInternational", title: "National / International" },
    { id: "grantDate", title: "Date of Grant" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi7Headers = innovationKpi5Headers;
const innovationKpi8Headers = innovationKpi6Headers;
const innovationKpi9Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title of IP" },
    { id: "category", title: "Category" },
    { id: "status", title: "Development Status" },
    { id: "keyAspects", title: "Key Scientific Aspects" },
    { id: "nationalInternational", title: "National / International" },
    { id: "fieldOfUse", title: "Field of Use" },
    { id: "licensee", title: "Licensee Details" },
    { id: "negotiationDate", title: "Date of Negotiation" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi10Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title of Invention" },
    { id: "category", title: "Category" },
    { id: "status", title: "Development Status" },
    { id: "keyAspects", title: "Key Scientific Aspects" },
    { id: "nationalInternational", title: "National / International" },
    { id: "fieldOfUse", title: "Field of Use" },
    { id: "licensee", title: "Licensee Details" },
    { id: "agreementDate", title: "Date and Duration of Agreement" },
    { id: "exclusive", title: "Exclusive or Non-Exclusive" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No. (Agreement Cover Copy)" },
];
const innovationKpi11Headers = innovationKpi9Headers;
const innovationKpi12Headers = innovationKpi10Headers;
const innovationKpi13Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title" },
    { id: "category", title: "Category" },
    { id: "status", title: "Development Status" },
    { id: "thematic", title: "Thematic Area" },
    { id: "nationalInternational", title: "National / International" },
    { id: "fieldOfUse", title: "Field of Use" },
    { id: "collaborators", title: "Collaborators" },
    { id: "funding", title: "Funding Source" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi14Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "title", title: "Title" },
    { id: "category", title: "Category" },
    { id: "nationalInternational", title: "National / International" },
    { id: "event", title: "Event / Platform" },
    { id: "outcome", title: "Outcome / Achievement" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi15Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "visitorName", title: "Name of Visitor" },
    { id: "visitDate", title: "Date of Visit" },
    { id: "agenda", title: "Agenda of Visit" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi16Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "type", title: "Type of Agreement" },
    { id: "nationalInternational", title: "National / International" },
    { id: "partner", title: "Partner Details" },
    { id: "date", title: "Date of Agreement" },
    { id: "duration", title: "Duration" },
    { id: "scope", title: "Scope of Collaboration" },
    { id: "financial", title: "Financial Details (if any)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const innovationKpi17Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "awardTitle", title: "Title of Award" },
    { id: "awardingBody", title: "Awarding Body" },
    { id: "nationalInternational", title: "National / International" },
    { id: "winnerName", title: "Name of Winner" },
    { id: "designation", title: "Designation" },
    { id: "department", title: "Department" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];

const innovationFieldMaps = [
    { policyTitle: "policyTitle", policyRef: "policyRef", approvalDate: "approvalDate", approvedBy: "approvedBy" },
    { policyTitle: "policyTitle", policyRef: "policyRef", approvalDate: "approvalDate", approvedBy: "approvedBy" },
    { policyTitle: "policyTitle", policyRef: "policyRef", approvalDate: "approvalDate", approvedBy: "approvedBy" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", publisher: "publisher", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", filingDate: "filingDate", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", grantDate: "grantDate", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", filingDate: "filingDate", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", grantDate: "grantDate", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", licensee: "licensee", negotiationDate: "negotiationDate", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", licensee: "licensee", agreementDate: "agreementDate", exclusive: "exclusive", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", licensee: "licensee", negotiationDate: "negotiationDate", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", keyAspects: "keyAspects", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", licensee: "licensee", agreementDate: "agreementDate", exclusive: "exclusive", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", status: "status", thematic: "thematic", nationalInternational: "nationalInternational", fieldOfUse: "fieldOfUse", collaborators: "collaborators", funding: "funding", remarks: "remarks" },
    { name: "name", designation: "designation", department: "department", title: "title", category: "category", nationalInternational: "nationalInternational", event: "event", outcome: "outcome", remarks: "remarks" },
    { visitorName: "visitorName", visitDate: "visitDate", agenda: "agenda", remarks: "remarks" },
    { type: "type", nationalInternational: "nationalInternational", partner: "partner", date: "date", duration: "duration", scope: "scope", financial: "financial", remarks: "remarks" },
    { awardTitle: "awardTitle", awardingBody: "awardingBody", nationalInternational: "nationalInternational", winnerName: "winnerName", designation: "designation", department: "department", remarks: "remarks" }
];

// ─── Innovation Routes ──────────────────────────────────────────────
app.post("/submit/innovation/kpi1", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI1", innovationKpi1Headers, innovationFieldMaps[0]);
});
app.post("/submit/innovation/kpi2", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI2", innovationKpi2Headers, innovationFieldMaps[1]);
});
app.post("/submit/innovation/kpi3", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI3", innovationKpi3Headers, innovationFieldMaps[2]);
});
app.post("/submit/innovation/kpi4", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI4", innovationKpi4Headers, innovationFieldMaps[3]);
});
app.post("/submit/innovation/kpi5", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI5", innovationKpi5Headers, innovationFieldMaps[4]);
});
app.post("/submit/innovation/kpi6", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI6", innovationKpi6Headers, innovationFieldMaps[5]);
});
app.post("/submit/innovation/kpi7", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI7", innovationKpi7Headers, innovationFieldMaps[6]);
});
app.post("/submit/innovation/kpi8", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI8", innovationKpi8Headers, innovationFieldMaps[7]);
});
app.post("/submit/innovation/kpi9", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI9", innovationKpi9Headers, innovationFieldMaps[8]);
});
app.post("/submit/innovation/kpi10", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI10", innovationKpi10Headers, innovationFieldMaps[9]);
});
app.post("/submit/innovation/kpi11", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI11", innovationKpi11Headers, innovationFieldMaps[10]);
});
app.post("/submit/innovation/kpi12", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI12", innovationKpi12Headers, innovationFieldMaps[11]);
});
app.post("/submit/innovation/kpi13", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI13", innovationKpi13Headers, innovationFieldMaps[12]);
});
app.post("/submit/innovation/kpi14", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI14", innovationKpi14Headers, innovationFieldMaps[13]);
});
app.post("/submit/innovation/kpi15", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI15", innovationKpi15Headers, innovationFieldMaps[14]);
});
app.post("/submit/innovation/kpi16", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI16", innovationKpi16Headers, innovationFieldMaps[15]);
});
app.post("/submit/innovation/kpi17", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, INNOVATION_MODULE, "KPI17", innovationKpi17Headers, innovationFieldMaps[16]);
});

// ════════════════════════════════════════════════════════════════════════════
//  3.  SUSTAINABILITY & CAPACITY BUILDING (7 KPIs)
// ════════════════════════════════════════════════════════════════════════════
const SUSTAINABILITY_MODULE = "SustainabilityCapacityBuilding";

const sustainabilityKpi1Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "planTitle", title: "Title of Strategic Plan" },
    { id: "approvalDate", title: "Date of Approval" },
    { id: "approvedBy", title: "Approved by" },
    { id: "submittedToHEC", title: "Submitted to HEC (Yes/No)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const sustainabilityKpi2Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "grantName", title: "Name of Research Grant" },
    { id: "nationalInternational", title: "National or International" },
    { id: "title", title: "Title of Research Proposal" },
    { id: "piName", title: "Name and Details of PI" },
    { id: "startDate", title: "Duration (Starting Date)" },
    { id: "endDate", title: "Duration (Ending Date)" },
    { id: "fundingApproved", title: "Total Funding Approved (PKR Millions)" },
    { id: "fundingReleased", title: "Total Funding Released (PKR Millions)" },
    { id: "oricOverheadApproved", title: "ORIC Overhead in Approved Funding (Rs.)" },
    { id: "oricOverheadReleased", title: "ORIC Overhead in Released Funding (Rs.)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No. (Audited Statement)" },
];
const sustainabilityKpi3Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "name", title: "Name, Designation and Department" },
    { id: "title", title: "Title" },
    { id: "nationalInternational", title: "National / International" },
    { id: "agreementDate", title: "Date and Duration of Agreement" },
    { id: "licensee", title: "Licensee Details (Name, Organization)" },
    { id: "royaltyShare", title: "Fee / Royalty Share Percentages" },
    { id: "totalAmount", title: "Total Amount (PKR Millions)" },
    { id: "oricApprovedShare", title: "ORIC Approved Share (PKR Millions)" },
    { id: "oricReceivedShare", title: "ORIC Received Share (PKR Millions)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No. (Audited Statement)" },
];
const sustainabilityKpi4Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "title", title: "Title of Training" },
    { id: "eventDate", title: "Date of Event" },
    { id: "participants", title: "No. of Participants" },
    { id: "focusArea", title: "Major Focus Area & Outcomes" },
    { id: "audienceType", title: "Audience Type (student/faculty/researchers)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const sustainabilityKpi5Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "title", title: "Title of Training" },
    { id: "eventDate", title: "Date of Event" },
    { id: "participants", title: "No. of Participants" },
    { id: "focusArea", title: "Major Focus Area & Outcomes" },
    { id: "organizer", title: "Organizer" },
    { id: "audienceType", title: "Audience Type (student/faculty/researchers)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const sustainabilityKpi6Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "eventType", title: "Type of Event" },
    { id: "eventDate", title: "Date of Event" },
    { id: "participants", title: "No. of Participants" },
    { id: "focusArea", title: "Major Focus Area & Outcomes" },
    { id: "audienceType", title: "Audience Type (student/faculty/researchers)" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];
const sustainabilityKpi7Headers = [
    { id: "sr", title: "Sr. No." },
    { id: "title", title: "Title of Training" },
    { id: "eventDate", title: "Date of Event" },
    { id: "participants", title: "No. of Participants" },
    { id: "focusArea", title: "Major Focus Area & Outcomes" },
    { id: "personnelName", title: "Name and Details of ORIC Personnel Who Attended" },
    { id: "remarks", title: "Remarks" },
    { id: "document", title: "Annex Page Ref. No." },
];

const sustainabilityFieldMaps = [
    { planTitle: "planTitle", approvalDate: "approvalDate", approvedBy: "approvedBy", submittedToHEC: "submittedToHEC", remarks: "remarks" },
    { grantName: "grantName", nationalInternational: "nationalInternational", title: "title", piName: "piName", startDate: "startDate", endDate: "endDate", fundingApproved: "fundingApproved", fundingReleased: "fundingReleased", oricOverheadApproved: "oricOverheadApproved", oricOverheadReleased: "oricOverheadReleased", remarks: "remarks" },
    { name: "name", title: "title", nationalInternational: "nationalInternational", agreementDate: "agreementDate", licensee: "licensee", royaltyShare: "royaltyShare", totalAmount: "totalAmount", oricApprovedShare: "oricApprovedShare", oricReceivedShare: "oricReceivedShare", remarks: "remarks" },
    { title: "title", eventDate: "eventDate", participants: "participants", focusArea: "focusArea", audienceType: "audienceType", remarks: "remarks" },
    { title: "title", eventDate: "eventDate", participants: "participants", focusArea: "focusArea", organizer: "organizer", audienceType: "audienceType", remarks: "remarks" },
    { eventType: "eventType", eventDate: "eventDate", participants: "participants", focusArea: "focusArea", audienceType: "audienceType", remarks: "remarks" },
    { title: "title", eventDate: "eventDate", participants: "participants", focusArea: "focusArea", personnelName: "personnelName", remarks: "remarks" }
];

// ─── Sustainability Routes ──────────────────────────────────────────
app.post("/submit/sustainability/kpi1", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI1", sustainabilityKpi1Headers, sustainabilityFieldMaps[0]);
});
app.post("/submit/sustainability/kpi2", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI2", sustainabilityKpi2Headers, sustainabilityFieldMaps[1]);
});
app.post("/submit/sustainability/kpi3", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI3", sustainabilityKpi3Headers, sustainabilityFieldMaps[2]);
});
app.post("/submit/sustainability/kpi4", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI4", sustainabilityKpi4Headers, sustainabilityFieldMaps[3]);
});
app.post("/submit/sustainability/kpi5", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI5", sustainabilityKpi5Headers, sustainabilityFieldMaps[4]);
});
app.post("/submit/sustainability/kpi6", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI6", sustainabilityKpi6Headers, sustainabilityFieldMaps[5]);
});
app.post("/submit/sustainability/kpi7", upload.single("documentFile"), (req, res) => {
    handleKpiPost(req, res, SUSTAINABILITY_MODULE, "KPI7", sustainabilityKpi7Headers, sustainabilityFieldMaps[6]);
});

// ─── START SERVER ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log("📁 Data stored under ./data/");
});