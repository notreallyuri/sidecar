import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<main className="container mx-auto space-y-2 p-4">
			<h1 className="font-bold text-3xl">Home</h1>
			<Card>
				<CardHeader>
					<CardTitle>Welcome to Sidecar</CardTitle>
					<CardDescription>Placeholder description</CardDescription>
				</CardHeader>
				<CardContent className="text-muted-foreground">
					<p>This is the home page. More content coming soon!</p>
				</CardContent>
			</Card>
			<div className="grid grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<CardTitle />
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle />
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle />
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle />
					</CardHeader>
				</Card>
			</div>
		</main>
	);
}
