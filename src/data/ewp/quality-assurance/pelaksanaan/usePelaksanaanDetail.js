import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const usePelaksanaanDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/kkpa/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    pelaksanaanDetail: data,
    pelaksanaanDetailError: error,
    pelaksanaanDetailMutate: mutate,
    pelaksanaanDetailIsLoading: isLoading,
  };
};

export default usePelaksanaanDetail;
