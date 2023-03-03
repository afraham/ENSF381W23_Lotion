import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Editor from "./Editor";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [note, newNotes] = useState([]);
  const addnewnote = () => {
    newNotes([
      {
        title: "Untitled",
        body: "...",
        time: "--",
      },
      ...note,
    ]);
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
                {note.map((item, idx) => (
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
          <Editor />
        </>
      </div>
    </>
  );
}

export default App;
