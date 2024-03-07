import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useComment = (id, bab_id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpt/comment/${id}?ref_bab_kkpt_id=${bab_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    commentData: data,
    commentDataError: error,
    commentDataMutate: mutate,
    commentDataIsLoading: isLoading,
  };
};

export default useComment;
