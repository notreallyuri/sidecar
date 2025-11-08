import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { AppSettings } from "@/types/settings";

export const useGetSettings = () =>
	useQuery({
		queryKey: ["get-settings"],
		queryFn: async () => {
			const res: AppSettings = await invoke("load_settings");
			return res;
		},
	});

export const useUpdateSettings = () => {
	const client = useQueryClient();

	return useMutation({
		mutationKey: ["update-settings"],
		mutationFn: async (newSettings: Partial<AppSettings>) => {
			const previousSettings = await invoke<AppSettings>("load_settings");

			const updatedSettings = { ...previousSettings, ...newSettings };

			await invoke("save_settings", { updatedSettings });
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ["get-settings"] });
		},
	});
};

export const useResetSettings = () => {
	const client = useQueryClient();

	return useMutation({
		mutationKey: ["reset-settings"],
		mutationFn: async () => {
			await invoke("reset_settings");
		},
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ["get-settings"] });
		},
	});
};
