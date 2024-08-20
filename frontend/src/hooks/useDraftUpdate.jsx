import { useEffect } from "react";
import useFetch from "./useFetch";
import { GET_DRAFT_PICKS_PATH, GET_DRAFT_INFO_PATH } from "../constants/paths";
import { parseDraftPicks, parseDraftInfo } from "../utils/parsers";

const useDraftUpdate = (
  draftId,
  isDraftActive,
  setDraftPicks,
  setDraftInfo,
  addAlertMessage
) => {
  const { handleFetch: fetchDraftInfo } = useFetch();
  const { handleFetch: fetchDraftPicks } = useFetch();

  const getDraftInfo = async () => {
    console.log("Getting Draft Info");

    try {
      const { status, data } = await fetchDraftInfo({
        path: `${GET_DRAFT_INFO_PATH}?draftId=${draftId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status >= 400) {
        addAlertMessage(`Error retrieving draft info: ${data.data}`);
        console.error("Error retrieving draft info:", data.data);

        return {
          status,
          data,
        };
      } else {
        const parsedDraftInfo = parseDraftInfo(data.data);
        setDraftInfo(parsedDraftInfo);

        return {
          status,
          data,
        };
      }
    } catch (e) {
      addAlertMessage(`Error retrieving draft info: ${e.message}`);
      console.error("Error retrieving draft info:", e);
    }
  };

  const getDraftPicks = async () => {
    console.log("Getting Draft Picks");

    try {
      const { status, data } = await fetchDraftPicks({
        path: `${GET_DRAFT_PICKS_PATH}?draftId=${draftId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (status >= 400) {
        addAlertMessage(`Error retrieving draft picks: ${data.data}`);
        console.error("Error retrieving draft picks:", data.data);

        return {
          status,
          data,
        };
      } else {
        const parsedDraftPicks = parseDraftPicks(data.data);
        setDraftPicks(parsedDraftPicks);

        return {
          status,
          data,
        };
      }
    } catch (e) {
      addAlertMessage(`Error retrieving draft picks: ${e.message}`);
      console.error("Error retrieving draft picks:", e);
    }
  };

  useEffect(() => {
    let picksInterval, infoInterval;

    if (draftId && isDraftActive) {
      console.log("Draft is active. Starting updates.");
      // Set up intervals to fetch every 2 seconds
      picksInterval = setInterval(getDraftPicks, 2000);
      infoInterval = setInterval(getDraftInfo, 10000);
    }

    // Cleanup function to clear intervals when isDraftActive changes
    return () => {
      clearInterval(picksInterval);
      clearInterval(infoInterval);
    };
  }, [isDraftActive, draftId]);

  return { getDraftPicks, getDraftInfo };
};

export default useDraftUpdate;
