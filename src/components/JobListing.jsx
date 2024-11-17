import { useState, useEffect } from 'react';
import React from 'react';
import Jobs from './Jobs';
import Spinner from './Spinner';

const JobListing = ({ isHome = false }) => {
    const [jobsListings, setJobsListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl= isHome ? '/api/jobs?_limit=3' : '/api/jobs';
            try {
                // Fetch data from the API
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                // Parse the JSON data
                const data = await res.json();
                // Update the jobsListings state
                setJobsListings(data);
            } catch (error) {
                console.error("Error fetching job listings:", error);
            } finally {
                // Set loading to false when the data is fetched or an error occurs
                setLoading(false);
            }
        };

        fetchJobs();  // Call the function here
    }, []);

    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHome ? "Recent Jobs" : "Browse Jobs"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loading ? (
                        <Spinner loading={ loading } />
                    ) : (
                        jobsListings.length > 0 ? (
                            jobsListings.map((job) => (
                                <Jobs key={job.id} {...job} />
                            ))
                        ) : (
                            <p>No job listings available.</p>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default JobListing;
