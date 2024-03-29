import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useCommentPAT = (type, params) => {
  const { id, bab } = params;

  let query = ``;
  if (type === "list") {
    query = `?pat_id=${id}&bab=${bab}`;
  } else if (type === "total") {
    query = `/total?pat_id=${id}`;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_PAT}/pat/comment${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    commentPAT: data,
    commentPATError: error,
    commentPATMutate: mutate,
    commentPATIsLoading: isLoading,
  };
};

export default useCommentPAT;
