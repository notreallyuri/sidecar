import { useState } from "react";
import { Outlet } from "react-router";
import { CommandDialog } from "@/components/command-dialog";
import Nav from "@/components/nav";
import { SettingsDialog } from "@/components/settings/dialog-layout";
import WindowHeader from "@/components/window-header";
import { useGetSettings } from "@/hooks/settings";
import { cn } from "@/lib/utils";

export function LayoutBase() {
	const [isCommandDialogOpen, setIsCommandDialogOpen] = useState(false);
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

	const { data } = useGetSettings();

	return (
		<div
			className={cn(
				"h-screen w-screen bg-background font-sans text-foreground",
				data?.interfaceSettings.darkMode === "dark" && "dark"
			)}
		>
			<CommandDialog
				onOpenChange={setIsCommandDialogOpen}
				open={isCommandDialogOpen}
			/>
			<SettingsDialog
				dark={data?.interfaceSettings.darkMode === "dark"}
				onOpenChange={setIsSettingsDialogOpen}
				open={isSettingsDialogOpen}
			/>
			<WindowHeader />
			<Outlet />
			<Nav
				commandAction={() => setIsCommandDialogOpen(true)}
				isCommandActive={isCommandDialogOpen}
				isSettingsActive={isSettingsDialogOpen}
				settingsAction={() => setIsSettingsDialogOpen(true)}
			/>
		</div>
	);
}
