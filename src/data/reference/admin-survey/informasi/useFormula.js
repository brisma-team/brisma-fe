import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useFormula = ({ id }) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey/formula/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    formulaTemplate: data,
    formulaTemplateError: error,
    formulaTemplateMutate: mutate,
    formulaTemplateIsLoading: isLoading,
  };
};

export default useFormula;
