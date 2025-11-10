import {
	Bell,
	Check,
	Globe,
	Home,
	Keyboard,
	Link,
	Lock,
	type LucideIcon,
	Menu,
	MessageCircle,
	Paintbrush,
	Settings,
	Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "../ui/dialog";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "../ui/sidebar";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	dark: boolean;
};

export function SettingsDialog({ open, onOpenChange, dark }: Props) {
	type SidebarData = {
		name: string;
		icon: LucideIcon;
	};

	const data: Record<string, SidebarData[]> = {
		nav: [
			{ name: "Notifications", icon: Bell },
			{ name: "Navigation", icon: Menu },
			{ name: "Home", icon: Home },
			{ name: "Appearance", icon: Paintbrush },
			{ name: "Messages & media", icon: MessageCircle },
			{ name: "Language & region", icon: Globe },
			{ name: "Accessibility", icon: Keyboard },
			{ name: "Mark as read", icon: Check },
			{ name: "Audio & video", icon: Video },
			{ name: "Connected accounts", icon: Link },
			{ name: "Privacy & visibility", icon: Lock },
			{ name: "Advanced", icon: Settings },
		],
	};

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogContent
				className={cn(
					"overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]",
					dark && "dark"
				)}
			>
				<DialogTitle className="sr-only">Settings</DialogTitle>
				<DialogDescription className="sr-only">
					Customize your settings here
				</DialogDescription>
				<SidebarProvider className="items-start">
					<Sidebar className="hidden md:flex" collapsible="none">
						<SidebarContent>
							<SidebarGroup>
								<SidebarGroupContent>
									<SidebarMenu>
										{data.nav.map((item) => (
											<SidebarMenuItem key={item.name}>
												<SidebarMenuButton
													className="cursor-pointer"
													isActive={item.name === "Messages & media"}
												>
													<item.icon />
													<span>{item.name}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroupContent>
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
					<main className="flex h-[480px] flex-1 flex-col overflow-hidden">
						t
					</main>
				</SidebarProvider>
			</DialogContent>
		</Dialog>
	);
}
