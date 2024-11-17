import React from 'react';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider  } from 'react-router-dom';
import JobPage from './pages/JobPage';
import NotFoundPage from './pages/NotFoundPage';
import Job , { jobLoader } from './pages/Job';
import AddJobPage from './pages/AddJobPage';
/**
 * The router configuration for the application.
 * 
 * The colon (:) in the path '/jobs/:id' is used to define a route parameter.
 * Route parameters are dynamic segments of the URL that can change based on the request.
 * In this case, ':id' is a placeholder for the job ID, allowing the application to handle
 * routes like '/jobs/1', '/jobs/2', etc., where '1' and '2' are different job IDs.
 */


const App = () => {
   // Add New Job
   const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };
  //Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/jobs' element={<JobPage />} />
        <Route path='*' element={<NotFoundPage />} />
  
        
        <Route path='/jobs/:id' element={<Job deleteJob={ deleteJob }/>}  loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
      </Route>,
      
    )
  );
  return <RouterProvider router={router} />
};

export default App;
