import { Blocks, Command, Home, type LucideIcon, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

type ButtonAction = string | (() => void);

type NavButtons = {
	label: string;
	action: ButtonAction;
	icon: LucideIcon;
	isActive: boolean;
};

function NavButton({ label, action, icon: Icon, isActive }: NavButtons) {
	return (
		<Tooltip>
			<TooltipTrigger>
				{typeof action === "string" ? (
					<Button
						asChild
						className={cn("cursor-pointer rounded-lg", isActive && "bg-accent")}
						variant="ghost"
					>
						<Link to={action}>
							<Icon />
						</Link>
					</Button>
				) : (
					<Button
						className={cn("cursor-pointer rounded-lg", isActive && "bg-accent")}
						onClick={action}
						variant="ghost"
					>
						<Icon />
					</Button>
				)}
			</TooltipTrigger>
			<TooltipContent>{label}</TooltipContent>
		</Tooltip>
	);
}

type Props = {
	commandAction: () => void;
	settingsAction: () => void;
	isCommandActive: boolean;
	isSettingsActive: boolean;
};

export default function Nav({
	commandAction,
	settingsAction,
	isCommandActive,
	isSettingsActive,
}: Props) {
	const { pathname } = useLocation();

	const navButtons: NavButtons[] = [
		{
			label: "Home",
			action: "/",
			icon: Home,
			isActive: pathname === "/",
		},
		{
			label: "Plugins",
			action: "/plugins",
			icon: Blocks,
			isActive: pathname.startsWith("/plugins"),
		},
		{
			label: "Command",
			action: commandAction,
			icon: Command,
			isActive: isCommandActive,
		},
		{
			label: "Settings",
			action: settingsAction,
			icon: Settings,
			isActive: isSettingsActive,
		},
	];

	return (
		<nav
			className={cn(
				"-translate-x-1/2 absolute bottom-10 left-1/2 flex gap-4",
				"rounded-lg border border-sidebar-border bg-sidebar/25 p-2"
			)}
		>
			<TooltipProvider>
				{navButtons.map((item) => (
					<NavButton
						action={item.action}
						icon={item.icon}
						isActive={item.isActive}
						key={item.label}
						label={item.label}
					/>
				))}
			</TooltipProvider>
		</nav>
	);
}
