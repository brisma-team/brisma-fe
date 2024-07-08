import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useComment = (params) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/${params?.sub_module}/comment/${params?.id}?ref_bab_mapa_init_id=${params?.bab}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    comment: data,
    commentError: error,
    commentMutate: mutate,
    commentIsLoading: isLoading,
  };
};

export default useComment;
