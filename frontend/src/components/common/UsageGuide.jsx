import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    FiX,
    FiBook,
    FiInfo,
    FiUsers,
    FiUser,
    FiShield,
    FiBarChart2,
    FiFilter,
    FiTable,
    FiDownload,
    FiEdit,
    FiTrash2,
    FiFileText,
    FiPaperclip,
    FiEye,
    FiCheckCircle,
    FiDatabase,
    FiAward,
    FiSettings,
    FiCpu,
    FiClock,
    FiAlertCircle,
    FiHelpCircle,
} from 'react-icons/fi';

export default function UsageGuide({ onClose }) {
    const { user } = useAuth();
    const isAdmin = user?.role === 'admin';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                {/* ─── Header ────────────────────────────────────── */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100/80 px-6 py-5 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white shadow-md">
                            <FiBook className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Usage Guide</h2>
                            <p className="text-sm text-gray-500 font-medium">
                                {isAdmin ? 'Admin Portal – Complete Walkthrough' : 'Department Portal – Submission Guide'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-400 hover:text-gray-600"
                        aria-label="Close"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {isAdmin ? <AdminGuide /> : <DepartmentGuide />}
                    <hr className="border-gray-200/70" />
                    <TeamCredits />
                </div>
            </div>
        </div>
    );
}

// ─── Admin Guide ──────────────────────────────────────────────
function AdminGuide() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <FiShield className="text-blue-600" />
                    Admin Dashboard – Complete Overview
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                    The admin panel gives you full control over all KPI submissions. Monitor, filter, edit, delete, and export data for reporting. Below is a detailed explanation of each feature.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureCard
                    icon={FiBarChart2}
                    title="Dashboard Overview"
                    description="View key metrics: total submissions, breakdown by module (Research, Innovation, Sustainability), and a bar chart showing submissions per department."
                >
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                        <li><strong>Total Submissions:</strong> overall count of all KPIs.</li>
                        <li><strong>Module Counts:</strong> quick view of activity per module.</li>
                        <li><strong>Department Chart:</strong> see which departments are most active.</li>
                    </ul>
                </FeatureCard>

                <FeatureCard
                    icon={FiFilter}
                    title="Advanced Filtering"
                    description="Narrow down submissions using filters: Module, KPI, Department, and Date range (from – to). All filters work together."
                >
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                        <li><strong>Module:</strong> Research, Innovation, or Sustainability.</li>
                        <li><strong>KPI:</strong> specific KPI (e.g., KPI1, KPI2).</li>
                        <li><strong>Department:</strong> view submissions from a particular department.</li>
                        <li><strong>Date Range:</strong> filter by submission date.</li>
                    </ul>
                </FeatureCard>

                <FeatureCard
                    icon={FiTable}
                    title="Submission Management Table"
                    description="Displays all submissions with pagination. Columns: Module, KPI, Department, Submitted By, and Date. Action buttons: View, Edit, Delete."
                >
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-2">
                        <li><strong>View (Eye):</strong> opens full detail page with PDF.</li>
                        <li><strong>Edit (Pencil):</strong> inline modal to modify fields.</li>
                        <li><strong>Delete (Trash):</strong> permanently removes submission and PDF.</li>
                    </ul>
                </FeatureCard>

                <FeatureCard
                    icon={FiDownload}
                    title="CSV Export"
                    description="Download filtered data as CSV. All active filters are applied. Useful for reporting and offline analysis."
                />

                <FeatureCard
                    icon={FiEdit}
                    title="Editing & Deleting – Best Practices"
                    description="Editing corrects errors – it does not change submission date. Deleting is permanent. Use caution, as it also removes the uploaded PDF."
                >
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                        <p className="text-sm text-amber-700 flex items-start gap-2">
                            <FiAlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span><strong>Caution:</strong> Deleting a submission is irreversible. Ensure you have a backup if needed.</span>
                        </p>
                    </div>
                </FeatureCard>

                <FeatureCard
                    icon={FiHelpCircle}
                    title="General Admin Tips"
                    description="Use filters before exporting to get targeted data. Regularly review submissions for quality. Contact department users for recurring issues."
                />
            </div>
        </div>
    );
}

// ─── Department Guide ──────────────────────────────────────────
function DepartmentGuide() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                    <FiUser className="text-blue-600" />
                    Department KPI Submission – Complete Guide
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                    This guide walks you through the KPI submission process – from selecting the right KPI to reviewing your data before final submission. Each step is explained in detail.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StepCard step={1} icon={FiFileText} title="Select a KPI">
                    From the <strong>Research</strong>, <strong>Innovation</strong>, or <strong>Sustainability</strong> page, select a <strong>Module</strong> then the desired <strong>KPI</strong> from the dropdown. Each KPI corresponds to a specific performance indicator.
                </StepCard>

                <StepCard step={2} icon={FiEdit} title="Fill the Form">
                    The form dynamically generates fields based on the KPI. Fields marked with a <strong>red star (*)</strong> are required. <strong>Optional fields</strong> (without the star) can be left blank – they will be stored as <strong>"NIL"</strong>.
                </StepCard>

                <StepCard step={3} icon={FiPaperclip} title="Upload Evidence (PDF)">
                    Attach a supporting document in <strong>PDF format</strong> (max 5MB). The file is stored securely. Choose the file from your computer; the filename will appear next to the button.
                </StepCard>

                <StepCard step={4} icon={FiEye} title="Review &amp; Submit">
                    Click <strong>"Review &amp; Submit"</strong> to preview all entries. The review screen shows all fields and the PDF filename. If correct, click <strong>"Confirm Submit"</strong>; otherwise, click <strong>"Back"</strong> to correct.
                </StepCard>

                <StepCard step={5} icon={FiClock} title="After Submission">
                    Data is saved in the database. You can view it later from <strong>"My Submissions"</strong>. You cannot edit after submission – contact the administrator for changes.
                </StepCard>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600/10 rounded-lg text-blue-700">
                            <FiInfo className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-800 text-sm">Required vs Optional Fields</h4>
                            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1 mt-1">
                                <li><span className="text-red-500 font-bold">*</span> <strong>Required</strong> – must be filled.</li>
                                <li><span className="text-gray-400">(empty)</span> <strong>Optional</strong> – stored as "NIL".</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Reusable FeatureCard ──────────────────────────────────────
