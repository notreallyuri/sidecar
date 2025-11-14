import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { Download, Loader2, Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { YouTube } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ProgressPayload = {
	progress?: {
		status: string;
		percentage?: number;
		filename?: string;
	};
	done?: boolean;
	error?: string;
};

export default function Home() {
	const [url, setUrl] = useState("");
	const [logs, setLogs] = useState<string[]>([]);
	const [progressStr, setProgressStr] = useState("0%");
	const [progressValue, setProgressValue] = useState(0);
	const [isDownloading, setIsDownloading] = useState(false);

	const logEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		logEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		const unlistenPromise = listen<ProgressPayload>(
			"download-progress",
			(event) => {
				const payload = event.payload;
				console.log(payload);
				if (payload.error) {
					setLogs((prev) => [...prev, `❌ Error: ${payload.error}`]);
					setIsDownloading(false);
				}

				if (payload.done) {
					setLogs((prev) => [...prev, "✅ Download Complete!"]);
					setProgressValue(100);
					setProgressStr("100%");
					setIsDownloading(false);
				}

				if (payload.progress) {
					const percent = payload.progress.percentage || 0;

					setProgressValue(percent);
					setProgressStr(`${percent}%`);

					if (percent === 0 || percent % 10 < 1) {
						setLogs((prev) => [
							...prev,
							`${payload.progress?.filename} > ${percent}% - ${payload.progress?.status}`,
						]);
					}
				}
			}
		);

		return () => {
			unlistenPromise.then((unlisten) => unlisten());
		};
	}, []);

	const handleDownload = async () => {
		if (!url) {
			return;
		}

		setLogs(["Initializing download process..."]);
		setProgressStr("0%");
		setProgressValue(0);
		setIsDownloading(true);

		try {
			await invoke("download_youtube", { url });
		} catch (err) {
			console.error(err);
			setLogs((prev) => [...prev, `❌ System Error: ${err}`]);
			setIsDownloading(false);
		}
	};

	return (
		<div className="dark flex min-h-screen items-center justify-center bg-background p-4">
			<Card className="w-full max-w-2xl shadow-lg">
				<CardHeader>
					<div className="flex items-center gap-2">
						<YouTube className="h-6 w-6 text-red-600" />
						<CardTitle>Media Downloader</CardTitle>
					</div>
					<CardDescription>
						Download videos locally using the power of Python & Rust.
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="flex flex-col gap-2">
						<Label htmlFor="url">Video URL</Label>
						<div className="flex gap-2">
							<Input
								className="font-mono text-sm"
								disabled={isDownloading}
								id="url"
								onChange={(e) => setUrl(e.target.value)}
								placeholder="https://www.youtube.com/watch?v=..."
								value={url}
							/>
							<Button
								className="min-w-[140px]"
								disabled={isDownloading || !url}
								onClick={handleDownload}
							>
								{isDownloading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Working...
									</>
								) : (
									<>
										<Download className="mr-2 h-4 w-4" />
										Download
									</>
								)}
							</Button>
						</div>
					</div>

					{/* Progress Section */}
					<div className="space-y-1">
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>Progress</span>
							<span>{progressStr}</span>
						</div>
						<Progress className="h-2" value={progressValue} />
					</div>

					{/* Terminal/Logs Section */}
					<div className="space-y-2">
						<div className="flex items-center gap-2 font-semibold text-muted-foreground text-sm">
							<Terminal className="h-4 w-4" />
							<span>Output Log</span>
						</div>
						<ScrollArea className="h-48 w-full rounded-md border bg-background p-2">
							<div className="flex flex-col gap-1 font-mono text-green-500 text-xs">
								{logs.length === 0 && (
									<span className="text-zinc-500 italic">
										Ready to start...
									</span>
								)}
								{logs.map((log) => (
									<div className="break-all" key={log}>
										<span className="mr-2 opacity-50">
											{new Date().toLocaleTimeString([], { hour12: false })}
										</span>
										{log}
									</div>
								))}
								<div ref={logEndRef} />
							</div>
						</ScrollArea>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
