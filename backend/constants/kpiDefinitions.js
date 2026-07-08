// ─── KPI DEFINITIONS ──────────────────────────────────────────────────────
// All headers and fieldMaps are copied exactly from the original code.

const RESEARCH_MODULE = "ResearchExcellence";
const INNOVATION_MODULE = "InnovationCommercialization";
const SUSTAINABILITY_MODULE = "SustainabilityCapacityBuilding";

// ----- RESEARCH HEADERS -----
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

// ----- RESEARCH FIELD MAPS -----
const researchFieldMaps = [
    // KPI1
    {
        grantName: "grantName",
        submissionDate: "submissionDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        fundingRequested: "fundingRequested",
        collaborators: "collaborators",
        coFunding: "coFunding",
        status: "status",
        remarks: "remarks",
    },
    // KPI2
    {
        grantName: "grantName",
        approvalDate: "approvalDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        collaborators: "collaborators",
        coFunding: "coFunding",
        oricOverhead: "oricOverhead",
        dateOfApproval: "dateOfApproval",
        status: "status",
        remarks: "remarks",
    },
    // KPI3
    {
        grantName: "grantName",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        funding: "funding",
        collaborators: "collaborators",
        coFunding: "coFunding",
        status: "status",
        remarks: "remarks",
    },
    // KPI4
    {
        grantName: "grantName",
        completionDate: "completionDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        status: "status",
        fundingUtilized: "fundingUtilized",
        fundingReleased: "fundingReleased",
        deliverables: "deliverables",
        outcomes: "outcomes",
    },
    // KPI5
    {
        grantName: "grantName",
        submissionDate: "submissionDate",
        nationalInternational: "nationalInternational",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        fundingRequested: "fundingRequested",
        collaborators: "collaborators",
        coFunding: "coFunding",
        status: "status",
    },
    // KPI6
    {
        grantName: "grantName",
        approvalDate: "approvalDate",
        nationalInternational: "nationalInternational",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        collaborators: "collaborators",
        coFunding: "coFunding",
        dateOfApproval: "dateOfApproval",
    },
    // KPI7
    {
        grantName: "grantName",
        completionDate: "completionDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        status: "status",
        fundingUtilized: "fundingUtilized",
        fundingReleased: "fundingReleased",
        deliverables: "deliverables",
        outcomes: "outcomes",
    },
    // KPI8
    {
        grantName: "grantName",
        approvalDate: "approvalDate",
        nationalInternational: "nationalInternational",
        piName: "piName",
        coPiName: "coPiName",
        thematic: "thematic",
        title: "title",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        coFunding: "coFunding",
        status: "status",
    },
    // KPI9
    {
        grantName: "grantName",
        executionDate: "executionDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        fundingApproved: "fundingApproved",
        startDate: "startDate",
        endDate: "endDate",
        oricOverhead: "oricOverhead",
        deliverables: "deliverables",
        outcomes: "outcomes",
        approvalDate: "approvalDate",
    },
    // KPI10
    {
        grantName: "grantName",
        reviewDate: "reviewDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        thematic: "thematic",
        title: "title",
        fundingRequested: "fundingRequested",
        startDate: "startDate",
        endDate: "endDate",
        approvalDate: "approvalDate",
        deliverables: "deliverables",
        outcomes: "outcomes",
        irbDecision: "irbDecision",
    },
    // KPI11
    {
        governmentBody: "governmentBody",
        presentationDate: "presentationDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        areaAdvocated: "areaAdvocated",
        brief: "brief",
        coalitionPartners: "coalitionPartners",
        issueVerification: "issueVerification",
        backingResearch: "backingResearch",
        advocacyTools: "advocacyTools",
    },
    // KPI12
    {
        linkageType: "linkageType",
        mouDate: "mouDate",
        nationalInternational: "nationalInternational",
        hostInstitution: "hostInstitution",
        collaboratingAgency: "collaboratingAgency",
        fieldOfStudy: "fieldOfStudy",
        scope: "scope",
        salientFeatures: "salientFeatures",
    },
    // KPI13
    {
        thematicTitle: "thematicTitle",
        contractDate: "contractDate",
        piName: "piName",
        coPiName: "coPiName",
        sponsoringAgency: "sponsoringAgency",
        nationalInternational: "nationalInternational",
        industryCounterpart: "industryCounterpart",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        deliverables: "deliverables",
        contractDateSigned: "contractDateSigned",
    },
    // KPI14
    {
        thematicTitle: "thematicTitle",
        contractDate: "contractDate",
        piName: "piName",
        coPiName: "coPiName",
        sponsoringAgency: "sponsoringAgency",
        nationalInternational: "nationalInternational",
        industryCounterpart: "industryCounterpart",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        deliverables: "deliverables",
        contractDateSigned: "contractDateSigned",
    },
    // KPI15
    {
        thematicTitle: "thematicTitle",
        contractDate: "contractDate",
        piName: "piName",
        coPiName: "coPiName",
        sponsoringAgency: "sponsoringAgency",
        nationalInternational: "nationalInternational",
        industryCounterpart: "industryCounterpart",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        deliverables: "deliverables",
        contractDateSigned: "contractDateSigned",
    },
    // KPI16
    {
        eventTitle: "eventTitle",
        eventDate: "eventDate",
        communityComponent: "communityComponent",
        outcome: "outcome",
        collaboration: "collaboration",
        csos: "csos",
        sponsor: "sponsor",
        arrangedParticipated: "arrangedParticipated",
        dissemination: "dissemination",
        remarks: "remarks",
    },
    // KPI17
    {
        projectTitle: "projectTitle",
        executionDate: "executionDate",
        piName: "piName",
        designation: "designation",
        department: "department",
        companyDetails: "companyDetails",
        contractValue: "contractValue",
        startDate: "startDate",
        endDate: "endDate",
        consultancyType: "consultancyType",
        deliverables: "deliverables",
        oricPercentage: "oricPercentage",
        remarks: "remarks",
    },
    // KPI18
    {
        liaisonDeveloped: "liaisonDeveloped",
        executionDate: "executionDate",
    },
];

