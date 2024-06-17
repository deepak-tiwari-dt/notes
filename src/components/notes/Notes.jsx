import { useContext, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { DataContext } from "../../context/DataProvider";
import { reorder } from "../../utils/common-utils";

import Form from "./Form";
import Note from "./Note";
import EmptyNotes from "./EmptyNotes";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes, setNotes } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);

  const NOTES_PER_PAGE = 6;

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const unpinnedNotes = notes.filter((note) => !note.isPinned);

  const totalPinnedPages = Math.ceil(pinnedNotes.length / NOTES_PER_PAGE);
  const totalUnpinnedPages = Math.ceil(unpinnedNotes.length / NOTES_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalPinnedPages + totalUnpinnedPages)
    );
  };

  const getPaginatedNotes = () => {
    const startPinnedIndex = (currentPage - 1) * NOTES_PER_PAGE;
    const endPinnedIndex = startPinnedIndex + NOTES_PER_PAGE;

    const startUnpinnedIndex = Math.max(
      0,
      startPinnedIndex - pinnedNotes.length
    );
    const endUnpinnedIndex = startUnpinnedIndex + NOTES_PER_PAGE;

    const currentPinnedNotes = pinnedNotes.slice(
      startPinnedIndex,
      endPinnedIndex
    );
    const currentUnpinnedNotes = unpinnedNotes.slice(
      startUnpinnedIndex,
      endUnpinnedIndex
    );

    return { currentPinnedNotes, currentUnpinnedNotes };
  };

  const { currentPinnedNotes, currentUnpinnedNotes } = getPaginatedNotes();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = reorder(notes, result.source.index, result.destination.index);
    setNotes(items);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />
        <Form />
        {notes.length > 0 ? (
          <>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef}>
                    {currentPinnedNotes.length > 0 && (
                      <>
                        <Typography variant="h6">Pinned</Typography>
                        <Grid container style={{ marginTop: 16 }}>
                          {currentPinnedNotes.map((note, index) => (
                            <Draggable
                              key={note.id}
                              draggableId={note.id}
                              index={index}
                            >
                              {(provided) => (
                                <Grid
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  item
                                >
                                  <Note note={note} />
                                </Grid>
                              )}
                            </Draggable>
                          ))}
                        </Grid>
                      </>
                    )}
                    <Typography variant="h6">Notes</Typography>
                    <Grid container style={{ marginTop: 16 }}>
                      {currentUnpinnedNotes.map((note, index) => (
                        <Draggable
                          key={note.id}
                          draggableId={note.id}
                          index={index}
                        >
                          {(provided) => (
                            <Grid
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              item
                            >
                              <Note note={note} />
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Grid>
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button
                variant="contained"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={currentPage === totalPinnedPages + totalUnpinnedPages}
              >
                Next
              </Button>
            </Box>
          </>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;
