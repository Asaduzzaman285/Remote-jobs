import React, { useState } from 'react';

const JobListing = ({ job, onApplicationSubmit }) => {
  const [showFull, setShowFull] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    coverLetter: ''
  });

  let description = job.description;
  if (!showFull) {
    description = description.substring(0, 90) + '...';
  }


  const toggleDescription = () => {
    setShowFull(!showFull);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const applicationData = { ...userData, jobId: job.id, jobTitle: job.title };

    const savedApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    savedApplications.push(applicationData);
    localStorage.setItem('jobApplications', JSON.stringify(savedApplications));


    if (onApplicationSubmit) {
      onApplicationSubmit(applicationData);
    }

 
    closeModal();
    

    setUserData({
      name: '',
      email: '',
      coverLetter: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative p-3">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{job.type}</div>
          <h3 className="text-xl font-bold">{job.title}</h3>
        </div>

        <div className="mb-5">{description}</div>

        <h3 className="text-indigo-500 mb-2">{job.salary}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <i className="fa-solid fa-location-dot text-lg"></i>
            {job.location}
          </div>

          <button
            onClick={toggleDescription}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            {showFull ? 'Read Less' : 'Read More'}
          </button>

          <button
            onClick={openModal}
            className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm ml-4"
          >
            Go to Job
          </button>
        </div>
      </div>

     
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={userData.coverLetter}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListing;
