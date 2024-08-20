import { createContext, useEffect, useState } from "react";
import useDraftUpdate from "../hooks/useDraftUpdate";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  // ---------------------------------- STATE ----------------------------------
  const [draftId, setDraftId] = useState("");
  const [draftInfo, setDraftInfo] = useState(null);
  const [draftPicks, setDraftPicks] = useState(null);
  const [isDraftActive, setIsDraftActive] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);

  // ---------------------------------- FUNCS ----------------------------------
  const addAlertMessage = (newMessage) => {
    const newAlerts = [...alertMessages];
    const formattedTimestamp = new Date().toLocaleString();

    newAlerts.push(formattedTimestamp + " - " + newMessage);
    setAlertMessages(newAlerts);

    return newAlerts;
  };

  // ---------------------------------- HOOKS ----------------------------------
  // Handles the retrieval of the latest draft picks and draft info
  const { getDraftPicks, getDraftInfo } = useDraftUpdate(
    draftId,
    isDraftActive,
    setDraftPicks,
    setDraftInfo,
    addAlertMessage
  );

  // ---------------------------------- USE EFFECTS ----------------------------
  // Handles de-activating the draft on "complete" status
  useEffect(() => {
    if (draftInfo?.status === "complete") {
      console.log("Draft is completed. De-activating.");

      setIsDraftActive(false);
    }
  }, [draftInfo]);

  // ---------------------------------- RETURN ---------------------------------
  return (
    <Context.Provider
      value={{
        draftId,
        setDraftId,
        draftInfo,
        setDraftInfo,
        draftPicks,
        setDraftPicks,
        isDraftActive,
        setIsDraftActive,
        getDraftInfo,
        getDraftPicks,
        alertMessages,
        setAlertMessages,
        addAlertMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
