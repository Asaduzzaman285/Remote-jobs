import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext'; 

const Competitor = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext); // Access dark mode state and toggle function
   
  const [submissions, setSubmissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('jobApplications')) || [];
    setSubmissions(storedData);
  }, []);

  const groupedSubmissions = submissions.reduce((acc, submission) => {
    if (!acc[submission.jobId]) {
      acc[submission.jobId] = {
        jobTitle: submission.jobTitle,
        jobSalary: submission.salary,
        submissions: []
      };
    }
    acc[submission.jobId].submissions.push(submission);
    return acc;
  }, {});

  const filteredSubmissions = Object.keys(groupedSubmissions)
    .filter(jobId => {
      const { jobTitle, jobSalary, submissions } = groupedSubmissions[jobId];
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        jobId.toString().includes(lowerSearchTerm) || 
        jobTitle.toLowerCase().includes(lowerSearchTerm) || 
        (jobSalary && jobSalary.toString().includes(lowerSearchTerm)) ||
        submissions.some(submission =>
          submission.name.toLowerCase().includes(lowerSearchTerm) ||
          submission.email.toLowerCase().includes(lowerSearchTerm)
        )
      );
    })
    .reduce((acc, jobId) => {
      acc[jobId] = groupedSubmissions[jobId];
      return acc;
    }, {});

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Competitor Form History</h2>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="mb-6 p-2 border rounded-md bg-indigo-600 text-white"
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Job ID, Title, Salary, or Applicant Info..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      
      <div className={`bg-white p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : ''}`}>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Job Submissions</h3>
        
        {Object.keys(filteredSubmissions).length > 0 ? (
          Object.keys(filteredSubmissions).map((jobId) => (
            <div key={jobId} className="bg-gray-100 p-4 rounded-md shadow-sm mb-4">
              <h4 className="text-xl font-bold text-indigo-600">Job ID: {jobId}</h4>
              <p className="text-gray-700 mb-2">Job Title: {filteredSubmissions[jobId].jobTitle}</p>
              <p className="text-gray-700 mb-2">Salary: {filteredSubmissions[jobId].jobSalary || 'N/A'}</p>
              <p className="text-gray-700 mb-2">Submitted {filteredSubmissions[jobId].submissions.length} times</p>
              <ul>
                {filteredSubmissions[jobId].submissions.map((submission, index) => (
                  <li key={index} className="text-gray-800 mb-2">
                    <strong>{submission.name}</strong> ({submission.email})
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No submissions found matching the search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Competitor;
