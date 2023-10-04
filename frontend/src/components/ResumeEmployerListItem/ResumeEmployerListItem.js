const ResumeEmployerListItem = ({ employer }) => {
  console.log(employer)

  return (
    <div className='resumeEmployerListItem'>
      <div className="resumeEmployerListItem-header">
        <div className="resumeEmployerListItem-headerInfo">
          <h3>{employer.position}</h3>
          <p>{employer.company}, {employer.location}</p>
        </div>
        <div className="resumeEmployerListItem-headerDates">
          <p>{employer.startDate} - {employer.endDate}</p>
        </div>
      </div>
    </div>
  )
}

export default ResumeEmployerListItem
