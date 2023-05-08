import React, { useState } from 'react';
import '../stylesheets/Academics.css';
import data from '../assets/academics.json';


function groupDataBy(data, property) {
  return data.reduce((acc, item) => {
    acc[item[property]] = [...(acc[item[property]] || []), item];
    return acc;
  }, {});
}

function Academics() {
  const [view, setView] = useState("subject");

  return (
    <div className="academics">
      <div className="selector">
        <p className="sortby">Sort by:</p>
        <button onClick={() => setView('how_complete')}>How Complete</button>
        <button onClick={() => setView('subject')}>Subject</button>
        <button onClick={() => setView('year')}>Year</button>
      </div>

      {view === "subject" && <SubjectView data={data} />}
      {view === "year" && <YearView data={data} />}
      {view === "how_complete" && <HowCompleteView data={data} />}
    </div>
  );
}

function SubjectView({ data }) {
  const subjects = groupDataBy(data, 'subject');

  return (
    <div className="section">
      {Object.entries(subjects).map(([subject, items]) => (
        <div className="rectangle" key={subject}>
          <h3>{subject}</h3>
          {items.map((item) => (
            <p key={item.classname}>{item.classname}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function YearView({ data }) {
  const years = groupDataBy(data, 'year');

  return (
    <div className="section">
      {Object.entries(years).map(([year, items]) => (
        <div className="rectangle" key={year}>
          <h3>{year}</h3>
          {items.map((item) => (
            <p key={item.classname}>{item.classname}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function HowCompleteView({ data }) {
  const howComplete = groupDataBy(data, 'how_complete');

  return (
    <div className="section">
      {Object.entries(howComplete).map(([completionStatus, items]) => (
        <div className="rectangle" key={completionStatus}>
          <h3>{completionStatus}</h3>
          {items.map((item) => (
            <p key={item.classname}>{item.classname}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Academics;
