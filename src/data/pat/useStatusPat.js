import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useStatusPat = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/auditors/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    statusPat: data,
    statusPatError: error,
    statusPatMutate: mutate,
    statusPatIsLoading: isLoading,
  };
};

export default useStatusPat;
