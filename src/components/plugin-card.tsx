"use client";

import {
	CheckSquare,
	ChevronDown,
	ExternalLink,
	FileText,
	type LucideIcon,
	Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { AppPlugin, FieldType } from "@/types/plugins";

const fieldTypeIcons: Record<FieldType, LucideIcon> = {
	text: FileText,
	file: Upload,
	select: ChevronDown,
	checkbox: CheckSquare,
} as const;

export function PluginCard({
	info,
	fields,
	binary,
	dark,
}: AppPlugin & { dark: boolean }) {
	return (
		<Card className="group hover:-translate-y-0.5 relative transition-all duration-200 hover:border-primary/50 hover:shadow-lg">
			<CardHeader className="space-y-4">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0 flex-1 space-y-2">
						<div className="flex items-center gap-2">
							<CardTitle className="text-xl leading-tight">
								{info.name}
							</CardTitle>
							<PluginDialog
								binary={binary}
								dark={dark}
								fields={fields}
								info={info}
							/>
						</div>
						<CardDescription className="line-clamp-2 text-sm leading-relaxed">
							{info.description || "No description provided"}
						</CardDescription>
					</div>
					<Badge className="shrink-0 font-mono" variant="secondary">
						v{info.version}
					</Badge>
				</div>
			</CardHeader>
			<CardFooter className="">
				<div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
					{info.author && (
						<Badge>
							<span>{info.author}</span>
						</Badge>
					)}
					<Badge variant="secondary">
						<span>{fields.length}</span> field{fields.length !== 1 ? "s" : ""}
					</Badge>
				</div>
				<Button>Access</Button>
			</CardFooter>
		</Card>
	);
}

export function PluginDialog({
	info,
	binary,
	fields,
	dark,
}: AppPlugin & { dark: boolean }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="cursor-pointer" size="icon" variant="ghost">
					<ExternalLink className="h-4 w-4 shrink-0" />
				</Button>
			</DialogTrigger>

			<DialogContent
				className={cn(
					"max-h-[90vh] w-7xl min-w-5xl overflow-y-auto text-primary",
					dark && "dark"
				)}
			>
				<DialogHeader>
					<div className="flex-1 space-y-2">
						<div className="flex items-center gap-6">
							<DialogTitle className="text-2xl leading-tight">
								{info.name}
							</DialogTitle>
							<Badge
								className="h-fit shrink-0 px-2 py-0.5 font-mono"
								variant="secondary"
							>
								v{info.version}
							</Badge>
						</div>
						<DialogDescription className="text-base leading-relaxed">
							{info.description || "No description provided"}
						</DialogDescription>
					</div>
				</DialogHeader>

				<div className="grid grid-cols-2 gap-4 pt-4">
					<div className="space-y-3">
						<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
							Plugin Information
						</h3>
						<div className="grid gap-4 rounded-lg border bg-muted/30 p-4">
							<div className="grid grid-cols-2 gap-4">
								{info.author && (
									<div className="space-y-1.5">
										<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
											Author
										</p>
										<p className="font-medium text-sm">{info.author}</p>
									</div>
								)}
								<div className="space-y-1.5">
									<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
										Version
									</p>
									<p className="font-medium font-mono text-sm">
										{info.version}
									</p>
								</div>
							</div>
							<div className="space-y-1.5">
								<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
									Binary Path
								</p>
								<code className="block break-all rounded border bg-background px-3 py-2 font-mono text-sm">
									{binary}
								</code>
							</div>
						</div>
					</div>

					{fields.length > 0 && (
						<div className="space-y-3">
							<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
								Configuration Fields
								<span className="ml-2 font-normal">({fields.length})</span>
							</h3>
							<div className="space-y-2.5">
								{fields.map((field, index) => {
									const Icon = fieldTypeIcons[field.type];
									return (
										<div
											className="flex items-start gap-3 rounded-lg border bg-card/50 p-4 transition-colors hover:bg-card"
											key={`${field.label}-${index}`}
										>
											{Icon && (
												<div className="shrink-0 rounded-md bg-muted p-2">
													<Icon className="h-4 w-4 text-muted-foreground" />
												</div>
											)}
											<div className="min-w-0 flex-1 space-y-2.5">
												<div className="flex flex-wrap items-center gap-2">
													<span className="font-medium text-base">
														{field.label}
													</span>
													<Badge
														className="font-mono text-xs"
														variant="outline"
													>
														{field.type}
													</Badge>
													{field.flag && (
														<code className="rounded bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
															{field.flag}
														</code>
													)}
												</div>
												{field.options && field.options.length > 0 && (
													<div className="space-y-2">
														<p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
															Available Options
														</p>
														<div className="flex flex-wrap gap-1.5">
															{field.options.map((option) => (
																<Badge
																	className="font-normal text-xs"
																	key={option}
																	variant="secondary"
																>
																	{option}
																</Badge>
															))}
														</div>
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
