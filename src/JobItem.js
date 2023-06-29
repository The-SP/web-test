const JobItem = ({ job }) => {
  const postedTimeAgo = formatPostedDate(job.posted_on)
  return (
    <div className="job-item container my-3 p-3">
      <div className="d-flex align-items center">
        <div className="company-logo">
          <img
            src={job.company_logo}
            alt="Company Logo"
            className="rounded-circle"
            width={80}
            height={80}
          />
        </div>
        <div className="job-details mx-3">
          <div className="text-success">{job.company}</div>
          <div className="fw-bold">{job.position}</div>
          <div className="text-muted">
            {postedTimeAgo} - {job.timing} - {job.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;

const formatPostedDate = (postedOn) => {
    const currentTime = new Date().getTime();
    // Calculate the difference between current timestamp and postedOn timestamp
    const timeDiff = currentTime - postedOn;
    
    const millisecondsInHour = 60 * 60 * 1000;
    const hours = Math.floor(timeDiff / millisecondsInHour)
    if (hours < 24)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`

    const days = Math.floor(hours / 24)
    if (days < 7)
        return `${days} day${days > 1 ? 's' : ''} ago`
    
    const weeks = Math.floor(days / 7)
    if (weeks < 4)
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`

    const months = Math.floor(weeks / 4)
        return `${months} month${months > 1 ? 's' : ''} ago`
}