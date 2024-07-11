import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAllUserStories = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/perencanaan/user_stories/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    allUserStories: data,
    allUserStoriesError: error,
    allUserStoriesMutate: mutate,
    allUserStoriesIsLoading: isLoading,
  };
};

export default useAllUserStories;
