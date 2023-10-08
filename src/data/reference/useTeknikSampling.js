import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useTeknikSampling(type) {
  let query = "";
  switch (type) {
    case "all":
      query = `/all`;
      break;
  }

  const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/stc_teknik_sampling${query}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    teknikSampling: data,
    teknikSamplingError: error,
    teknikSamplingMutate: mutate,
    teknikSamplingIsLoading: isLoading,
  };
}
