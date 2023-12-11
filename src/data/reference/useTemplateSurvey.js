import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

const useTemplateSurvey = (type, code) => {
  let query = "";
  switch (type) {
    case "list":
      query = `/list/${code}`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/template_survey${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    templateSurvey: data,
    templateSurveyError: error,
    templateSurveyMutate: mutate,
    templateSurveyIsLoading: isLoading,
  };
};

export default useTemplateSurvey;
