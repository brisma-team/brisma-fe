import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWrapup = (params) => {
  const { id, start_date, end_date, uploader, doc_name } = params;
  const path = `${
    process.env.NEXT_PUBLIC_API_URL_EWP
  }/ewp/sbp/wrapup/all/${id}?start_date=${start_date || ""}&end_date=${
    end_date || ""
  }&uploader=${uploader?.pn || ""}&doc_name=${doc_name}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    wrapup: data,
    wrapupError: error,
    wrapupMutate: mutate,
    wrapupIsLoading: isLoading,
  };
};

export default useWrapup;
