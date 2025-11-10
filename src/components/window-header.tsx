import { platform } from "@tauri-apps/plugin-os";
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
				"flex h-8 w-10 items-center justify-center transition-colors hover:bg-accent-foreground/25",
				className
			)}
			onClick={onClick}
			type="button"
		>
			{children}
		</button>
	);
}

function WindowControls({ reverse }: { reverse?: boolean }) {
	if (reverse) {
		return (
			<>
				<div className="flex size-3 items-center justify-center rounded-full bg-red-400 text-red-900 hover:bg-red-400/75" />
				<div className="flex size-3 items-center justify-center rounded-full bg-amber-400 text-amber-900 hover:bg-amber-400/75" />
				<div className="flex size-3 items-center justify-center rounded-full bg-green-400 text-green-900 hover:bg-green-400/75" />
			</>
		);
	}

	return (
		<>
			<WindowButton>
				<Minus size={16} strokeWidth={2} />
			</WindowButton>
			<WindowButton>
				<Square size={14} strokeWidth={2} />
			</WindowButton>
			<WindowButton className="hover:bg-red-500/60">
				<X size={16} strokeWidth={2.5} />
			</WindowButton>
		</>
	);
}

export default function WindowHeader() {
	const os = platform();

	const isMac = os === "macos";
	const isLinux = os === "linux";
	const isWindows = os === "windows";

	return (
		<div
			className={cn(
				"sticky top-0 flex h-8 w-screen items-center bg-accent",
				isMac || isLinux ? "justify-start gap-2" : "justify-between pl-2"
			)}
		>
			{(isMac || isLinux) && (
				<div className="flex items-center gap-2 px-2">
					<WindowControls reverse />
				</div>
			)}

			<h1
				className={cn(
					"select-none font-bold",
					isMac || isLinux ? "-translate-x-1/2 absolute left-1/2" : ""
				)}
			>
				Sidecar
			</h1>

			{isWindows && (
				<div className="flex">
					<WindowControls />
				</div>
			)}
		</div>
	);
}
