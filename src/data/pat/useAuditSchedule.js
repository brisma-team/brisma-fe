import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAuditSchedule = (type, params) => {
  let { id, jadwal_id, pages, limit } = params;

  if (!pages) pages = 1;
  if (!limit) limit = 8;
  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${pages}`;
      break;
    case "detail":
      query = `?pat_id=${id}&jadwal_id=${jadwal_id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/audit${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    auditSchedule: data,
    auditScheduleError: error,
    auditScheduleMutate: mutate,
    auditScheduleIsLoading: isLoading,
  };
};

export default useAuditSchedule;
