import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailSebab = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/sebab/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    sebabData: data,
    sebabDataError: error,
    sebabDataMutate: mutate,
    sebabDataIsLoading: isLoading,
  };
};

export default useDetailSebab;
