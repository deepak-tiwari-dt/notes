import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Note from "./Note";
import styled from "styled-components";

const PinnedNotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PinnedNotes = () => {
  const { pinnedNotes } = useContext(DataContext);

  return (
    <div>
      <h2>Pinned Notes</h2>
      <PinnedNotesContainer>
        {pinnedNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </PinnedNotesContainer>
    </div>
  );
};

export default PinnedNotes;
