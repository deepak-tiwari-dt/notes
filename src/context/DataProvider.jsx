import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
  const [deleteNotes, setDeleteNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);

  return (
    <DataContext.Provider
      value={{
        notes,
        setNotes,
        archiveNotes,
        setArchiveNotes,
        deleteNotes,
        setDeleteNotes,
        pinnedNotes,
        setPinnedNotes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
