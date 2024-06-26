import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { DataContext } from "../context/DataProvider";
import Note from "./Note";

const NotesContainer = () => {
  const { user } = useContext(AuthContext);
  const { notes, pinnedNotes } = useContext(DataContext);

  if (!user) {
    return <div>Please log in to view your notes.</div>;
  }

  const unpinnedNotes = notes.filter((note) => !note.pinned);

  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div>
          <h2>Pinned Notes</h2>
          <div className="note-container">
            {pinnedNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      <div>
        <h2>Other Notes</h2>
        <div className="note-container">
          {unpinnedNotes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesContainer;
