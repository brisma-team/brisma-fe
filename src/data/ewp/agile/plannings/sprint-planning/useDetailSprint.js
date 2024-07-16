import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailSprint = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/sprint/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailSprint: data,
    detailSprintError: error,
    detailSprintMutate: mutate,
    detailSprintIsLoading: isLoading,
  };
};

export default useDetailSprint;
