import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Note from "./Note";

const NotesContainer = () => {
  const { notes, pinnedNotes } = useContext(DataContext);

  const unpinnedNotes = notes.filter((note) => !note.pinned);

  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div>
          <h2>Pinned Notes</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {pinnedNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      <div>
        <h2>Other Notes</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {unpinnedNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesContainer;
