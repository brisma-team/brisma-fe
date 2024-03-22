import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useTindakLanjutRekomendasi = (id) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_RPM}/rpm/sbp/rekomendasi/details/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    detailRekomendasi: data,
    detailRekomendasiError: error,
    detailRekomendasiMutate: mutate,
    detailRekomendasiIsLoading: isLoading,
  };
};

export default useTindakLanjutRekomendasi;
