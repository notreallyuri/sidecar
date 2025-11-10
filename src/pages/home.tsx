import {
	Card,
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
					<CardDescription>
						Easily use terminal commands by adding JSON files in the plugins
						installation folder.
					</CardDescription>
				</CardHeader>
			</Card>
			<div className="grid grid-cols-4 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Simple Install</CardTitle>
						<CardDescription>
							You just need a simple JSON file to setup a plugin.
						</CardDescription>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Simple Interaction</CardTitle>
						<CardDescription>
							After installation, the app will use the JSON as a parameter to
							setup arguments and flags
						</CardDescription>
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
