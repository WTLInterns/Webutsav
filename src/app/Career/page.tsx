"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, Users, Briefcase, Code, Palette, BarChart3, Settings, Headphones, Shield, ChevronDown, Filter, X, Loader, Upload, Loader2 } from 'lucide-react';

const CareerPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobDetailsLoading, setJobDetailsLoading] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJobForApplication, setSelectedJobForApplication] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedJobInfo, setSubmittedJobInfo] = useState(null);
  
  const heroRef = useRef(null);
  const jobsRef = useRef(null);
  const departmentsRef = useRef(null);

  // API base URL - Update this to match your backend URL
  const API_BASE_URL = 'https://api.webutsav.com/job'; // Adjust this URL as needed

  // Fetch all jobs from API
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/getAllJob`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jobsData = await response.json();
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs. Please try again later.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch job details by ID
  const fetchJobById = async (jobId) => {
    try {
      setJobDetailsLoading(true);
      const response = await fetch(`${API_BASE_URL}/getById/${jobId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const jobData = await response.json();
      setSelectedJob(jobData);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Failed to load job details.');
    } finally {
      setJobDetailsLoading(false);
    }
  };

  // Mock animation functions (replace with real GSAP in Next.js)
  const animateOnMount = () => {
    console.log('Animations would trigger here with GSAP');
  };

  useEffect(() => {
    animateOnMount();
    fetchAllJobs();
  }, []);



  const departments = [
    { name: 'Research & Development', icon: Code, count: 12, color: 'bg-blue-500' },
    { name: 'Sales', icon: Settings, count: 8, color: 'bg-green-500' },
    { name: 'Digital Marketing', icon: BarChart3, count: 9, color: 'bg-orange-500' },
    { name: 'Back Office', icon: Headphones, count: 4, color: 'bg-pink-500' },
  ];

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || true; // Location filtering can be added later
    const matchesType = selectedType === 'All' || job.employeementType === selectedType;
    const matchesSearch = searchTerm === '' ||
      (job.jobProfile && job.jobProfile.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobRole && job.jobRole.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.keyword && job.keyword.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (job.department && job.department.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesDepartment && matchesLocation && matchesType && matchesSearch;
  });

  // Get unique locations and types from jobs data
  const locations = ['All', 'Kharadi, Pune', 'Remote', 'Hybrid']; // Static for now
  const jobTypes = ['All', ...new Set(jobs.map(job => job.employementType).filter(Boolean))];

  // Handle job detail view
  const handleViewDetails = (jobId) => {
    fetchJobById(jobId);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  // Handle Apply Now button click
  const handleApplyNow = (job) => {
    setSelectedJobForApplication(job);
    setShowApplicationModal(true);
  };

  // Close application modal
  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedJobForApplication(null);
  };

  // Handle successful application submission
  const handleApplicationSuccess = (jobInfo) => {
    setSubmittedJobInfo(jobInfo);
    setShowSuccessModal(true);
  };

  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedJobInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Build Your Career at
              <span className="block text-blue-300">Webutsav</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join our dynamic team of innovators, creators, and digital solution experts. 
              Shape the future of technology while growing your career in Pune's thriving tech ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                onClick={() => jobsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Learn About Culture
              </button>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-400/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-400/20 rounded-full animate-ping"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">300+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">2000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{jobs.length}</div>
              <div className="text-gray-600">Open Positions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section ref={departmentsRef} className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover opportunities across our diverse teams and find where your skills can make the biggest impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => {
              const IconComponent = dept.icon;
              const deptJobCount = jobs.filter(job => job.department === dept.name).length;
              return (
                <div
                  key={dept.name}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  onClick={() => {
                    setSelectedDepartment(dept.name);
                    jobsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className={`w-12 h-12 ${dept.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {deptJobCount} open position{deptJobCount !== 1 ? 's' : ''}
                  </p>
                  <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                    View Jobs →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Search & Filter Section */}
      <section ref={jobsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity and join our growing team
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchAllJobs}
                className="mt-2 text-red-600 hover:text-red-700 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Search and Filters */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs, skills, or keywords..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                className="lg:hidden bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                Filters
              </button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex gap-4">
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location === 'All' ? 'All Locations' : location}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mt-4 grid grid-cols-1 gap-4">
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location === 'All' ? 'All Locations' : location}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} positions
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="animate-spin text-blue-600" size={48} />
              <span className="ml-3 text-gray-600">Loading jobs...</span>
            </div>
          ) : (
            /* Job Listings */
            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div
                    key={job.jobId}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{job.jobProfile}</h3>
                          <div className="flex flex-wrap gap-2">
                            {job.department && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                {job.department}
                              </span>
                            )}
                            {job.employmentType && (
                              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                {job.employmentType}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                          {job.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={16} />
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.experience && (
                            <div className="flex items-center gap-1">
                              <Briefcase size={16} />
                              <span>{job.experience} Yrs</span>
                            </div>
                          )}
                          {job.postedDate && (
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{job.postedDate}</span>
                            </div>
                          )}
                        </div>

                        {job.keyword && job.keyword.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.keyword.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                        <button
                          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          onClick={() => handleViewDetails(job.jobId)}
                        >
                          Learn More
                        </button>
                        <button
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          onClick={() => handleApplyNow(job)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedJob.jobProfile || selectedJob.jobRole || 'Job Position'}
                </h2>
                <button
                  onClick={closeJobDetails}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              {jobDetailsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader className="animate-spin text-blue-600" size={32} />
                  <span className="ml-3 text-gray-600">Loading details...</span>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {selectedJob.department && (
                      <div>
                        <span className="font-semibold text-gray-700">Department:</span>
                        <span className="ml-2 text-gray-600">{selectedJob.department}</span>
                      </div>
                    )}
                    {selectedJob.employeementType && (
                      <div>
                        <span className="font-semibold text-gray-700">Employment Type:</span>    
                        <span className="ml-2 text-gray-600">{selectedJob.employementType}</span>   
                      </div>
                    )}
                    {selectedJob.experience && (
                      <div>
                        <span className="font-semibold text-gray-700">Experience:</span>
                        <span className="ml-2 text-gray-600">{selectedJob.experience}Yrs</span>
                      </div>
                    )}
                    {selectedJob.shift && (
                      <div>
                        <span className="font-semibold text-gray-700">Shift:</span>
                        <span className="ml-2 text-gray-600">{selectedJob.shift}</span>
                      </div>
                    )}
                    {selectedJob.expectedSalary && (
                      <div>
                        <span className="font-semibold text-gray-700">Expected Salary:</span>
                        <span className="ml-2 text-gray-600">{selectedJob.expectedSalary}</span>
                      </div>
                    )}
                    {selectedJob.vacancy && (
                      <div>
                        <span className="font-semibold text-gray-700">Vacancies:</span>
                        <span className="ml-2 text-gray-600">{selectedJob.vacancy} positions</span>
                      </div>
                    )}
                    {selectedJob.postedDate && (
                      <div>
                        <span className="font-semibold text-gray-700">Posted Date:</span>
                        <span className="ml-2 text-gray-600">
                          {new Date(selectedJob.postedDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-700">Status:</span>
                      <span className={`ml-2 font-medium ${selectedJob.isActive === 'true' ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedJob.isActive === 'true' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  {selectedJob.keyword && selectedJob.keyword.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Required Skills & Keywords:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.keyword.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedJob.description && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-2">Job Description:</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                    </div>
                  )}

                  {/* Roles and Responsibilities Section */}
                  {selectedJob.rolesAndResponsibility && selectedJob.rolesAndResponsibility.length > 0 ? (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-3">Roles & Responsibilities:</h3>
                      <ul className="space-y-2">
                        {selectedJob.rolesAndResponsibility.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 leading-relaxed">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-700 mb-3">Roles & Responsibilities:</h3>
                      <p className="text-gray-500 italic">
                        Detailed roles and responsibilities will be shared during the interview process.
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                    <button 
                      onClick={closeJobDetails}
                      className="px-6 py-3 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              
            </div>
          </div>
        </div>
      )}

      {/* Company Culture Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join Webutsav?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just building digital solutions; we're building careers, relationships, and the future of technology in Pune.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Culture</h3>
              <p className="text-gray-600">
                Work with talented professionals in a supportive environment that encourages innovation and creative problem-solving.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">
                Advance your career with continuous learning opportunities, skill development programs, and leadership training.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Settings className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cutting-edge Technology</h3>
              <p className="text-gray-600">
                Work with the latest technologies and tools while contributing to innovative projects for clients across industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join Webutsav and be part of a team that's shaping the digital future. 
            Your next career opportunity is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => jobsRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse All Jobs
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Submit Resume
            </button>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      {showApplicationModal && selectedJobForApplication && (
        <JobApplicationModal
          job={selectedJobForApplication}
          onClose={closeApplicationModal}
          onSuccess={handleApplicationSuccess}
        />
      )}

      {/* Success Modal */}
      {showSuccessModal && submittedJobInfo && (
        <SuccessModal
          jobInfo={submittedJobInfo}
          onClose={closeSuccessModal}
        />
      )}
    </div>
  );
};

// Job Application Modal Component
const JobApplicationModal = ({ job, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }

      if (file.size > maxSize) {
        alert('File size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phone || !formData.experience) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Validate job information
      if (!job.jobRole && !job.jobProfile) {
        alert('Job role information is missing. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      const applicationData = new FormData();
      applicationData.append('fullName', formData.fullName);
      applicationData.append('email', formData.email);
      applicationData.append('phone', formData.phone);
      applicationData.append('jobRole', job.jobRole || job.jobProfile || '');
      applicationData.append('department', job.department || '');
      applicationData.append('experience', formData.experience);

      if (formData.resume) {
        applicationData.append('resume', formData.resume);
      }

      console.log('Submitting application data:', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        jobRole: job.jobRole || job.jobProfile || '',
        department: job.department || '',
        experience: formData.experience,
        hasResume: !!formData.resume
      });

      const apiUrl = "https://api.webutsav.com/employees/apply";
      console.log('Submitting to API:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: applicationData,
      });

      if (response.ok) {
        const result = await response.json();

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          experience: '',
          resume: null
        });

        // Close application modal and show success modal
        onClose();
        onSuccess({
          jobRole: job.jobRole || job.jobProfile,
          department: job.department,
          email: formData.email
        });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Apply for Position</h2>
            <p className="text-gray-600">{job.jobProfile || job.jobRole} - {job.department}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Application Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-7 years">5-7 years</option>
                  <option value="7-10 years">7-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
            </div>

            {/* Auto-populated fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Role
                </label>
                <input
                  type="text"
                  value={job.jobRole || job.jobProfile || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={job.department || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume/CV *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                  required
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <Upload className="text-gray-400 mb-2" size={24} />
                  <span className="text-sm text-gray-600">
                    {formData.resume ? formData.resume.name : 'Click to upload resume (PDF, DOC, DOCX - Max 5MB)'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Success Modal Component
const SuccessModal = ({ jobInfo, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Application Submitted Successfully!</h2>
          <p className="text-gray-600">Thank you for your interest in joining our team!</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">Application Details:</h3>
          <div className="space-y-1 text-sm text-gray-700">
            <p><span className="font-medium">Position:</span> {jobInfo.jobRole}</p>
            <p><span className="font-medium">Department:</span> {jobInfo.department}</p>
            <p><span className="font-medium">Email:</span> {jobInfo.email}</p>
          </div>
        </div>

        <div className="text-left mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">What happens next:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Our team will review your application within 2-3 business days</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>If your profile matches our requirements, we'll contact you for the next steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>You'll receive an email confirmation shortly at {jobInfo.email}</span>
            </li>
          </ul>
        </div>

        <div className="text-center text-sm text-gray-600 mb-6">
          <p>We appreciate your interest in our company and look forward to potentially welcoming you to our team!</p>
          <p className="mt-2 font-medium">Best regards,<br />HR Team</p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Continue Exploring Careers
        </button>
      </div>
    </div>
  );
};

export default CareerPage;