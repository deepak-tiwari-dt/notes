import { useState, useContext } from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  EditOutlined as Edit,
  SaveOutlined as Save,
  PushPinOutlined as Pin,
  PushPin as Unpin,
} from "@mui/icons-material";

import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 240px;
  margin: 8px;
  box-shadow: none;
`;

const Note = ({ note }) => {
  const {
    notes,
    setNotes,
    setArchiveNotes,
    setDeleteNotes,
    pinnedNotes,
    setPinnedNotes,
  } = useContext(DataContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedHeading, setEditedHeading] = useState(note.heading);
  const [editedText, setEditedText] = useState(note.text);

  const archiveNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setArchiveNotes((prevArr) => [note, ...prevArr]);
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setDeleteNotes((prevArr) => [note, ...prevArr]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedNote = { ...note, heading: editedHeading, text: editedText };
    const updatedNotes = notes.map((n) => (n.id === note.id ? updatedNote : n));
    setNotes(updatedNotes);
    setIsEditing(false);
  };

  const pinNote = (note) => {
    const isPinned = !note.pinned;
    const updatedNote = { ...note, pinned: isPinned };
    const updatedNotes = notes.map((n) => (n.id === note.id ? updatedNote : n));
    setNotes(updatedNotes);

    if (isPinned) {
      setPinnedNotes((prevArr) => [updatedNote, ...prevArr]);
    } else {
      const updatedPinnedNotes = pinnedNotes.filter((n) => n.id !== note.id);
      setPinnedNotes(updatedPinnedNotes);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              variant="outlined"
              label="Heading"
              value={editedHeading}
              onChange={(e) => setEditedHeading(e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              margin="dense"
            />
          </>
        ) : (
          <>
            <Typography variant="h6">{note.heading}</Typography>
            <Typography variant="body2">{note.text}</Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <Button color="primary" onClick={handleSave} startIcon={<Save />}>
            Save
          </Button>
        ) : (
          <IconButton onClick={handleEdit}>
            <Edit fontSize="small" />
          </IconButton>
        )}
        <IconButton onClick={() => pinNote(note)}>
          {note.pinned ? <Unpin fontSize="small" /> : <Pin fontSize="small" />}
        </IconButton>
        <Archive
          fontSize="small"
          style={{ marginLeft: "auto" }}
          onClick={() => archiveNote(note)}
        />
        <Delete fontSize="small" onClick={() => deleteNote(note)} />
      </CardActions>
    </StyledCard>
  );
};

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    heading: PropTypes.string,
    text: PropTypes.string,
    pinned: PropTypes.bool,
  }).isRequired,
};

export default Note;
