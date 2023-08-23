import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useOverviewEWP = (type, params) => {
  let { pages, limit } = params;
  let query = "";
  switch (type) {
    case "all":
      query = `?page=${pages}&limit=${limit}`;
      break;
    case "jadwal_pat":
      query = `/pat_jadwal?tahun=2024`;
      break;
    case "tahun_pat":
      query = `/pat_year`;
      break;
  }

  if (!pages) pages = 1;
  if (!limit) limit = 8;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/ewp/auditor${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    overviewEWP: data,
    overviewEWPError: error,
    overviewEWPMutate: mutate,
    overviewEWPIsLoading: isLoading,
  };
};

export default useOverviewEWP;
