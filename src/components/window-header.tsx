import { Minus, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";

type WindowButtonProps = {
	onClick?: () => void;
	className?: string;
	children: React.ReactNode;
};

function WindowButton({ onClick, children, className }: WindowButtonProps) {
	return (
		<button
			className={cn(
				"flex h-8 w-10 items-center justify-center hover:bg-accent-foreground/25",
				className
			)}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

export default function WindowHeader() {
	return (
		<div className="sticky top-0 flex h-8 w-screen items-center justify-between bg-accent pl-2">
			<h1 className="font-bold">Sidecar</h1>
			<div className="flex">
				<WindowButton>
					<Minus size={16} strokeWidth={2} />
				</WindowButton>
				<WindowButton>
					<Square size={14} strokeWidth={2} />
				</WindowButton>
				<WindowButton className="hover:bg-red-500/60">
					<X size={16} strokeWidth={2.5} />
				</WindowButton>
			</div>
		</div>
	);
}
