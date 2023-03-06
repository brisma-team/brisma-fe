import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useUserSKAI() {
	const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_skai/all`;
	const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

	return {
		userSKAI: data,
		userSKAIError: error,
		userSKAIMutate: mutate,
		userSKAIIsLoading: isLoading,
	};
}
