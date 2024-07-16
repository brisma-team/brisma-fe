import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailUserStory = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailUserStory: data,
    detailUserStoryError: error,
    detailUserStoryMutate: mutate,
    detailUserStoryIsLoading: isLoading,
  };
};

export default useDetailUserStory;