// ----- INNOVATION HEADERS -----
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

// ----- INNOVATION FIELD MAPS -----
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
    // KPI7
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
    // KPI8
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
    // KPI11
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
    // KPI12
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

// ----- SUSTAINABILITY HEADERS -----
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

// ----- SUSTAINABILITY FIELD MAPS -----
const sustainabilityFieldMaps = [
    // KPI1
    {
        planTitle: "planTitle",
        approvalDate: "approvalDate",
        approvedBy: "approvedBy",
        submittedToHEC: "submittedToHEC",
        remarks: "remarks",
    },
    // KPI2
    {
        grantName: "grantName",
        nationalInternational: "nationalInternational",
        title: "title",
        piName: "piName",
        startDate: "startDate",
        endDate: "endDate",
        fundingApproved: "fundingApproved",
        fundingReleased: "fundingReleased",
        oricOverheadApproved: "oricOverheadApproved",
        oricOverheadReleased: "oricOverheadReleased",
        remarks: "remarks",
    },
    // KPI3
    {
        name: "name",
        title: "title",
        nationalInternational: "nationalInternational",
        agreementDate: "agreementDate",
        licensee: "licensee",
        royaltyShare: "royaltyShare",
        totalAmount: "totalAmount",
        oricApprovedShare: "oricApprovedShare",
        oricReceivedShare: "oricReceivedShare",
        remarks: "remarks",
    },
    // KPI4
    {
        title: "title",
        eventDate: "eventDate",
        participants: "participants",
        focusArea: "focusArea",
        audienceType: "audienceType",
        remarks: "remarks",
    },
    // KPI5
    {
        title: "title",
        eventDate: "eventDate",
        participants: "participants",
        focusArea: "focusArea",
        organizer: "organizer",
        audienceType: "audienceType",
        remarks: "remarks",
    },
    // KPI6
    {
        eventType: "eventType",
        eventDate: "eventDate",
        participants: "participants",
        focusArea: "focusArea",
        audienceType: "audienceType",
        remarks: "remarks",
    },
    // KPI7
    {
        title: "title",
        eventDate: "eventDate",
        participants: "participants",
        focusArea: "focusArea",
        personnelName: "personnelName",
        remarks: "remarks",
    },
];

