import { useEffect, useState } from "react";
import JobItem from "./JobItem";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [activeKeywords, setActiveKeywords] = useState([]);

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

  const filteredJobs = jobs.filter((job) => {
    return activeKeywords.every((keyword) => job.keywords.includes(keyword));
  });

  const addActiveKeyword = (keyword) => {
    if (activeKeywords.includes(keyword))
      setActiveKeywords(activeKeywords.filter((key) => key !== keyword));
    else setActiveKeywords([...activeKeywords, keyword]);
  };

  const removeActiveKeyword = (keyword) => {
    setActiveKeywords(activeKeywords.filter((kw) => kw !== keyword));
  };

  if (jobs.length === 0) return <div>Loading...</div>;
  return (
    <div className="container">
      {activeKeywords.length > 0 && (
        <div className="active-keywords bg-white p-2 mt-3 d-flex justify-content-between align-items-center">
          <div className="d-flex">
            {activeKeywords.map((keyword) => (
              <div key={keyword}>
                <span className="active-keyword-btn me-2">
                  <span className="active-keyword-btn-text ps-2 pe-1">
                    {keyword}
                  </span>
                  <span
                    className="del-btn fw-bold"
                    onClick={() => removeActiveKeyword(keyword)}
                  >
                    &times;
                  </span>
                </span>
              </div>
            ))}
          </div>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setActiveKeywords([])}
          >
            Clear
          </button>
        </div>
      )}

      {filteredJobs.map((job, index) => (
        <JobItem
          key={index}
          job={job}
          activeKeywords={activeKeywords}
          addActiveKeyword={addActiveKeyword}
        />
      ))}
    </div>
  );
};

export default App;
