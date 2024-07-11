import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useSelectUserStories = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/${id}?is_selected=true`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    selectUserStories: data,
    selectUserStoriesError: error,
    selectUserStoriesMutate: mutate,
    selectUserStoriesIsLoading: isLoading,
  };
};

export default useSelectUserStories;
