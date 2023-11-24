import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useCategory = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/kategori_pertanyaan/all/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    category: data,
    categoryError: error,
    categoryMutate: mutate,
    categoryIsLoading: isLoading,
  };
};

export default useCategory;
