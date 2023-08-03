import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useActivityScheduleOther = (type, params) => {
  let { id, kegiatan_lain_id, pages, limit } = params;

  if (!pages) pages = 1;
  if (!limit) limit = 8;
  let query = "";
  switch (type) {
    case "all":
      query = `/all?pat_id=${id}&page=${pages}`;
      break;
    case "detail":
      query = `?pat_id=${id}&kegiatan_lain_id=${kegiatan_lain_id}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/lain${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    activityScheduleOther: data,
    activityScheduleOtherError: error,
    activityScheduleOtherMutate: mutate,
    activityScheduleOtherIsLoading: isLoading,
  };
};

export default useActivityScheduleOther;
