import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function usePekerja(pn) {
	const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/search/pekerja/${pn}`;
	const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

	return {
		pekerja: data,
		pekerjaError: error,
		pekerjaMutate: mutate,
		pekerjaIsLoading: isLoading,
	};
}
