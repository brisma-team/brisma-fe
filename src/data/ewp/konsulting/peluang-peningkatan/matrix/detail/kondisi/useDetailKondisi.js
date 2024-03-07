import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailKondisi = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/kondisi/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    kondisiData: data,
    kondisiDataError: error,
    kondisiDataMutate: mutate,
    kondisiDataIsLoading: isLoading,
  };
};

export default useDetailKondisi;
