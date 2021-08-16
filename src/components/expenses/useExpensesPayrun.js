import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { expenses_url } from "../../utils/constants";
import { filterByPayrun } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExpensesPayrun(payrun) {
  const { data } = await axios.get(`${expenses_url}?pr=${payrun}`);
  //const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useExpensesPayrun(payrun) {
  const [filter, setFilter] = useState("all");
  const [exppayrunId, setExpPayrunId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByPayrun(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: expenses = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.expenses_payrun,
    () => getExpensesPayrun(exppayrunId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { expenses, filter, setFilter, setExpPayrunId };
}
