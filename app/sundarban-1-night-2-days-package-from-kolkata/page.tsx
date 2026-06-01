import Sundarban1Night from "@/components/sundarban-1-night-2days/Sundarban1Night";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";

export const metadata = {
	title: "Sundarban 1 Night 2 Days Package from Kolkata | Best Weekend Tour",
	description:
		"Book the best Sundarban 1 Night 2 Days Package from Kolkata with boat safari, comfortable accommodation, sightseeing, local cuisine, and guided tours.",
	alternates: {
		canonical: "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata",
	},
	keywords: [
		"Sundarban 1 Night 2 Days Package from Kolkata",
		"Kolkata to Sundarban Tour Package",
		"Sundarban Weekend Tour",
		"1 Night 2 Days Sundarban Tour",
		"Sundarban Travel Package",
		"Sundarban Boat Safari Tour",
		"Sundarban Holiday Package",
	],
};

export default function Page() {
	return (
		<main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
			<Navbar />
			<PageHeader
				title="Sundarban 1 Night 2 Days Package from Kolkata"
				subtitle="Perfect weekend getaway — boat safari, resort stay, meals, and guided excursions"
				backgroundImage="/assets/hero-sundarban.jpg"
			/>
			<Sundarban1Night />
			<Footer />
		</main>
	);
}
