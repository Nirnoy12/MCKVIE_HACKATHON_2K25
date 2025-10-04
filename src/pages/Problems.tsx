import { useState } from "react";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Code, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type ProblemCategory = {
  id: number;
  title: string;
  difficulty: string;
  duration: string;
  teamSize: string;
  description: string;
  details: string;
  techStack: string[];
  problemStatement?: string;
  requirements?: string | string[];
  constraints?: string[];
  useCases?: string[];
  evaluation?: string[];
};

const Problems = () => {
  const [openProblem, setOpenProblem] = useState<number | null>(null);

  const problemCategories: ProblemCategory[] = [
    {
      id: 1,
      title: "PS A — Document Formatter & Exporter WebApp",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Organizations and individuals often need to prepare documents in a standardized format—be it for reports, resumes, letters, or project documentation. Manually formatting documents is time-consuming, error-prone, and inconsistent.

Your task is to build a web application where a user can input or upload document content (plain text or structured data) and format it according to a selected template or style. The formatted document should then be exportable and downloadable in DOC and PDF formats.`,
      requirements: `Read Carefully

1. User Input Options
    o Users can paste plain text directly, or
    o Upload a basic text/markdown file.

2. Template / Formatting Selection
    o Provide at least 3 pre-defined formatting templates (e.g., Resume, Business
       Letter, Project Report).
    o Templates should define font styles, text alignment, headers/footers, and
       section structures.

3. Preview Mode
    o Display a real-time preview of the formatted document before export.

4. Export Options
    o Allow the user to download the document in both DOC and PDF formats.
    o Maintain consistent formatting across formats.

Bonus Features (Optional for Extra Points)
● Allow users to define their own custom formatting rules.
● Save previously used documents/templates for reuse.
● Support collaborative editing (multiple users editing same document).`,
      constraints: [
        "The application must be accessible via a web browser",
        "The export functionality must generate properly formatted, downloadable DOC and PDF files without requiring external paid services",
        "Good UX/UI is encouraged but not the primary grading factor—focus on functionality and correctness",
      ],
      useCases: [
        "A student pastes their project content, selects 'Report Format,' and downloads as PDF",
        "A job seeker inputs resume details and exports in a clean, professional DOC template",
        "A business writes a formal loan request letter and downloads it as a standardized PDF",
      ],
      evaluation: [
        "Functionality: Meets requirements; DOC and PDF exports are correct",
        "Code Quality: Clean, modular, and maintainable",
        "Scalability: Easy to add new templates in the future",
        "User Experience: Intuitive and smooth workflow",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 2,
      title: "PS B — Vibe Coding Problem: Scholarship Finder & Manager WebApp",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Finding and applying for scholarships is often overwhelming for students due to scattered information, tedious manual searches, and lack of a centralized management system.
      
Your task is to build a web application where students can:
    ● Search for available scholarships based on their profile and criteria
    ● Apply to relevant scholarships
    ● Track & manage their submitted applications in one place`,
      requirements: `Read Carefully
      
1. Student Registration & Profile
    o Students can sign up/login.
    o Profile should capture details like academic information, course, GPA/grades,
       financial background, and interests.

2. Scholarship Search
    o Implement a searchable and filterable list of scholarships.
    o Filters can include eligibility criteria (country, degree level, GPA requirement,
       category, deadline).

3. Display key details (name, provider, amount, deadline, requirements).
    o Apply for Scholarships
    o Students can view full scholarship details.
    o Provide an “Apply” button (submission flow can be simplified, e.g., uploading
       documents or marking status as “Applied”).

4. Application Management Dashboard
    o Show all scholarships the student has applied for.
    o Include status tracking (e.g., Applied, Under Review, Accepted, Rejected).

5. Admin/Database for Scholarships
    o A backend or admin interface to add/edit scholarships.
    o Each scholarship entry should include eligibility criteria, application
       link/requirements, deadlines, etc.

Bonus Features (Optional for Extra Points)
● Recommendation Engine: Suggest scholarships to students based on profile match.
● Save/Bookmark scholarships for later.
● Notification or reminder system for approaching deadlines.
● Export applied scholarships as a PDF/DOC report.`,
      constraints: [
        "Must be accessible via a web browser",
        "Scholarship database may be pre-seeded with sample data (no need for real external APIs unless desired)",
        "UI should be simple, clean, and student-friendly",
      ],
      useCases: [
        "A student in 2nd-year engineering searches for scholarships available for ‘STEM undergraduates with GPA > 3.0’ and finds a list",
        "The student applies to two scholarships and tracks their status on the dashboard",
        "The system reminds the student that one deadline is expiring tomorrow",
      ],
      evaluation: [
        "Functionality: Smooth search, apply, and management flows",
        "Scalability: Easy to add new scholarships, criteria/filters, and user profiles",
        "Code Quality: Clean, modular, and readable implementation",
        "User Experience: Intuitive navigation and simple design",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 3,
      title: "PS C — Vibe Coding Problem: Grievance Redressal Portal for Education Institute",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `In educational institutes, students and staff often face issues related to academics, facilities, administration, or policies. Handling grievances manually through email or paper forms leads to delays, lack of transparency, and difficulty in tracking resolution status.

Your task is to build a web application that acts as a centralized grievance portal for an education institute, allowing students and staff to submit grievances online, track their progress, and receive timely updates until the issue is resolved.`,
      requirements: `Read Carefully

1. User Registration & Roles
    ● Users (Students/Staff): Can submit and track grievances.
    ● Admins (Institute Authorities): Can view, manage, and resolve grievances.

2. Submit Grievance
    ● Users can log in and submit a grievance with:
        o Category (Academic / Hostel / Facilities / Administration / Other)
        o Title & Description of the grievance
        o Optional document/image upload (proof/screenshots)

3. Grievance Tracking
    ● Each grievance should have a unique ID.
    ● Display status: Submitted → In Review → In Progress → Resolved / Rejected.
    ● Users can track the grievance status in their dashboard.

4. Admin Workflow
    ● Admin can:
        o View all submitted grievances.
        o Assign grievance to concerned committee/department.
        o Update status and add resolution notes.

5. Notification System
    ● User should be notified on important updates (status change, resolution remarks).
    ● Notifications can be displayed within the portal (bonus: email alerts).

Bonus Features (Optional for Extra Points)
● Anonymous grievance submission option.
● Feedback/rating after grievance resolution.
● Analytics dashboard for institute: number of grievances by category, average resolution time, etc.
● Allow multi-level grievance review (department → higher authority).`,
      constraints: [
        "The application must work on a web browser",
        "Data must be stored in a persistent database (SQL/NoSQL)",
        "Focus on functionality, not UI, but the experience should be intuitive and student-friendly",
      ],
      useCases: [
        "A student reports an ‘Internet not working in hostel’ complaint, uploads a screenshot, and gets updates until it’s marked as resolved",
        "A faculty member raises a grievance about classroom projectors malfunctioning—the admin assigns it to the facilities team, who resolve it within 2 days",
        "Analytics show that most complaints are about hostel food, helping the institute take corrective action",
      ],
      evaluation: [
        "Functionality: Ability to submit, manage, and track grievances end-to-end",
        "Code Quality & Maintainability: Clean, modular implementation",
        "Scalability: System should support many users and grievances",
        "User Experience: Intuitive dashboard for both students and admins",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 4,
      title: "PS D — EduScore: Smart Faculty Appraisal System",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Manual faculty appraisal processes are often time-consuming, subjective, and nontransparent, which hampers accurate performance evaluation and the ability to provide actionable feedback. Institutions struggle to consolidate data from teaching, research, and administrative activities into a meaningful performance metric.

Your task is to build a web-based system that allows educational institutions to digitally manage faculty performance appraisals based on customizable KPIs (Key Performance Indicators), automated scoring, and insightful analytics. The system should support dynamic scoring logic, weightage-based evaluation, and exportable reports for use in decision-making processes such as promotions, awards, and accreditation.`,
      requirements: `Read Carefully

1. Faculty Performance Tracking
    o Capture performance data across key domains:
        ▪ Teaching effectiveness
        ▪ Research output and publications
        ▪ Student feedback
        ▪ Administrative responsibilities
    o Manual input and import options for activity logs and achievements

2. Customizable KPI Configuration
    o Admins can define KPIs and assign weightages based on institutional policies
    o Support multiple evaluation criteria per KPI

3. Automated Scoring & Evaluation
    o System calculates performance scores based on weightages and data inputs
    o Generate a composite performance index per faculty

4. Analytics Dashboard
    o Visualize performance trends over time
    o Compare faculty within departments or against institutional benchmarks
    o Highlight areas of strength and improvement

5. Report Generation & Export Options
    o Generate reports in PDF and DOC formats
    o Ready-to-submit formats for accreditation bodies and HR purposes
    o Ensure visual consistency across export types

6. Bonus Features (Optional for Extra Points)
    o Role-based access (admin, faculty, reviewer)
    o Self-assessment module for faculty
    o Notifications and reminders for pending inputs
    o Historical data archiving for year-on-year tracking`,
      constraints: [
        "Must be accessible via a web browser",
        "Export features must work without relying on external paid services",
        "User privacy and data security must be considered",
        "Should scale for small colleges to large universities",
      ],
      useCases: [
        "A faculty member inputs yearly contributions and downloads a performance report for submission",
        "Admin reviews auto-generated department reports for promotion decisions",
        "Accreditation team receives department-wide performance data formatted to their template",
      ],
      evaluation: [
        "Functionality: Accurate KPI tracking, scoring, and export capabilities",
        "Code Quality: Clean, maintainable, and modular codebase",
        "Scalability: Easy to modify KPI structure or add departments",
        "User Experience: Simple and intuitive UI for faculty and admins",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 5,
      title: "PS E — Event Ease: Smart College Event & Report Manager",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Colleges often face inefficiencies, coordination issues, and data fragmentation due to manual event management and report generation processes. The lack of automation and real-time insights hampers smooth execution and evaluation of institutional events.

Your task is to build a comprehensive web-based platform for end-to-end event management in colleges, enabling online registrations, real-time tracking, automated report generation, and participant engagement through technology-driven tools like QR codes and feedback systems. The system should support role-based access, analytics, and seamless export options, ensuring efficient operations and data-driven decision-making.`,
      requirements: `Read Carefully

1. Event Creation & Management
    o Organizers can create, edit, and manage events with details like title, date, venue, description, etc.
    o Support for recurring events and multi-day conferences
    o Role-based access for event coordinators, faculty, and student volunteers

2. Online Registration & Scheduling
    o Participants can register online
    o Event schedules with session breakdowns and speaker details
    o Email/SMS notifications and reminders

3. Budget & Resource Tracking
    o Input and track event budgets, expenses, and resources used
    o Real-time budget dashboards with visual breakdowns

4. QR-Based Attendance & Certificate Generation
    o Participants receive QR codes for check-in
    o Automated attendance tracking
    o Certificate generation with event-specific designs and participant details

5. Feedback & Engagement Tools
    o Post-event feedback forms
    o Analytics on participant satisfaction and engagement metrics

6. Automated Report Generation
    o Generate PDF and DOC event reports with summaries, stats, and visuals
    o Auto-compile data from registration, feedback, and attendance

7. Bonus Features (Optional for Extra Points)
    o Integration with college ERP systems
    o Cloud-based storage of past events and reports
    o Mobile-responsive interface or dedicated mobile app
    o Calendar view of upcoming events`,
      constraints: [
        "Must run in modern web browsers",
        "PDF and DOC exports must be consistent and offline-capable (no paid external APIs)",
        "Data privacy for participants must be ensured",
        "Should support scaling for institutions of various sizes",
      ],
      useCases: [
        "A faculty organizer sets up a tech fest, tracks attendance using QR, collects feedback, and generates a post-event report",
        "Students register online for a seminar, check-in via QR code, and receive digital certificates",
        "Admin reviews budget utilization and engagement metrics for all events in a semester",
      ],
      evaluation: [
        "Functionality: Complete event lifecycle support from registration to reporting",
        "Code Quality: Modular, clean code with scalable architecture",
        "Scalability: Easy to add new event types or integrate with college systems",
        "User Experience: Smooth workflows for all roles (organizer, participant, admin)",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 6,
      title: "PS F — Hire Smart: Faculty Recruitment Manager",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Faculty recruitment in many institutions remains manual, slow, and unstructured, leading to inefficient candidate screening, poor coordination during interviews, and limited transparency in decision-making. Involving subject matter experts and maintaining fairness in evaluation is also a major challenge.

Your task is to build a web-based recruitment management system that digitizes and streamlines the entire faculty hiring lifecycle—from job posting to final selection. The system must support online applications, automated screening, AI-assisted resume parsing, expert panel evaluations, and structured candidate comparisons, while enabling transparent and efficient recruitment through automated workflows and reporting.`,
      requirements: `Read Carefully

1. Job Posting & Application Management
    o Admins can create job postings with custom eligibility criteria
    o Candidates can apply online and upload relevant documents
    o Automated eligibility verification based on input data

2. AI-based Resume Screening
    o Extract key data from resumes (qualification, experience, skills)
    o Score and rank applicants based on customizable filters and criteria

3. Expert Panel Management
    o Assign internal/external experts for evaluation
    o Provide secure access to candidate profiles and scoring forms

4. Smart Interview Scheduling
    o Schedule interviews (in-person or virtual) based on availability
    o Automated email/SMS notifications to candidates and panel members
    o Calendar sync and rescheduling options

5. Evaluation & Feedback Collection
    o Structured scoring sheets for panelists
    o Centralized feedback collection from all evaluators
    o Candidate comparison dashboard for decision-making

6. Report Generation & Export Options
    o Generate PDF and DOC reports for selection committee use
    o Include evaluation metrics, panel feedback, and candidate rankings

7. Bonus Features (Optional for Extra Points)
    o Video interview integration (Zoom/Google Meet APIs)
    o Role-based access control (Admin, Panel, Candidate)
    o Shortlisting history and selection justification archive
    o Integration with HR systems or ERP`,
      constraints: [
        "Should be accessible via modern web browsers",
        "No reliance on paid third-party APIs for resume parsing or export",
        "Ensure data privacy and security for candidate documents",
        "Must handle large volumes of applicants efficiently",
      ],
      useCases: [
        "A department posts an Assistant Professor vacancy and receives 200+ applications, auto-screened for PhD and publication criteria",
        "A panel of subject experts logs in to evaluate shortlisted candidates, score them, and provide written feedback",
        "Admin generates a final hiring report including all evaluation summaries and rankings for approval",
      ],
      evaluation: [
        "Functionality: Covers complete recruitment workflow, from job posting to final report",
        "Code Quality: Modular and secure codebase with clear structure",
        "Scalability: Easily extendable for other staff categories or institutions",
        "User Experience: Simple, clear interfaces for admins, candidates, and evaluators",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 7,
      title: "PS G — Smart Academic Assessor",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Evaluation of assignments, class tests, and semester exam copies is often time-consuming, inconsistent, and prone to human errors. Teachers spend hours manually grading, while students face delays in receiving feedback. There is a need for an intelligent system that can automatically evaluate submissions, provide fair and consistent scoring, and generate insightful reports for both students and faculty.

Your task is to build a web-based evaluation system that leverages automation and intelligence to assess assignments, class tests, and semester exam copies efficiently. The platform should provide real-time evaluation, instant feedback, and maintain records of student performance.`,
      requirements: `Read Carefully

User Roles
• Students: Can upload assignments, submit class tests, or view scanned copies of exam papers.
• Teachers/Evaluators: Can create tests, upload question papers, and verify/override auto-grading if required.
• Admin: Manages user accounts, exam schedules, and system configurations.

Submission & Evaluation
• Students can upload documents (PDF, DOC, images of handwritten answers).
• The system should support objective (MCQs, short answers) auto-grading and subjective/descriptive answers using AI-based similarity/matching techniques.
• Provide instant scoring for objective questions and preliminary scoring suggestions for subjective questions.

Feedback & Reports
• Generate detailed feedback highlighting correct/incorrect answers.
• Provide analytics like average score, highest/lowest marks, and topic-wise strengths/weaknesses.
• Store performance history for continuous improvement tracking.

Security & Transparency
• Secure document upload and storage.
• Prevent plagiarism with built-in plagiarism detection tools.
• Allow students to view their evaluated copies for transparency.

Bonus Features (Optional for Extra Points)
• AI-based handwriting recognition for scanned handwritten exam scripts.
• Adaptive evaluation that gives hints for wrong answers in practice assignments.
• Predictive performance analysis (forecast student outcomes in final exams).`,
      constraints: [
        "The application must be web-based and scalable for large institutes",
        "Evaluation must support both objective and descriptive question types",
        "Security of student data and exam integrity must be ensured",
        "The system should be extensible to integrate with existing LMS/ERP",
      ],
      useCases: [
        "A student uploads a handwritten assignment; the system scans, recognizes answers, grades them, and provides detailed feedback",
        "A teacher uploads a class test with 20 MCQs; students attempt it online, and the system auto-scores and generates results instantly",
        "Semester exam answer scripts are uploaded, the system auto-evaluates objective parts, and faculty finalizes descriptive grading with AI assistance",
      ],
      evaluation: [
        "Functionality: Accuracy of auto-grading, report generation, and system reliability",
        "Code Quality: Clean, modular, and maintainable implementation",
        "Scalability: Ability to handle large-scale exams across departments",
        "User Experience: Intuitive, transparent, and fair evaluation process for both students and teachers",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 8,
      title: "PS H  — Select Emergency: Serious Patient Selection for Facilities",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Patients are allocated a bed, room, ICU, or ITU on a first-come, first-served basis, ignoring the serious medical condition of a patient. Beds in emergency are not enough if the patients require overnight and continuous care.

Your task is to build a selection algorithm for a web application and/or mobile application where patients can be provided a bed, room, ICU, and ITU based on the seriousness of the medical condition. Medical status in terms of the report, clinical notes from an in-house care person will be considered for making a decision.`,
      requirements: `Read Carefully

• Patient Registration & Profile
    o Demographic Information, Medical History, Investigations and their results will be stored
• Suggestion of more serious patients based on the value of parameters
• Admitted Patient Management Dashboard
    o Details of the patient admitted, release dates, date of admission, and occupancy details are to be stored
• Admin
    o Profile creation, an important detail, the Admin will rectify.
• Care Person
    o Care Persons will enter details of medical conditions and parameters, etc. Clinical notes may be entered and considered

Bonus Features (Optional for Extra Points)
● Recommendation of similar beds in other hospitals or care places
● Immediate alerts on availability of facility
● Export needed recommendations for bed/ room/ ICU/ITU allotment PDF/DOC report.`,
      constraints: [
        "Must be accessible via a web browser and mobile app",
        "UI should be simple, neat",
        "Multiple patients should not be allotted the same facility",
      ],
      useCases: [
        "A patient of a natural calamity or road accident requiring immediate attention and allotment of a bed/ room/ ICU/ITU for continuous care or overnight care",
      ],
      evaluation: [
        "Functionality: The algorithm or process of allotment must be fair; there may be options of shifting from one facility to another",
        "Scalability: Easy to add new facilities",
        "Code Quality: Clean, modular, and readable implementation",
        "User Experience: Intuitive navigation and simple design",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 9,
      title: "PS I — Smart Document Management System (DMS) for Academic Institutions",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement ",
      details: "",
      problemStatement: `Academic institutions generate and manage a vast amount of documents—student records, admissions data, certificates, HR files, financial information, and compliance documents. Currently, most institutions rely on manual, paper-based, or fragmented storage systems, leading to inefficiency, misplacement of critical files, and compliance risks. A robust, digital, and centralized Document Management System (DMS) is required to ensure secure storage, easy retrieval, and workflow automation while maintaining compliance with regulations such as NEP 2020, GDPR, and FERPA.`,
      requirements: `Read Carefully

1. Document Storage & Centralization
• Secure upload of documents (admissions, academic records, HR files, finance, etc.)
• Metadata tagging and categorization for easy classification
• Centralized repository accessible via role-based authentication

2. Intelligent Search & Retrieval
• Advanced search using keywords, tags, or metadata
• Optical Character Recognition (OCR) for scanned documents
• Quick retrieval across departments

3. Security & Compliance
• Role-based access control (Admin, Faculty, Staff, Student)
• End-to-end encryption of sensitive data
• Audit trails for all document activities
• Configurable data retention policies to align with NEP 2020 / GDPR

4. Workflow Automation
• Automated routing for approvals (admissions, leave applications, certificate issuance)
• Notifications and reminders for pending tasks
• Customizable approval workflows

5. Reporting & Analytics
• Document usage statistics (uploads, downloads, retrievals)
• Compliance monitoring dashboards
• Insights into workflow bottlenecks

Bonus Features (Optional for Extra Points)
• AI-based document classification and auto-tagging
• E-signature integration for approvals
• Multi-language document support
• Integration with ERP/LMS systems for seamless data flow`,
      constraints: [
        "Must be accessible via modern web browsers",
        "Must ensure scalability to handle large document volumes",
        "Export and backup features should not rely on paid third-party services",
        "High standards of data privacy and regulatory compliance must be maintained",
      ],
      useCases: [
        "A student applies for transcripts: the request is routed automatically, approved by authorities, and securely shared digitally with the student",
        "The HR department uploads faculty records, accessible only by authorized admin staff with audit trails",
        "Accreditation authorities request compliance documents; the institution retrieves and exports them instantly from the DMS",
      ],
      evaluation: [
        "Functionality: End-to-end document management, secure storage, and automated workflows",
        "Code Quality: Clean, modular, and maintainable codebase",
        "Scalability: Ability to handle thousands of documents across departments",
        "User Experience: Simple, intuitive dashboards for both admins and end users",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 10,
      title: "PS J — Smart Classroom & Timetable Scheduler WebApp",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "",
      problemStatement: `Educational institutions often face challenges in managing classrooms, faculty schedules, and course timetables efficiently. Manual timetable creation is time-consuming, prone to conflicts (teacher, classroom, or subject overlaps), and inflexible when adjustments are needed. The absence of a smart scheduling system leads to wasted resources, student dissatisfaction, and teacher overload.

The challenge is to design a web application that can automatically generate and manage timetables, optimize classroom utilization, and ensure conflict-free scheduling while allowing manual adjustments when required. The system should provide real-time visibility of class schedules, handle rescheduling dynamically, and generate insights for administrators, faculty, and students.`,
      requirements: `Read Carefully

1. User Input Options
• Admin/Faculty Inputs:
    o Number of courses/subjects.
    o Faculty availability and teaching load preferences.
    o Classroom/lab resources (capacity, type: smart-classroom, lab, seminar hall).
    o Institution working hours and break times.
    o Constraints (e.g., max 3 consecutive classes per teacher, avoid evening slots for certain faculties).
• Student Preferences (Optional):
    o Elective choices.
    o Preferred batch timings (if multiple options exist).

2. Smart Timetable Generation
• Automatic Scheduling Algorithm:
    o Allocate courses to time slots based on faculty availability, student batches, and classroom capacity.
    o Detect and prevent conflicts (faculty double-booking, same room allocated twice, overlapping electives).
    o Optimize load distribution (avoid long gaps, balance teaching hours).
• Comparative Insights:
    o Show load distribution across faculty.
    o Classroom utilization rate.
    o Identify underused resources.
• Scenario Adjustments:
    o Support manual override by admins/faculty.
    o Reschedule classes dynamically (e.g., if a faculty is on leave).

3. Dashboard / Real-time Preview
• Admin Dashboard:
    o Weekly/monthly timetable view for all departments.
    o Faculty-wise teaching hours summary.
    o Classroom usage heatmap (highlight peak vs. idle hours).
• Faculty Dashboard:
    o Personalized timetable view.
    o Alerts for schedule changes.
• Student Dashboard:
    o Course/batch-specific timetable view.
    o Elective course allocations.
    o Notifications for rescheduled/cancelled classes.

4. Export Options
• Users (admins, faculty, or students) can export timetables in PDF/DOC format.
• Exported documents include:
    o Weekly timetable tables.
    o Graphs (faculty load distribution, room utilization).
    o Summary insights for the department.

5. Bonus Features (Optional)
• Integration with Smart Classroom Systems: Auto-sync schedules with projector, attendance, and LMS tools.
• Multi-profile Support: Allow multiple institutions/departments to use the platform independently.
• AI-based Suggestions: Suggest optimal slot swaps to reduce student fatigue (e.g., avoid back-to-back theory classes).`,
      constraints: [
        "Web-based application",
        "Export to DOC/PDF must work without paid external services",
        "Scheduling must be explainable (why a class was placed in a specific slot)",
        "Focus on correctness, flexibility, and conflict-free generation",
      ],
      useCases: [
        "Scenario 1: Department needs to schedule 25 subjects with 15 teachers across 10 classrooms for 200 students. The app generates a conflict-free timetable, balancing teacher load and showing utilization charts",
        "Scenario 2: A faculty takes sudden leave. The system auto-reschedules their classes into available free slots, notifies students, and updates all dashboards",
        "Scenario 3: Students in Computer Science select different electives. The system allocates classrooms without overlaps and provides separate elective timetables",
      ],
      evaluation: [
        "Functionality: Generates accurate, conflict-free timetables and adapts to changes",
        "Code Quality: Clean, modular, scalable to handle multiple departments",
        "Scalability: Easy to add new subjects, faculties, or classrooms",
        "User Experience: Intuitive dashboards with real-time updates and exports",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-neon-green text-spooky-dark";
      case "Intermediate": return "bg-halloween-orange text-spooky-light";
      case "Advanced": return "bg-destructive text-spooky-light";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-neon mb-6 animate-glow">
            Problem Statements
          </h1>
          <p className="text-xl text-spooky-muted max-w-3xl mx-auto leading-relaxed">
            Choose your Halloween challenge! Each problem statement offers unique opportunities
            to showcase your coding skills while embracing the spooky spirit of the season.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 text-spooky-light">
              <Clock className="w-5 h-5 text-halloween-orange animate-flicker" />
              <span>Registration Deadline: Oct 9th</span>
            </div>
            <div className="flex items-center space-x-2 text-spooky-light">
              <Trophy className="w-5 h-5 text-neon-green animate-glow" />
              <span>Total Prizes: ₹20,000+</span>
            </div>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {problemCategories.map((problem, index) => (
            <Card
              key={problem.id}
              className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:shadow-lg hover:glow-orange p-8 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-heading text-gradient-ghoul ">
                      {problem.title}
                    </h3>

                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <Code className="w-8 h-8 text-halloween-orange animate-bob" />
                </div>

                {/* Details Button */}
                <div>
                  <Button
                    onClick={() => setOpenProblem(problem.id)}
                    variant="ghost_spooky"
                    className="text-sm font-bold text-gradient-spooky border border-halloween-orange hover:bg-halloween-purple-muted hover:text-spooky-light animate-flicker"
                  >
                    Dive into details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Popup Modal */}
        {openProblem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn p-4">
            <div className="relative w-[95%] max-w-4xl max-h-[90vh]
              bg-[hsl(var(--card))] text-[hsl(var(--foreground))] 
              rounded-2xl shadow-[var(--shadow-card)] 
              border border-[hsl(var(--border))] 
              animate-burst glow-burst flex flex-col">

              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 pb-4 border-b border-[hsl(var(--border))]">
                <h2 className="font-heading text-2xl text-gradient-ghoul animate-glow">
                  {problemCategories.find(p => p.id === openProblem)?.title}
                </h2>
                <button
                  onClick={() => setOpenProblem(null)}
                  className="text-[hsl(var(--halloween-orange))] hover:text-[hsl(var(--neon-orange))] transition-colors p-2 hover:bg-[hsl(var(--muted))] rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed">
                {(() => {
                  const selected = problemCategories.find((p) => p.id === openProblem);
                  if (!selected) return null;
                  return (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Problem Statement</h3>
                        {typeof selected.problemStatement === 'string' ? (
                          <pre className="whitespace-pre-wrap text-spooky-light font-sans text-sm leading-relaxed bg-transparent">
{selected.problemStatement}
                          </pre>
                        ) : (
                          <p className="text-spooky-light">{selected.details || selected.description}</p>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Requirements & Features</h3>
                        {typeof selected.requirements === 'string' ? (
                          <pre className="whitespace-pre-wrap text-spooky-light font-sans text-sm leading-relaxed bg-transparent">
{selected.requirements}
                          </pre>
                        ) : Array.isArray(selected.requirements) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>Add key functional and non-functional requirements here.</li>
                            <li>List expected features, flows, or modules.</li>
                            <li>Note any integration points or libraries to consider.</li>
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Constraints</h3>
                        {Array.isArray(selected.constraints) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.constraints.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>State technical, time, or resource constraints.</li>
                            <li>Define supported browsers/devices or performance targets.</li>
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Example Use Cases</h3>
                        {Array.isArray(selected.useCases) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.useCases.map((u, i) => (
                              <li key={i}>{u}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>Use Case 1: Briefly describe a primary user flow.</li>
                            <li>Use Case 2: Another representative scenario.</li>
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Evaluation Criteria</h3>
                        {Array.isArray(selected.evaluation) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.evaluation.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>Functionality completeness and correctness.</li>
                            <li>UI/UX quality, performance, and accessibility.</li>
                            <li>Code quality, structure, and documentation.</li>
                          </ul>
                        )}
                      </section>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-halloween p-8 rounded-xl shadow-lg glow-orange">
            <h2 className="text-6xl font-spooky text-gradient-ghoul mb-4">
              Ready to Accept the Challenge?
            </h2>
            <p className="text-spooky-light mb-6 text-lg">
              Form your team and register now to secure your spot in this spine-tingling hackathon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="neon" size="xl" className="text-lg">
                  Register Your Team
                </Button>
              </Link>
              <Button
                variant="ghost_spooky"
                size="xl"
                className="bg-spooky-dark border-spooky-dark text-spooky-light hover:bg-spooky-light hover:text-spooky-dark"
                onClick={() => window.open('https://docs.google.com/document/d/1lwzWk2CWIpjDr25E2vpcS4pt4fCh-Mcac_pndgFD29o/edit?usp=sharing', '_blank')}
              >
                Download Detailed Rules
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Problems;
