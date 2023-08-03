import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useActivitySchedule = (type, params) => {
  let { id, jadwal_sbp_id, pages, limit } = params;

  if (!pages) pages = 1;
  if (!limit) limit = 8;
  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${pages}`;
      break;
    case "detail":
      query = `?pat_id=${id}&jadwal_sbp_id=${jadwal_sbp_id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/sbp${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    activitySchedule: data,
    activityScheduleError: error,
    activityScheduleMutate: mutate,
    activityScheduleIsLoading: isLoading,
  };
};

export default useActivitySchedule;
