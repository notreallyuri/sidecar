import reactLogo from "./assets/react.svg";
import "./App.css";
import { useGetOnboard } from "./hooks/use-get-onboard";

function App() {
	const { data } = useGetOnboard();

	return (
		<main className="container">
			<h1>Welcome to Tauri + React</h1>

			<div className="row">
				<a href="https://vite.dev" target="_blank">
					<img alt="Vite logo" className="logo vite" src="/vite.svg" />
				</a>
				<a href="https://tauri.app" target="_blank">
					<img alt="Tauri logo" className="logo tauri" src="/tauri.svg" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img alt="React logo" className="logo react" src={reactLogo} />
				</a>
			</div>
			<p>Click on the Tauri, Vite, and React logos to learn more.</p>
			<section>
				<h2>Onboarding Status</h2>
				<div>
					<p>{data?.manifestCreated ? "true" : "false"}</p>
				</div>
			</section>
		</main>
	);
}

export default App;
