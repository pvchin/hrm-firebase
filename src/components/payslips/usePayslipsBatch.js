import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { payslips_url } from "../../utils/constants";
import { filterByPayrun } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPayslips(payrun) {
  const { data } = await axios.get(`${payslips_url}?fv=${payrun}`);
  //const { data } = await axios.get(`${payslips_url}`);
  return data;
}

export function usePayslipsBatch(payrun) {
  const [filter, setFilter] = useState("all");
  const [payrunId, setPayrunId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByPayrun(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: payslips = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.payslips,
    () => getPayslips(payrunId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { payslips, filter, setFilter, setPayrunId };
}
