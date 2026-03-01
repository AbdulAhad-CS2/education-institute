export interface PolicySection {
    title?: string;
    content: string | string[];
    items?: string[];
}

export interface Policy {
    title: string;
    effectiveDate?: string;
    introduction?: string;
    sections: PolicySection[];
    footerInfo?: string;
}

export const POLICIES: Record<string, Policy> = {
    "privacy-policy": {
        title: "Privacy Policy",
        effectiveDate: "03/01/2026",
        introduction: "Ruhani Online Education respects your privacy and is committed to protecting personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our educational services. Our services are primarily intended for students in Grade 6–10.",
        sections: [
            {
                title: "1. Information We Collect",
                content: "We may collect the following types of information:",
                items: [
                    "Student name",
                    "Parent/Guardian name",
                    "Email address",
                    "Phone number",
                    "Billing information",
                    "Country and time zone"
                ]
            },
            {
                title: "2. Payment Information",
                content: "Payments are processed through secure third-party payment gateways. We do not store full credit/debit card details on our servers."
            },
            {
                title: "3. Academic Information",
                content: "We collect performance-related information including:",
                items: ["Grade level", "Subject interests", "Performance-related information"]
            },
            {
                title: "4. Technical Information",
                content: "When you visit our site, we may collect:",
                items: ["IP address", "Device type", "Browser type", "Cookies and usage data"]
            },
            {
                title: "5. Children’s Privacy (Important)",
                content: "Our services are directed toward minors under 18 years of age. We collect personal information of children only with parental or guardian consent. Parents or guardians may review their child’s information, request deletion of their child’s data, and withdraw consent at any time. We aim to comply with applicable child data protection laws, including relevant U.S. child privacy regulations."
            },
            {
                title: "6. How We Use Your Information",
                content: "We use collected information to provide online classes, manage student accounts, process payments, communicate with parents/students, improve educational services, and ensure platform security. We do not sell personal information to third parties."
            },
            {
                title: "7. Sharing of Information",
                content: "We may share information only with payment processing providers, website hosting providers, and legal authorities (if required by law). All third-party partners are expected to maintain data confidentiality."
            },
            {
                title: "8. Data Security",
                content: "We implement reasonable administrative, technical, and security safeguards to protect personal information. However, no online system is 100% secure, and we cannot guarantee absolute security."
            },
            {
                title: "9. Data Retention",
                content: "We retain personal information only as long as necessary to provide services, comply with legal obligations, and resolve disputes. Parents may request deletion of student data by contacting us."
            },
            {
                title: "10. International Users",
                content: "Ruhani Online Education operates from India. If you are accessing our services from outside India (including the United States), you understand that your information may be processed and stored in India. By using our services, you consent to this transfer."
            },
            {
                title: "11. Contact Information",
                content: "For any questions or concerns regarding this policy, please contact us at support@myroed.com. Support hours are 5 PM – 10 PM IST."
            }
        ]
    },
    "refund-policy": {
        title: "Refund Policy",
        effectiveDate: "03/01/2026",
        introduction: "At Ruhani Online Education, we are committed to providing high-quality online mathematics education. All fees paid for our services are generally non-refundable, except as explicitly stated in this policy. By enrolling in any course or plan, you agree to this Refund Policy.",
        sections: [
            {
                title: "1. Advance Payments",
                content: "All classes and plans must be paid in advance. Once payment is successfully processed, the student’s seat is reserved. Reserved seats prevent us from offering that slot to other students. Because of this, payments are typically non-refundable."
            },
            {
                title: "2. Consultation Recommendation",
                content: "We strongly recommend that parents and students speak with our support team (available 5 PM – 10 PM CST) to understand the plan structure and clarify all doubts before making payment. Failure to consult before enrollment does not qualify for a refund."
            },
            {
                title: "3. Group Plans (Standard & Premium)",
                content: "For Group Plans:",
                items: [
                    "Once the batch has started, no refunds will be issued.",
                    "If a student voluntarily withdraws, no partial refund will be provided.",
                    "Missed classes due to personal reasons are not refundable."
                ]
            },
            {
                title: "4. One-on-One Private Plan",
                content: "For One-on-One sessions:",
                items: [
                    "Once sessions are scheduled and commenced, payments are non-refundable.",
                    "Rescheduling may be allowed with prior notice (minimum 24 hours).",
                    "Failure to attend a scheduled session without notice may result in loss of that session without refund."
                ]
            },
            {
                title: "5. Technical Issues",
                content: [
                    "Refunds will not be issued for technical problems on the student’s side (internet issues, device problems, software issues).",
                    "If a class is cancelled due to our technical issue, it will be rescheduled."
                ]
            },
            {
                title: "6. Exceptional Circumstances",
                content: "Refund requests may be reviewed in rare and exceptional circumstances at our sole discretion. Approval of any refund (full or partial) is not guaranteed and is decided on a case-by-case basis."
            },
            {
                title: "7. Chargebacks & Payment Disputes",
                content: "If a parent initiates a chargeback or payment dispute without contacting us first:",
                items: [
                    "The student’s access to classes may be suspended immediately.",
                    "We reserve the right to provide evidence of enrollment, attendance, and agreement to policies to the payment processor.",
                    "Any fraudulent dispute may lead to permanent termination of services."
                ]
            }
        ]
    },
    "cancellation-rescheduling": {
        title: "Cancellation & Rescheduling Policy",
        effectiveDate: "03/01/2026",
        introduction: "This Cancellation & Rescheduling Policy applies to all services offered by Ruhani Online Education, including Standard Group Plans, Premium Group Plans, and One-on-One Private Sessions. By enrolling in any program, parents/guardians agree to this policy.",
        sections: [
            {
                title: "1. Group Classes (Standard & Premium)",
                content: "Student Absence:",
                items: [
                    "Missed group classes due to personal reasons are not refundable.",
                    "Makeup classes are not guaranteed.",
                    "Recorded sessions (if available) may be shared at our discretion.",
                    "Group batches operate on fixed schedules and cannot be adjusted for individual absences.",
                    "If a student joins after the batch has started, missed classes will not be refunded or rescheduled."
                ]
            },
            {
                title: "2. One-on-One Private Sessions",
                content: "Rescheduling by Student:",
                items: [
                    "A minimum of 24 hours prior notice is required to reschedule a session.",
                    "Rescheduling is subject to tutor availability.",
                    "Repeated rescheduling may not be permitted."
                ]
            },
            {
                title: "3. Late Cancellation",
                content: "If cancellation is made less than 24 hours before the session OR the student does not attend without prior notice, the session will be considered forfeited and will not be refunded or rescheduled."
            },
            {
                title: "4. Rescheduling by Ruhani Online Education",
                content: "If a session is cancelled by us due to tutor unavailability, technical issues on our end, or emergency circumstances, the session will be rescheduled at no additional cost."
            },
            {
                title: "5. Time Zone Responsibility",
                content: "Since we serve international students:",
                items: [
                    "Parents are responsible for ensuring correct time zone conversion.",
                    "Missed sessions due to time zone misunderstandings are not refundable."
                ]
            },
            {
                title: "6. Repeated No-Shows",
                content: "Repeated missed sessions without notice may result in suspension of remaining sessions or termination of services without refund."
            }
        ]
    },
    "cookie-policy": {
        title: "Cookie Policy",
        effectiveDate: "03/01/2026",
        introduction: "This Cookie Policy explains how Ruhani Online Education uses cookies and similar technologies when you visit our website. By continuing to use our website, you consent to the use of cookies in accordance with this policy.",
        sections: [
            {
                title: "1. What Are Cookies?",
                content: "Cookies are small text files stored on your device when you visit a website. They help websites function properly and improve user experience."
            },
            {
                title: "2. Types of Cookies We Use",
                content: "We use several types of cookies:",
                items: [
                    "Essential Cookies: Necessary for features like secure login and payment processing.",
                    "Performance & Analytics Cookies: Help us understand visitors usage and traffic patterns.",
                    "Functional Cookies: Remember user preferences like time zone and login info.",
                    "Third-Party Cookies: Placed by trusted services like payment gateways and analytics tools."
                ]
            },
            {
                title: "3. Managing Cookies",
                content: "Users may disable cookies through browser settings or delete stored cookies at any time. Please note that disabling cookies may affect website functionality."
            },
            {
                title: "4. Children’s Data",
                content: "Since our services are directed toward minors (Grade 6–10), cookies are used only to support website functionality and educational services."
            }
        ]
    },
    "disclaimer": {
        title: "Disclaimer",
        effectiveDate: "03/01/2026",
        introduction: "Official disclaimer for Ruhani Online Education. Please read carefully before using our services.",
        sections: [
            {
                title: "1. Educational Purpose Only",
                content: "Ruhani Online Education provides online mathematics tutoring for educational purposes only. We are an independent provider and not affiliated with any specific school district or examination board."
            },
            {
                title: "2. No Guarantee of Results",
                content: "While we strive for high-quality instruction, we do not guarantee specific grades or academic outcomes. Student performance depends on effort, attendance, and individual learning ability."
            },
            {
                title: "3. Parental Responsibility",
                content: "For students under 18, enrollment must be completed by a guardian. Parents are responsible for supervising participation and ensuring appropriate internet access."
            },
            {
                title: "4. Technology Disclaimer",
                content: "We are not responsible for internet connectivity issues, device malfunctions, or power outages on the student's side. Missed sessions due to student technical issues may not be refundable."
            },
            {
                title: "5. Limitation of Liability",
                content: "To the maximum extent permitted by law, Ruhani Online Education shall not be liable for indirect or consequential damages. Our total liability shall not exceed the amount paid for the specific service."
            }
        ]
    },
    "limitation-of-liability": {
        title: "Limitation of Liability",
        effectiveDate: "03/01/2026",
        introduction: "Official limitation of liability and legal protection policy for Ruhani Online Education.",
        sections: [
            {
                title: "1. No Warranties",
                content: "All services are provided on an 'as is' and 'as available' basis. We make no warranties, express or implied, regarding fitness for a particular purpose or error-free service."
            },
            {
                title: "2. Academic Performance",
                content: "We do not guarantee admission to any school, improved GPA, or specific exam success. Results depend on external factors beyond our control."
            },
            {
                title: "3. Limitation of Financial Liability",
                content: "Ruhani Online Education shall not be liable for incidental or consequential damages, emotional distress claims, or technical interruptions. Liability is limited to the amount paid by the customer."
            },
            {
                title: "4. Indemnification",
                content: "Parents/Guardians agree to indemnify Ruhani Online Education from any claims arising from misuse of services, violation of policies, or false chargebacks."
            },
            {
                title: "5. Force Majeure",
                content: "We are not responsible for delays caused by events beyond our control, such as natural disasters, internet outages, or government restrictions."
            },
            {
                title: "6. Jurisdiction",
                content: "Any disputes arising from our services shall be governed by the laws of India, with exclusive jurisdiction in the courts of Haryana, India."
            }
        ]
    },
    "user-policy": {
        title: "User Policy (Terms of Use)",
        effectiveDate: "01/03/2026",
        introduction: "Welcome to Ruhani Online Education. By accessing our website, you agree to comply with and be bound by this User Policy. Our services are designed primarily for students from Grade 6 to Grade 10.",
        sections: [
            {
                title: "1. Services Provided",
                content: "We provide online mathematics classes, group sessions, private tutoring, academic support, and study materials.",
                items: ["Live & Recorded classes", "Standard & Premium group sessions", "Doubt-solving sessions"]
            },
            {
                title: "2. Eligibility & Account",
                content: "Students under 18 must have parental consent. Users must provide accurate details and maintain account confidentiality.",
                items: ["Parental/Guardian consent required", "Accurate registration info", "Confidential credentials"]
            },
            {
                title: "3. Payment & Refunds",
                content: "Fees must be paid in advance in USD. Fees are non-refundable once sessions have commenced. We do not store full credit card info."
            },
            {
                title: "4. Code of Conduct",
                content: "Users agree not to disrupt classes, share inappropriate content, or record/distribute materials without permission. Violations may result in termination."
            },
            {
                title: "5. Intellectual Property",
                content: "All materials, videos, and branding are the intellectual property of Ruhani Online Education. Users may not copy, resell, or publicly share any materials."
            },
            {
                title: "6. Governing Law",
                content: "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Haryana, India."
            }
        ]
    }
};
