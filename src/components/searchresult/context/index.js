import React from "react";

import { SavedJob } from "../../../temp/samplelistjobdata";

const StateContext = React.createContext();

function StateProvider({ children }) {
  const [savedJobs, setSaveJobs] = React.useState(SavedJob);

  const contextValue = React.useMemo(
    () => ({ savedJobs, setSaveJobs }),
    [savedJobs, setSaveJobs]
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
}

const useJobsState = () => React.useContext(StateContext);

export { StateProvider, useJobsState };