// ─── BUILD DEFINITIONS OBJECT ──────────────────────────────────────────────
const kpiDefinitions = {
    ResearchExcellence: {
        KPI1: {
            title: "Number of Research Proposals Submitted for Funding from HEC (Proposals Submitted to PhD Faculty Ratio)",
            headers: researchKpi1Headers,
            fieldMap: researchFieldMaps[0]
        },
        KPI2: {
            title: "Research Proposals Approved for Funding by HEC (Proposals Acceptance Ratio)",
            headers: researchKpi2Headers,
            fieldMap: researchFieldMaps[1]
        },
        KPI3: {
            title: "Number of Research Projects (won from HEC) which were due to be Completed (in this year)",
            headers: researchKpi3Headers,
            fieldMap: researchFieldMaps[2]
        },
        KPI4: {
            title: "Number of Research Projects (won from HEC) which were Completed (in this year)",
            headers: researchKpi4Headers,
            fieldMap: researchFieldMaps[3]
        },
        KPI5: {
            title: "Number of Research Proposals Submitted for Funding (from non HEC source - National or International) (Proposals Submitted to PhD Faculty Ratio)",
            headers: researchKpi5Headers,
            fieldMap: researchFieldMaps[4]
        },
        KPI6: {
            title: "Research Proposals Approved for Funding (from non HEC source - National or International) - (Proposals Acceptance Ratio)",
            headers: researchKpi6Headers,
            fieldMap: researchFieldMaps[5]
        },
        KPI7: {
            title: "Number of Research Projects Completed (won through non-HEC source - National or International) (which were due to be completed)",
            headers: researchKpi7Headers,
            fieldMap: researchFieldMaps[6]
        },
        KPI8: {
            title: "Joint Research Projects Approved for Funding (National / International Funding Agencies) - (Proposals Acceptance Ratio)",
            headers: researchKpi8Headers,
            fieldMap: researchFieldMaps[7]
        },
        KPI9: {
            title: "Volume of R&D Funding Secured: National (HEC, Ignite, PSF, MOST, Joint Research Projects & others from federal or provincial government) / International",
            headers: researchKpi9Headers,
            fieldMap: researchFieldMaps[8]
        },
        KPI10: {
            title: "Number of Research Proposals / Joint Research Proposals Reviewed by IRB, before Submission to Funding Bodies",
            headers: researchKpi10Headers,
            fieldMap: researchFieldMaps[9]
        },
        KPI11: {
            title: "Number of Policy Advocacy or Case Studies Presented to Government Departments",
            headers: researchKpi11Headers,
            fieldMap: researchFieldMaps[10]
        },
        KPI12: {
            title: "Number of Research Links Established with other HEIs / Corporate Sector / Industry / Community",
            headers: researchKpi12Headers,
            fieldMap: researchFieldMaps[11]
        },
        KPI13: {
            title: "Number of Contract Research Awarded by Industry or Government Organizations (National)",
            headers: researchKpi13Headers,
            fieldMap: researchFieldMaps[12]
        },
        KPI14: {
            title: "Number of Contract Research Awarded by Industry or Government Organizations (International)",
            headers: researchKpi14Headers,
            fieldMap: researchFieldMaps[13]
        },
        KPI15: {
            title: "Volume of Contract Research Awarded by Industry or Government Organization (National or International)",
            headers: researchKpi15Headers,
            fieldMap: researchFieldMaps[14]
        },
        KPI16: {
            title: "Number of Civic Engagement Events / Initiatives on Issues of Public Concern",
            headers: researchKpi16Headers,
            fieldMap: researchFieldMaps[15]
        },
        KPI17: {
            title: "Consultancy Contracts Executed with Industry, Commerce or Government etc.",
            headers: researchKpi17Headers,
            fieldMap: researchFieldMaps[16]
        },
        KPI18: {
            title: "Liaison Developed with University's Advance Studies & Research Board (AS&RB)",
            headers: researchKpi18Headers,
            fieldMap: researchFieldMaps[17]
        },
    },
    InnovationCommercialization: {
        KPI1: {
            title: "Research Policy of the HEI",
            headers: innovationKpi1Headers,
            fieldMap: innovationFieldMaps[0]
        },
        KPI2: {
            title: "Intellectual Property Rights Policy of the HEI",
            headers: innovationKpi2Headers,
            fieldMap: innovationFieldMaps[1]
        },
        KPI3: {
            title: "Research Ethics / Technology Transfer / Conflict of Interest Policy",
            headers: innovationKpi3Headers,
            fieldMap: innovationFieldMaps[2]
        },
        KPI4: {
            title: "Number of IP Disclosures Made (National / International)",
            headers: innovationKpi4Headers,
            fieldMap: innovationFieldMaps[3]
        },
        KPI5: {
            title: "Patents / Trademarks FILED (National)",
            headers: innovationKpi5Headers,
            fieldMap: innovationFieldMaps[4]
        },
        KPI6: {
            title: "Patents / Trademarks GRANTED (National)",
            headers: innovationKpi6Headers,
            fieldMap: innovationFieldMaps[5]
        },
        KPI7: {
            title: "Patents / Trademarks FILED (International)",
            headers: innovationKpi7Headers,
            fieldMap: innovationFieldMaps[6]
        },
        KPI8: {
            title: "Patents / Trademarks GRANTED (International)",
            headers: innovationKpi8Headers,
            fieldMap: innovationFieldMaps[7]
        },
        KPI9: {
            title: "IP Licensing Negotiations Initiated (National)",
            headers: innovationKpi9Headers,
            fieldMap: innovationFieldMaps[8]
        },
        KPI10: {
            title: "Non-Exclusive / Exclusive Licenses Signed (National)",
            headers: innovationKpi10Headers,
            fieldMap: innovationFieldMaps[9]
        },
        KPI11: {
            title: "IP Licensing Negotiations Initiated (International)",
            headers: innovationKpi11Headers,
            fieldMap: innovationFieldMaps[10]
        },
        KPI12: {
            title: "Non-Exclusive / Exclusive Licenses Signed (International)",
            headers: innovationKpi12Headers,
            fieldMap: innovationFieldMaps[11]
        },
        KPI13: {
            title: "Research products / prototypes gone into prefeasibility / testing",
            headers: innovationKpi13Headers,
            fieldMap: innovationFieldMaps[12]
        },
        KPI14: {
            title: "Science / Arts Products or Creative Activities Displayed",
            headers: innovationKpi14Headers,
            fieldMap: innovationFieldMaps[13]
        },
        KPI15: {
            title: "Visits by Industry / Community Representatives",
            headers: innovationKpi15Headers,
            fieldMap: innovationFieldMaps[14]
        },
        KPI16: {
            title: "Agreements Signed for Collaboration",
            headers: innovationKpi16Headers,
            fieldMap: innovationFieldMaps[15]
        },
        KPI17: {
            title: "National / International Honors or Awards Won",
            headers: innovationKpi17Headers,
            fieldMap: innovationFieldMaps[16]
        },
    },
    SustainabilityCapacityBuilding: {
        KPI1: {
            title: "Five-Year Strategic Plan",
            headers: sustainabilityKpi1Headers,
            fieldMap: sustainabilityFieldMaps[0]
        },
        KPI2: {
            title: "Annual Research Revenue Generated",
            headers: sustainabilityKpi2Headers,
            fieldMap: sustainabilityFieldMaps[1]
        },
        KPI3: {
            title: "Yearly Revenue from Licensing / Royalties / Policy Advocacy",
            headers: sustainabilityKpi3Headers,
            fieldMap: sustainabilityFieldMaps[2]
        },
        KPI4: {
            title: "Trainings / Workshops / Seminars Arranged by ORIC",
            headers: sustainabilityKpi4Headers,
            fieldMap: sustainabilityFieldMaps[3]
        },
        KPI5: {
            title: "Trainings / Workshops / Seminars by other HEIs / Entities",
            headers: sustainabilityKpi5Headers,
            fieldMap: sustainabilityFieldMaps[4]
        },
        KPI6: {
            title: "Exhibitions / Showcasing Events / Industry Linkages Fair Arranged by ORIC",
            headers: sustainabilityKpi6Headers,
            fieldMap: sustainabilityFieldMaps[5]
        },
        KPI7: {
            title: "Trainings / Workshops for ORIC Personnel",
            headers: sustainabilityKpi7Headers,
            fieldMap: sustainabilityFieldMaps[6]
        },
    }
};

module.exports = kpiDefinitions;