function FeatureCard({ icon: Icon, title, description, children }) {
    return (
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-700 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-base">{title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mt-1">{description}</p>
                    {children}
                </div>
            </div>
        </div>
    );
}

// ─── Reusable StepCard ─────────────────────────────────────────
function StepCard({ step, icon: Icon, title, children }) {
    return (
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                    <div className="p-2.5 bg-blue-50 rounded-lg text-blue-700 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="w-0.5 h-8 bg-gray-200 mt-2 hidden sm:block" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-base flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
                            {step}
                        </span>
                        {title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed mt-2">{children}</p>
                </div>
            </div>
        </div>
    );
}

import junaidImage from '../../assets/junaidImage.webp'
import directorImage from '../../assets/director.png'
import azizImage from '../../assets/aziz.png'
import gulImage from '../../assets/gul.png'
import harisImage from '../../assets/haris.png'

// ─── Team Credits ──────────────────────────────────────────────
function TeamCredits() {

    const team = [
        {
            name: 'Dr. Sheeraz Ahmed Memon',
            role: 'Director – ORIC',
            image: directorImage,
            description: `Dr. Sheeraz provided the strategic vision and domain expertise essential for this project. He defined the KPI structure, identified key performance indicators, and guided the team to align the portal with ORIC’s objectives. He reviewed each KPI form to ensure they met real‑world requirements and provided continuous feedback throughout the development lifecycle. His leadership and mentorship were instrumental in bringing this project to fruition.`,
        },
        {
            name: 'Junaid Ahmed Memon',
            role: 'Lead Developer – Full Stack (MERN)',
            image: junaidImage,
            description: `Junaid is the driving force behind this portal. He architected and developed the entire system from scratch, handling both the frontend (React) and backend (Node.js + Express). He implemented secure JWT authentication, role‑based access control, and all 42 dynamic KPI forms. He also built the admin dashboard with real‑time filtering, charts, CSV export, and full CRUD operations. His attention to detail and problem‑solving skills ensured a smooth, intuitive user experience for both department users and administrators.`,
            email: 'junaidahmedyt8@gmail.com',
        },
        {
            name: 'Abdul Aziz Ujjan',
            role: 'Database Designer & Tester',
            image: azizImage,
            description: `Abdul Aziz designed the MongoDB schema from the ground up, ensuring optimal performance and scalability. He created the complex data models for submissions, users, and file references, and implemented indexes to handle large datasets efficiently. He also conducted rigorous testing – both manual and automated – to ensure data integrity, security, and fast query responses. His work guarantees that the portal can handle thousands of submissions without slowing down.`,
            email: 'aziz.mniops@gmail.com',
        },
        {
            name: 'Muhammad Haris Sheikh',
            role: 'Administrator – ORIC',
            image: harisImage,
            description: `Muhammad Haris collaborated with Gul Hasan to gather comprehensive requirements and user stories. He facilitated workshops with department heads to understand their reporting needs, and translated those requirements into actionable tasks for the developers. He also performed extensive user acceptance testing (UAT) to ensure the portal meets ORIC’s quality standards. His commitment to excellence ensured that the final product is robust, reliable, and ready for university‑wide adoption.`,
        },
        {
            name: 'Gul Hasan Memon',
            role: 'Administrator – ORIC',
            image: gulImage,
            description: `Gul Hasan played a pivotal role in shaping the user experience. He identified the common pain points faced by department users and administrators, and worked closely with the development team to turn those challenges into streamlined features. He validated every feature from an end‑user perspective, ensuring the portal is intuitive, accessible, and meets the daily operational needs of ORIC. His hands‑on testing and feedback were invaluable in refining the interface.`,
        },
    ];

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-6">
                <FiUsers className="text-blue-600" />
                Team Credits
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-3xl">
                This portal was built through collaboration, dedication, and a shared vision. The following individuals contributed their expertise to make this project a success. Their combined efforts have created a powerful tool that will help ORIC streamline KPI management and reporting.
            </p>
            <div className="grid grid-cols-1 gap-6">
                {team.map((member, index) => (
                    <div
                        key={index}
                        className="group bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-xl p-6 border border-gray-200/80 hover:border-blue-200 hover:shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-6"
                    >
                        {/* ─── Large Image ─────────────────────────────────── */}
                        <img
                            src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D8ABC&color=fff&size=128`}
                            alt={member.name}
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-400 transition flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                            <p className="text-lg font-semibold text-gray-800 leading-tight">{member.name}</p>
                            <p className="text-sm font-medium text-blue-700 mt-0.5">{member.role}</p>
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{member.description}</p>
                            <p className="text-sm text-blue-700 hover:underline cursor-pointer mt-0.5">{member.email}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200/70 pt-4">
                Developed with <span className="text-red-500">❤</span> for ORIC MUET | &copy; {new Date().getFullYear()}
            </div>
        </div>
    );
}