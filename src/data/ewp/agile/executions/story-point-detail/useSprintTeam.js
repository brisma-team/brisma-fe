import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSprintTeam = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/pelaksanaan/sprint/tim/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sprintTeam: data,
    sprintTeamError: error,
    sprintTeamMutate: mutate,
    sprintTeamIsLoading: isLoading,
  };
};

export default useSprintTeam;
