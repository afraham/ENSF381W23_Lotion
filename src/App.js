import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const localstorageKey = "notes";
function App() {
  let existingNotes = localStorage.getItem(localstorageKey);
  const [notes, newNote] = useState([]);

  useEffect(() => {
    if (existingNotes) {
      newNote(JSON.parse(existingNotes));
    }
  }, []);

  const updateLocalStorage = () => {
    localStorage.setItem(localstorageKey, JSON.stringify(notes));
  };

  const addNewNote = () => {
    newNote([
      {
        title: `Untitled`,
        time: "--:--:--",
        body: "...",
      },
      ...notes,
    ]);
    updateLocalStorage();
  };

  const updateNote = (newNoteVal, noteId) => {
    noteId = parseInt(noteId);
    let updateVals = [
      ...notes.slice(0, noteId),
      {
        ...newNoteVal,
        title: newNoteVal.title,
        body: newNoteVal.body,
        time: newNoteVal.time,
      },
      ...notes.slice(noteId + 1),
    ];
    newNote(updateVals);
    updateLocalStorage();
  };

  const deleteNote = (noteId) => {
    const noteNum = parseInt(noteId);
    const remove = [...notes.slice(0, noteNum), ...notes.slice(noteNum + 1)];
    newNote(remove);
    updateLocalStorage();
  };

  const [showSidemenu, setShowSidemenu] = useState(false);

  return (
    <>
      <div className="header">
        <h1>Lotion</h1>
        <p className="subtitle">Like Notion, but worse.</p>
        <button
          id="hamburgermenu"
          onClick={() => setShowSidemenu(!showSidemenu)}
        >
          <b>&#9776;</b>
        </button>
      </div>
      <div id="mainbody">
        <div id="leftside" >
          <div id="sidemenu" className={showSidemenu ? "show" : "hide"}>
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
            <Outlet context={[notes, updateNote, deleteNote]} />
          )}
        </>
      </div>
    </>
  );
}

export default App;
