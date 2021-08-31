import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllows(payrunid) {
  const { data } = await axios.get(`${dailyallowances_url}?fv=${payrunid}`);
  //const { data } = await axios.get(`${dailyallowances_url}`);
  return data;
}

export function useDailyAllowsBatch(empid) {
  const [filter, setFilter] = useState("all");
  const [dailyAllowsPayrunId, setDailyAllowsPayrunId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallowsbatch = fallback } = useQuery(
    [queryKeys.dailyallowsbatch, dailyAllowsPayrunId],
    //queryKeys.dailyallows,
    () => getDailyAllows(dailyAllowsPayrunId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { dailyallowsbatch, filter, setFilter, setDailyAllowsPayrunId };
}
