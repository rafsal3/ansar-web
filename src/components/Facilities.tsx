import "./Facilities.css";

const Facilities = () => {
    const facilities = [
        {
            icon: "🍽️",
            title: "Canteen & Transportation",
            description:
                "Safe, well-organized transportation services and hygienic canteen facilities for students",
        },
        {
            icon: "🏠",
            title: "Hostel Facilities",
            description:
                "Separate hostel facilities for boys and girls with modern amenities and security",
        },
        {
            icon: "🎓",
            title: "Expert Coaching",
            description:
                "Specialized coaching for NEET, JEE, CA, and CMA aspirants by experienced mentors",
        },
        {
            icon: "📊",
            title: "Academic Assessments",
            description:
                "Monthly and periodic assessments to track and enhance student progress",
        },
        {
            icon: "👨‍👩‍👧‍👦",
            title: "Parent Interaction",
            description:
                "Continuous interaction and feedback sessions with parents for holistic development",
        },
        {
            icon: "✅",
            title: "ISO Certified",
            description:
                "ISO-certified institution with highly qualified and experienced faculty members",
        },
        {
            icon: "🔬",
            title: "Modern Laboratories",
            description:
                "Well-equipped computer and science practical laboratories for hands-on learning",
        },
        {
            icon: "📚",
            title: "Library Facilities",
            description:
                "Comprehensive library with extensive resources for in-depth learning and research",
        },
        {
            icon: "🎯",
            title: "Career Guidance",
            description:
                "Dedicated career guidance cell to support and shape future aspirations",
        },
        {
            icon: "💻",
            title: "Online Learning",
            description:
                "Association with Schoolnet for additional online classes, enhancing learning beyond the classroom",
        },
    ];

    return (
        <section className="facilities-section">
            <div className="section-container">
                <div className="facilities-header">
                    <h2 className="section-title">Facilities We Provide</h2>
                    <p className="facilities-subtitle">
                        Empowering students with world-class infrastructure and comprehensive support
                    </p>
                </div>

                <div className="facilities-grid">
                    {facilities.map((facility, index) => (
                        <div key={index} className="facility-card">
                            <div className="facility-icon">{facility.icon}</div>
                            <h3 className="facility-title">{facility.title}</h3>
                            <p className="facility-description">{facility.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Facilities;
