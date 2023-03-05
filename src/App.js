import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

function App() {
  const [notes, newNote] = useState([]);
  const addNewNote = () => {
    newNote([
      {
        title: `Untitled`,
        when: "--:--:--",
        body: "...",
      },
      ...notes,
    ]);
  };

  const updateNote = (newNoteVal, noteId) => {
    let temp = [
      ...notes.slice(0, noteId),
      {
        //...newNote,
        title: newNoteVal.title,
        body: newNoteVal.body,
        when: newNoteVal.time,
      },
      ...notes.slice(noteId + 1),
    ];
    //console.log(temp);
    newNote(temp);
    const url = "./notes/" + noteId;
    // update the note at the noteId index to the newNote
    notes[noteId] = newNote;
    //console.log(notes);
    localStorage.setItem(url, JSON.stringify(newNote));
    //const item = JSON.parse(localStorage.getItem(url));
    //console.log(item, url);
  };

  return (
    <>
      <div className="header">
        <h1>Lotion</h1>
        <p className="subtitle">Like Notion, but worse.</p>
        <button id="hamburgermenu">
          <b>&#9776;</b>
        </button>
      </div>
      <div id="mainbody">
        <div id="leftside">
          <div id="sidemenu">
            <div id="sidemenuhead">
              <h1 id="notesside">Notes</h1>
              <button id="newnote" onClick={addNewNote}>
                &#43;
              </button>
            </div>
            <div id="notes">
              <ul>
                {notes.map((item, idx) => (
                  <p id="notetabs">
                    <NavLink to={`/notes/${idx}`}>
                      <h1 id="notetitle">{item.title}</h1>
                      <p id="notetime">{item.when}</p>
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
