import { GitHubLogoIcon } from "@radix-ui/react-icons";

import ThemeToggle from "./change-theme/theme-toggle";
import { Button } from "./ui/button";

export default function Headers() {
	return (
		<nav className="sticky top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
			<div className="h-16 flex items-center justify-between px-16">
				<h1 className="font-bold text-xl">Hotel Keputih</h1>
				<div className="flex items-center gap-4">
					<a href="https://github.com">
						<Button variant="outline" size="icon">
							<GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</a>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}
