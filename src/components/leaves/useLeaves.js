import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { leaves_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getLeaves(leaveId, leaveYr) {
  
  if (leaveYr) {
      const { data } = await axios.get(`${leaves_url}?fv=${leaveId}&y=${leaveYr}`);
      return data
    } else {
      const {data} = await axios.get(`${leaves_url}?fid=${leaveId}`);
      return data
  }
  
}

export function useLeaves(empid) {
  const [filter, setFilter] = useState("all");
  const [leaveId, setLeaveId] = useState("");
  const [leaveYr, setLeaveYr] = useState("")

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: leaves = fallback } = useQuery(
    [queryKeys.leaves, leaveId, leaveYr ],
    //queryKeys.leaves,
    () => getLeaves(leaveId, leaveYr),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { leaves, filter, setFilter, setLeaveId, setLeaveYr };
}
