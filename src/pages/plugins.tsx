import { PluginCard } from "@/components/plugin-card";
import { useGetSettings } from "@/hooks/settings";
import { mockPlugins } from "@/mock/plugins";

export default function Plugins() {
	const { data } = useGetSettings();

	const isDarkMode = data?.interfaceSettings.darkMode === "dark";

	return (
		<main className="container mx-auto space-y-4 p-4">
			<h1 className="font-bold text-3xl">Plugin List</h1>
			<section className="grid grid-cols-3 gap-4">
				{mockPlugins.map((plugin) => (
					<PluginCard
						binary={plugin.binary}
						dark={isDarkMode}
						fields={plugin.fields}
						info={plugin.info}
						key={plugin.info.name}
					/>
				))}
			</section>
		</main>
	);
}
