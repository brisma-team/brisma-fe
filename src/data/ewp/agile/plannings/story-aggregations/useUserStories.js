import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useUserStories = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    userStories: data,
    userStoriesError: error,
    userStoriesMutate: mutate,
    userStoriesIsLoading: isLoading,
  };
};

export default useUserStories;
