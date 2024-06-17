import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Note from "./Note";

const PinnedNotes = () => {
  const { pinnedNotes } = useContext(DataContext);

  return (
    <div>
      <h2>Pinned Notes</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pinnedNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default PinnedNotes;
