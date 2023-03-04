import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  const [notes, newNote] = useState([]);
  const addnewnote = () => {
    newNote([
      {
        title: "Untitled",
        body: "...",
        when: "--:--:--",
      },
      ...notes,
    ]);
  };

  const updateNote = (newNote, noteId) => {
    console.log(newNote, noteId);
    // update the note at the noteId index to the newNote
    localStorage.setItem(noteId, JSON.stringify(newNote));
    const item = JSON.parse(localStorage.getItem(noteId));
    console.log(newNote);
  };

  return (
    <>
      <div className="header">
        <h1>Lotion</h1>
        <p className="subtitle">Like Notion, but worse.</p>
        <button id="hamburgermenu">
          <b>&equiv;</b>
        </button>
      </div>
      <div id="mainbody">
        <div id="leftside">
          <div id="sidemenu">
            <div id="sidemenuhead">
              <h1 id="notesside">Notes</h1>
              <button id="newnote" onClick={addnewnote}>
                &#43;
              </button>
            </div>
            <div id="notes">
              <ul>
                {notes.map((item, idx) => (
                  <p id="notetabs">
                    <NavLink to={`/notes/${idx}`}>
                      <h1 id="notetitle">{item.title}</h1>
                      <p id="notetime">{item.time}</p>
                      <small id="notebody">{item.body}</small>
                    </NavLink>
                  </p>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <>
          {notes.length === 0 ? (
            <div id="rightside">
              <div id="noselect">Select a note, or create a new one.</div>
            </div>
          ) : (
            <Outlet context={[notes, updateNote]} />
          )}
        </>
      </div>
    </>
  );
}

export default App;
