import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

export default function useCatalog(type) {
  const path = `${process.env.NEXT_PUBLIC_API_URL_CATALOG}/catalog?type=${type}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    catalogData: data,
    catalogError: error,
    catalogMutate: mutate,
    catalogIsLoading: isLoading,
  };

  //   switch (type) {
  //     case "catalog":
  //       return;
  //     case "ewp":
  //       break;
  //     case "rpm":
  //       break;
  //     default:
  //       break;
  //   }
}
