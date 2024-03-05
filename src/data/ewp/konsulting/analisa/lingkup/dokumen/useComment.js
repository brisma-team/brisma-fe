import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useComment = ({ id, bab }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/comment/${id}?ref_bab_kkpa_id=${bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    comment: data,
    commentError: error,
    commentMutate: mutate,
    commentIsLoading: isLoading,
  };
};

export default useComment;
