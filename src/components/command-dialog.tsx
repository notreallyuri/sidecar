import { Home, type LucideIcon } from "lucide-react";
import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
	CommandDialog as ShadCommandDialog,
} from "@/components/ui/command";

type CommandItemProps = {
	label: string;
	icon: LucideIcon;
	action: () => void;
};

const items: Record<string, CommandItemProps[]> = {
	navigation: [
		{
			label: "Home",
			icon: Home,
			action: () => {
				return;
			},
		},
	],
	settings: [
		{
			label: "Appearance",
			icon: Home,
			action: () => {
				return;
			},
		},
	],
};

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function CommandDialog({ open, onOpenChange }: Props) {
	return (
		<ShadCommandDialog className="dark" onOpenChange={onOpenChange} open={open}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
			</CommandList>
			<CommandGroup>
				{items.navigation.map((item) => (
					<CommandItem key={item.label}>
						<item.icon />
						<span>{item.label}</span>
					</CommandItem>
				))}
			</CommandGroup>
			<CommandSeparator />
			<CommandGroup>
				{items.settings.map((item) => (
					<CommandItem key={item.label}>
						<item.icon />
						<span>{item.label}</span>
						<CommandShortcut>Ctrl+P</CommandShortcut>
					</CommandItem>
				))}
			</CommandGroup>
		</ShadCommandDialog>
	);
}
