
// ─── SUSTAINABILITY KPI HEADERS ─────────────────────────────────────────

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

// ─── SUSTAINABILITY FIELD MAPS ──────────────────────────────────────────

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

module.exports = {
    sustainabilityKpi1Headers,
    sustainabilityKpi2Headers,
    sustainabilityKpi3Headers,
    sustainabilityKpi4Headers,
    sustainabilityKpi5Headers,
    sustainabilityKpi6Headers,
    sustainabilityKpi7Headers,
    sustainabilityFieldMaps,
};