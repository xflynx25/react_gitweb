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
  const [display, setDisplay] = useState("name");

  return (
    <div className="academics">
      <div className="selectors-container">
        <div className="selector selector-sort">
          <p className="sortby">Sort by:</p>
          <button onClick={() => setView('how_complete')}>How Complete</button>
          <button onClick={() => setView('subject')}>Subject</button>
          <button onClick={() => setView('year')}>Year</button>
        </div>
        <div className="selector selector-display">
          <p className="display">Display:</p>
          <button className="display-btn" onClick={() => setDisplay('name')}>Name</button>
          <button className="display-btn" onClick={() => setDisplay('number')}>Number</button>
        </div>
      </div>

      <GroupedView data={data} groupBy={view} display={display} />
    </div>
  );
}


function GroupedView({ data, groupBy, display }) {
  const groups = groupDataBy(data, groupBy);

  return (
    <div className="section">
      {Object.entries(groups).map(([group, items]) => (
        <div className="rectangle" key={group}>
          <h3>{group}</h3>
          {items.map((item) => (
            <p key={item.classname}>
              {display === "name" ? item.classname : item.number}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Academics;
