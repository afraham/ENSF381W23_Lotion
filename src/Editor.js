import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor() {
  const [value, setValue] = useState("");

  return (
    <>
      <div id="rightsidenote">
        <div id="editorHead">
          <div id="titledate">
            <h2 contentEditable="true">
              Untiled
            </h2>
            <input id="time" type="datetime-local" />
          </div>
          <div id="editsavebutton">
            <button className="notebuttons">Save</button>
            <button className="notebuttons">Delete</button>
          </div>
        </div>
        <div id="mainnotes">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
    </>
  );
}

export default Editor;

/*
<div id="rightside">
        <div id="noselect">Select a note, or create a new one.</div>
      </div>
      */
