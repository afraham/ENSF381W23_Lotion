import React, { useState } from "react";
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({ edit }) {
  const { noteId } = useParams();
  // useOutletContext returns [note]
  const [notes, updateNote, deleteNote] = useOutletContext();
  const [body, setBody] = useState(notes[noteId] ? notes[noteId].body : "");
  const [title, setTitle] = useState(notes[noteId] ? notes[noteId].title : "");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const saveButton = () => {
    console.log(title);
    const newNote = { ...notes[noteId], title, body, time };
    updateNote(newNote, noteId);
    navigate(`/notes/${noteId}`);
    const url = "./notes/" + noteId;
    // update the note at the noteId index to the newNote
    notes[noteId] = newNote;
    localStorage.setItem(url, JSON.stringify(newNote));
  };

  const deleteButton = () => {
    deleteNote(noteId);
  }

  const timeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <>
      <div id="rightsidenote">
        <div id="editorHead">
          <div id="titledate">
            {!edit ? (
              <h2>{title}</h2>
            ) : (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            )}
            <input
              id="time"
              type="datetime-local"
              value={time}
              onChange={timeChange}
            />
          </div>
          <div id="editsavebutton">
            {edit ? (
              <>
                <button className="notebuttons" onClick={() => saveButton()}>
                  Save
                </button>
              </>
            ) : (
              <NavLink to={`./edit`}>
                <button className="notebuttons">Edit</button>
              </NavLink>
            )}
            <button className="notebuttons" onClick={() => deleteButton()}>Delete</button>
          </div>
        </div>
        {edit ? (
          <div id="mainnotes">
            <ReactQuill theme="snow" value={body} onChange={setBody} />
          </div>
        ) : (
          <ReactQuill readOnly={true} theme={"bubble"} value={body} />
        )}
      </div>
    </>
  );
}

export default Editor;
