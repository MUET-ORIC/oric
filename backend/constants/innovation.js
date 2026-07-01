// ─── INNOVATION KPI HEADERS ───────────────────────────────────────────

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

// KPI7 reuses KPI5 headers (FILED International)
// KPI8 reuses KPI6 headers (GRANTED International)
// KPI9 and KPI11 use innovationKpi9Headers
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

// KPI10 and KPI12 use innovationKpi10Headers
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

// ─── INNOVATION FIELD MAPS ─────────────────────────────────────────────

const innovationFieldMaps = [
    // KPI1
    { policyTitle: "policyTitle", policyRef: "policyRef", approvalDate: "approvalDate", approvedBy: "approvedBy" },
    // KPI2
    { policyTitle: "policyTitle", policyRef: "policyRef", approvalDate: "approvalDate", approvedBy: "approvedBy" },
    // KPI3
    { policyTitle: "policyTitle", policyRef: "policyRef", approvalDate: "approvalDate", approvedBy: "approvedBy" },
    // KPI4
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        publisher: "publisher",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        remarks: "remarks",
    },
    // KPI5
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        filingDate: "filingDate",
        remarks: "remarks",
    },
    // KPI6
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        grantDate: "grantDate",
        remarks: "remarks",
    },
    // KPI7 (same as KPI5)
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        filingDate: "filingDate",
        remarks: "remarks",
    },
    // KPI8 (same as KPI6)
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        grantDate: "grantDate",
        remarks: "remarks",
    },
    // KPI9
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        licensee: "licensee",
        negotiationDate: "negotiationDate",
        remarks: "remarks",
    },
    // KPI10
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        licensee: "licensee",
        agreementDate: "agreementDate",
        exclusive: "exclusive",
        remarks: "remarks",
    },
    // KPI11 (same as KPI9)
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        licensee: "licensee",
        negotiationDate: "negotiationDate",
        remarks: "remarks",
    },
    // KPI12 (same as KPI10)
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        keyAspects: "keyAspects",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        licensee: "licensee",
        agreementDate: "agreementDate",
        exclusive: "exclusive",
        remarks: "remarks",
    },
    // KPI13
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        status: "status",
        thematic: "thematic",
        nationalInternational: "nationalInternational",
        fieldOfUse: "fieldOfUse",
        collaborators: "collaborators",
        funding: "funding",
        remarks: "remarks",
    },
    // KPI14
    {
        name: "name",
        designation: "designation",
        department: "department",
        title: "title",
        category: "category",
        nationalInternational: "nationalInternational",
        event: "event",
        outcome: "outcome",
        remarks: "remarks",
    },
    // KPI15
    {
        visitorName: "visitorName",
        visitDate: "visitDate",
        agenda: "agenda",
        remarks: "remarks",
    },
    // KPI16
    {
        type: "type",
        nationalInternational: "nationalInternational",
        partner: "partner",
        date: "date",
        duration: "duration",
        scope: "scope",
        financial: "financial",
        remarks: "remarks",
    },
    // KPI17
    {
        awardTitle: "awardTitle",
        awardingBody: "awardingBody",
        nationalInternational: "nationalInternational",
        winnerName: "winnerName",
        designation: "designation",
        department: "department",
        remarks: "remarks",
    },
];

module.exports = {
    innovationKpi1Headers,
    innovationKpi2Headers,
    innovationKpi3Headers,
    innovationKpi4Headers,
    innovationKpi5Headers,
    innovationKpi6Headers,
    innovationKpi9Headers,
    innovationKpi10Headers,
    innovationKpi13Headers,
    innovationKpi14Headers,
    innovationKpi15Headers,
    innovationKpi16Headers,
    innovationKpi17Headers,
    innovationFieldMaps,
};