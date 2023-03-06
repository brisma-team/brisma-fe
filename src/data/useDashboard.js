import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useDashboard(type) {
	const path = `${process.env.NEXT_PUBLIC_API_URL_DASHBOARD}/dashboard?type=${type}`;
	const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

	return {
		dashboard: data,
		dashboardError: error,
		dashboardMutate: mutate,
		dashboardIsLoading: isLoading,
	};
}
