import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useDetailSurat = (id) => {
	console.log(id);
	const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/surat_dio/${id}`;
	const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

	return {
		suratDio: data,
		suratDioError: error,
		suratDioMutate: mutate,
		suratDioIsLoading: isLoading,
	};
};

export default useDetailSurat;
