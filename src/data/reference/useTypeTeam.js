import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useTypeTeam = (type) => {
  let query = "";
  switch (type) {
    case "all":
      query = `/all`;
      break;
  }
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/mtd_tipe_tim${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    typeTeam: data,
    typeTeamError: error,
    typeTeamMutate: mutate,
    typeTeamIsLoading: isLoading,
  };
};

export default useTypeTeam;
