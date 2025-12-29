"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimelineContent } from '../components/ui/timeline-animations';
import VerticalCutReveal from '../components/ui/vertical-cut-reveal';
import {
  Search,
  X,
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  ArrowRight,
  ArrowLeft,
  Users,
  Sparkles,
  Filter
} from 'lucide-react';



interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applyLink: string;
}

// Animation variants
const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 20,
    opacity: 0,
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

const JobsListing = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const listingRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Sample jobs data
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'We are looking for a Full Stack Developer to join our engineering team. You will work on building scalable web applications and contribute to our core products.',
      requirements: [
        'Experience in web development',
        'Strong proficiency in React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS/Azure)',
        'Excellent problem-solving skills'
      ],
      responsibilities: [
        'Design and develop new features for our web applications',
        'Collaborate with cross-functional teams',
        'Write clean, maintainable code',
        'Participate in code reviews and mentor junior developers'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 2,
      title: 'IT Support Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Join our support team to help clients resolve technical issues and maintain smooth IT operations.',
      requirements: [
        'IT support experience',
        'Strong knowledge of Windows and Linux systems',
        'Excellent communication skills',
        'CompTIA A+ certification preferred'
      ],
      responsibilities: [
        'Provide technical support to clients',
        'Troubleshoot hardware and software issues',
        'Document support tickets and solutions',
        'Maintain IT infrastructure'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'India',
      type: 'Full-time',
      salary: '6.8 LPA',
      description: 'We need a skilled DevOps Engineer to optimize our infrastructure and deployment processes.',
      requirements: [
        '3+ years of DevOps experience',
        'Proficiency in Docker, Kubernetes, and CI/CD',
        'Experience with infrastructure as code (Terraform)',
        'Strong scripting skills (Python, Bash)'
      ],
      responsibilities: [
        'Manage cloud infrastructure and deployments',
        'Implement CI/CD pipelines',
        'Monitor system performance and reliability',
        'Automate operational processes'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 7,
      title: 'Software Engineer Intern',
      department: 'Engineering',
      location: 'Remote',
      type: 'Internship',
      salary: '20,000/month',
      description: 'Join our engineering team as a Software Engineer Intern and gain hands-on experience building real-world applications. This is a great opportunity to learn from experienced developers and contribute to meaningful projects.',
      requirements: [
        'Currently pursuing a degree in Computer Science or related field',
        'Basic knowledge of programming languages (JavaScript, Python, or Java)',
        'Understanding of data structures and algorithms',
        'Strong willingness to learn and collaborate'
      ],
      responsibilities: [
        'Assist in developing and testing software features',
        'Write clean, well-documented code',
        'Participate in team meetings and code reviews',
        'Learn industry best practices and development workflows'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 4,
      title: 'Cybersecurity Analyst',
      department: 'Security',
      location: 'Remote',
      type: 'Contract',
      salary: 'Competitive',
      description: 'Protect our systems and clients from security threats as a Cybersecurity Analyst.',
      requirements: [
        '3+ years in cybersecurity',
        'Knowledge of security frameworks (NIST, ISO 27001)',
        'Experience with SIEM tools',
        'Security certifications (CISSP, CEH) preferred'
      ],
      responsibilities: [
        'Monitor security alerts and incidents',
        'Conduct vulnerability assessments',
        'Implement security best practices',
        'Develop security policies and procedures'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'India',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Create beautiful and intuitive user experiences for our products and client projects.',
      requirements: [
        '4+ years of UI/UX design experience',
        'Proficiency in Figma and Adobe Creative Suite',
        'Strong portfolio demonstrating design skills',
        'Understanding of front-end development'
      ],
      responsibilities: [
        'Design user interfaces and experiences',
        'Create wireframes and prototypes',
        'Conduct user research and testing',
        'Collaborate with developers and stakeholders'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 6,
      title: 'Project Manager',
      department: 'Management',
      location: 'Remote, India',
      type: 'Full-time',
      salary: 'Competitive',
      description: 'Lead IT projects from conception to delivery while managing client relationships.',
      requirements: [
        '5+ years of project management experience',
        'PMP or Agile certification',
        'Strong leadership and communication skills',
        'Experience with project management tools'
      ],
      responsibilities: [
        'Plan and execute IT projects',
        'Manage project budgets and timelines',
        'Coordinate with internal teams and clients',
        'Track project progress and report to stakeholders'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 8,
      title: 'UI/UX Intern',
      department: 'Design',
      location: 'Hybrid',
      type: 'Internship',
      salary: 'Competitive',
      description: 'We are seeking a creative UI/UX Intern to help design intuitive and visually appealing user interfaces. You will work closely with our design team to create wireframes, prototypes, and contribute to our design system.',
      requirements: [
        'Currently pursuing a degree in Design, HCI, or related field',
        'Familiarity with design tools like Figma, Sketch, or Adobe XD',
        'Basic understanding of UI/UX principles',
        'Strong portfolio showcasing design projects (academic or personal)'
      ],
      responsibilities: [
        'Create wireframes and mockups for web and mobile applications',
        'Assist in user research and usability testing',
        'Collaborate with developers to implement designs',
        'Contribute to the company design system and style guides'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    },
    {
      id: 9,
      title: "Founder's Office Analyst - Intern",
      department: 'Management',
      location: 'On-site',
      type: 'Internship',
      salary: 'Competitive',
      description: 'Work directly with the founding team as a Founder\'s Office Analyst Intern. This unique role offers exposure to strategic decision-making, business operations, and cross-functional projects in a fast-paced startup environment.',
      requirements: [
        'Currently pursuing a degree in Business, Management, or related field',
        'Strong analytical and problem-solving skills',
        'Excellent communication and presentation abilities',
        'Proficiency in Microsoft Office and Google Suite'
      ],
      responsibilities: [
        'Support strategic initiatives and business planning',
        'Conduct market research and competitive analysis',
        'Prepare reports and presentations for leadership',
        'Coordinate cross-functional projects and track key metrics'
      ],
      applyLink: 'https://docs.google.com/forms/d/1FKdFGLCmGqihsw6epa97onhwnVM1Say4vLLCcqSk1q0/edit'
    }
  ];

  const departments = ['All', ...Array.from(new Set(jobs.map(job => job.department)))];
  const types = ['All', ...Array.from(new Set(jobs.map(job => job.type)))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesDepartment && matchesType;
  });

  // Department colors (light shades)
  const getDepartmentColor = (dept: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'from-blue-300/20 to-blue-400/10 border-blue-300/30 text-blue-300',
      'Support': 'from-teal-300/20 to-teal-400/10 border-teal-300/30 text-teal-300',
      'Security': 'from-rose-300/20 to-rose-400/10 border-rose-300/30 text-rose-300',
      'Design': 'from-purple-300/20 to-purple-400/10 border-purple-300/30 text-purple-300',
      'Management': 'from-amber-300/20 to-amber-400/10 border-amber-300/30 text-amber-300',
    };
    return colors[dept] || 'from-gray-300/20 to-gray-400/10 border-gray-300/30 text-gray-300';
  };

  const getDepartmentAccent = (dept: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'bg-blue-300/20 text-blue-300 border-blue-300/30',
      'Support': 'bg-teal-300/20 text-teal-300 border-teal-300/30',
      'Security': 'bg-rose-300/20 text-rose-300 border-rose-300/30',
      'Design': 'bg-purple-300/20 text-purple-300 border-purple-300/30',
      'Management': 'bg-amber-300/20 text-amber-300 border-amber-300/30',
    };
    return colors[dept] || 'bg-gray-300/20 text-gray-300 border-gray-300/30';
  };

  return (
    <main className="min-h-screen bg-[#000212] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-28">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <TimelineContent
            animationNum={1}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Join Our Growing Team</span>
            </div>
          </TimelineContent>

          <TimelineContent
            animationNum={2}
            timelineRef={heroRef}
            customVariants={revealVariants}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse={true}
                containerClassName="justify-center"
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 35,
                }}
              >
                Build the Future
              </VerticalCutReveal>
              <span className="block mt-2">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.08}
                  staggerFrom="first"
                  reverse={true}
                  containerClassName="justify-center"
                  elementLevelClassName="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent"
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 35,
                    delay: 0.2,
                  }}
                >
                  With Us
                </VerticalCutReveal>
              </span>
            </h1>
          </TimelineContent>

          <TimelineContent
            animationNum={3}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="text-center"
          >
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
              Discover exciting opportunities in IT services, cybersecurity, and web development.
              Join a team that values innovation, growth, and collaboration.
            </p>
          </TimelineContent>

          {/* Stats */}
          <TimelineContent
            animationNum={4}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex justify-center gap-8 sm:gap-16 flex-wrap"
          >
            {[
              { value: `${jobs.length}+`, label: 'Open Positions' },
              { value: '5+', label: 'Departments' },
              { value: '100%', label: 'Remote Friendly' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-200">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </TimelineContent>
        </div>
      </section>

      {/* Job Listings Section */}
      <section ref={listingRef} className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!selectedJob ? (
              <motion.div
                key="listing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Search and Filters */}
                <TimelineContent
                  animationNum={1}
                  timelineRef={listingRef}
                  customVariants={revealVariants}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Search */}
                      <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search positions..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-400/50 transition-colors"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="flex gap-4">
                        {/* Department Filter */}
                        <div className="relative">
                          <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-gray-400/50 transition-colors cursor-pointer"
                          >
                            {departments.map(dept => (
                              <option key={dept} value={dept} className="bg-gray-900">{dept === 'All' ? 'All Departments' : dept}</option>
                            ))}
                          </select>
                          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>

                        {/* Type Filter */}
                        <div className="relative">
                          <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-gray-400/50 transition-colors cursor-pointer"
                          >
                            {types.map(type => (
                              <option key={type} value={type} className="bg-gray-900">{type === 'All' ? 'All Types' : type}</option>
                            ))}
                          </select>
                          <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineContent>

                {/* Results Count */}
                <TimelineContent
                  animationNum={2}
                  timelineRef={listingRef}
                  customVariants={revealVariants}
                >
                  <p className="text-gray-500 mb-6">
                    Showing <span className="text-gray-300">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'position' : 'positions'}
                  </p>
                </TimelineContent>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onClick={() => setSelectedJob(job)}
                      className={`
                        relative p-6 rounded-2xl cursor-pointer group
                        bg-gradient-to-br ${getDepartmentColor(job.department)}
                        border backdrop-blur-sm
                        hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20
                        transition-all duration-300
                      `}
                    >
                      {/* Department Badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div className={`p-3 rounded-xl bg-white/5 border border-white/10`}>
                          <Briefcase className="w-5 h-5 text-gray-400" />
                        </div>
                        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getDepartmentAccent(job.department)}`}>
                          {job.department}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-100 mb-4 group-hover:text-white transition-colors">
                        {job.title}
                      </h3>

                      <div className="space-y-2 mb-5">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <IndianRupee className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <p className="text-gray-500 text-sm line-clamp-2 mb-5">
                        {job.description}
                      </p>

                      <div className="flex items-center text-gray-400 text-sm font-medium group-hover:text-gray-200 transition-colors">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredJobs.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="text-gray-400 text-lg mb-2">No positions found</p>
                    <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Job Detail View */
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className={`p-8 bg-gradient-to-br ${getDepartmentColor(selectedJob.department)} border-b border-white/10`}>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="flex items-center text-gray-400 hover:text-gray-200 mb-6 transition-colors group"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      Back to all positions
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <span className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full border mb-4 ${getDepartmentAccent(selectedJob.department)}`}>
                          {selectedJob.department}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                          {selectedJob.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {selectedJob.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {selectedJob.type}
                          </div>
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-2" />
                            {selectedJob.salary}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Description */}
                    <section className="mb-10">
                      <h2 className="text-lg font-semibold text-gray-200 mb-4">
                        About the Role
                      </h2>
                      <p className="text-gray-400 leading-relaxed">
                        {selectedJob.description}
                      </p>
                    </section>

                    {/* Requirements */}
                    <section className="mb-10">
                      <h2 className="text-lg font-semibold text-gray-200 mb-4">
                        Requirements
                      </h2>
                      <ul className="space-y-3">
                        {selectedJob.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Responsibilities */}
                    <section className="mb-10">
                      <h2 className="text-lg font-semibold text-gray-200 mb-4">
                        Responsibilities
                      </h2>
                      <ul className="space-y-3">
                        {selectedJob.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start text-gray-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </section>

                    {/* Apply Button */}
                    <div className="pt-6 border-t border-white/10">
                      <a
                        href={selectedJob.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300"
                      >
                        Apply for this Position
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Why Join Us Section */}
      {!selectedJob && (
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-100">
                Why Join <span className="text-gray-400">CyberShield?</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                We believe in building a workplace where talent thrives and innovation flourishes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Remote First",
                  description: "Work from anywhere. We value flexibility and trust our team to deliver exceptional results.",
                },
                {
                  title: "Growth Focused",
                  description: "Continuous learning opportunities, mentorship programs, and clear career progression paths.",
                },
                {
                  title: "Inclusive Culture",
                  description: "A diverse team where every voice matters. We celebrate different perspectives and ideas.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <h3 className="text-lg font-semibold text-gray-200 mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default JobsListing;