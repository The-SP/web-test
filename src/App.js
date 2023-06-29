import { useEffect, useState } from "react";
import JobItem from "./JobItem";

const App = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(
      "https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json"
    )
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Error fetching data");
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setJobs(data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  if (jobs.length === 0) return <div>Loading...</div>;
  return (
    <div>
      {jobs.map((job, index) => (
        <JobItem key={index} job={job} />
      ))}
    </div>
  );
};

export default App;
