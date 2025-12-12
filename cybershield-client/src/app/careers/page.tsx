"use client";
import React, { useState } from 'react';
import { Search, X, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

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

const JobsListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Sample jobs data - replace with your actual jobs
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: 'Competative',
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
      salary: 'Competative',
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
      salary: '6.8 lpa',
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
      salary: '20,000 per month',
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
      salary: 'Competative',
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
      salary: 'Competative',
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
      salary: 'Competative',
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
    salary: 'Competative',
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
      salary: 'Competative',
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {!selectedJob ? (
          <>
            {/* Header */}
            <div className="flex flex-col items-center justify-center mb-8">
              <h1 className="text-5xl font-bold text-gray-900 mb-2">Join Our Team</h1>
              <p className="text-lg text-gray-600">Discover exciting opportunities in IT services</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Department Filter */}
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                {/* Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-6">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </p>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {job.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {job.description}
                  </p>

                  <button className="mt-4 w-full text-blue-600 font-semibold py-2 hover:bg-blue-50 rounded-lg transition-colors">
                    View Details →
                  </button>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
              </div>
            )}
          </>
        ) : (
          /* Job Detail View */
          <div className="bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
              >
                ← Back to all jobs
              </button>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedJob.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {selectedJob.department}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedJob.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {selectedJob.salary}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="max-w-3xl">
                {/* Description */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    About the Role
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </section>

                {/* Requirements */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Requirements
                  </h2>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-blue-600 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Responsibilities */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    Responsibilities
                  </h2>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-blue-600 mr-2">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Apply Button */}
                <div className="border-t border-gray-200 pt-6">
                  <a
                    href={selectedJob.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsListing;