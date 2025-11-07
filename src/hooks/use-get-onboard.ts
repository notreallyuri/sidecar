import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { OnboardResult } from "@/types/settings";

export const useGetOnboard = () =>
	useQuery<OnboardResult>({
		queryKey: ["get-onboard"],
		queryFn: async () => {
			const result = await invoke<OnboardResult>("onboard");
			return result;
		},
	});
