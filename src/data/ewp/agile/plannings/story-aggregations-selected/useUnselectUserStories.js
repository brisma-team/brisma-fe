import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useUnselectUserStories = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/${id}?is_selected=false`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    unselectUserStories: data,
    unselectUserStoriesError: error,
    unselectUserStoriesMutate: mutate,
    unselectUserStoriesIsLoading: isLoading,
  };
};

export default useUnselectUserStories;
