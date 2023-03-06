import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUserSKAIDetail(pn) {
	const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/detail/${pn}`;
	const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

	return {
		userSKAIDetail: data,
		userSKAIDetailError: error,
		userSKAIDetailMutate: mutate,
		userSKAIDetailIsLoading: isLoading,
	};
}
