import HeaderSection from "./components/display/header";
import Navbar from "./components/navbar";
import TableSection from "./components/table/table";
import { Toaster } from "./components/ui/toaster";

function App() {
	return (
		<>
			<Toaster />
			<Navbar />
			<div className="px-16 pb-11 border mx-16 mt-10 rounded-lg mb-10">
				<HeaderSection />
				<TableSection />
			</div>
		</>
	);
}

export default App;
