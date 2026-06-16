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
		<>
			{/* Schema Markup */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@graph": [
							{
								"@type": "WebPage",
								"@id": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata/#webpage",
								"url": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata",
								"name": "Sundarban 1 Night 2 Days Package From Kolkata",
								"headline": "Best Sundarban 1 Night 2 Days Package From Kolkata",
								"description": "Affordable 1 night 2 days Sundarban package from Kolkata including boat safari, meals, sightseeing, resort stay and guided travel experience.",
								"inLanguage": "en-IN",
								"isPartOf": {
									"@id": "https://sundarbanbengaltrip.com/#website"
								},
								"about": {
									"@id": "https://sundarbanbengaltrip.com/#organization"
								},
								"breadcrumb": {
									"@id": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata/#breadcrumb"
								}
							},
							{
								"@type": "TouristTrip",
								"@id": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata/#trip",
								"name": "Sundarban 1 Night 2 Days Package From Kolkata",
								"description": "2 days 1 night Sundarban tour package including resort stay, jungle safari, local sightseeing, meals and boat safari.",
								"image": [
									"https://sundarbanbengaltrip.com/assets/og-image.png"
								],
								"touristType": [
									"Families",
									"Couples",
									"Weekend Travelers",
									"Adventure Travelers"
								],
								"itinerary": [
									"Day 1 - Pickup, transfer, boat safari, sightseeing and resort stay",
									"Day 2 - Sunrise experience, village tour, breakfast and return journey"
								],
								"provider": {
									"@id": "https://sundarbanbengaltrip.com/#organization"
								},
								"offers": {
									"@type": "Offer",
									"priceCurrency": "INR",
									"price": "2499",
									"url": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata"
								}
							},
							{
								"@type": "AggregateRating",
								"ratingValue": "4.9",
								"reviewCount": "154"
							},
							{
								"@type": "Review",
								"author": {
									"@type": "Person",
									"name": "Sayan Ghosh"
								},
								"reviewRating": {
									"@type": "Rating",
									"ratingValue": "5",
									"bestRating": "5"
								},
								"reviewBody": "Perfect short Sundarban trip with peaceful resort stay, tasty food and exciting boat safari."
							},
							{
								"@type": "FAQPage",
								"@id": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata/#faq",
								"mainEntity": [
									{
										"@type": "Question",
										"name": "Is 1 night 2 days enough for Sundarban?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "Yes, a 1 night 2 days package is ideal for experiencing Sundarban sightseeing and boat safari."
										}
									},
									{
										"@type": "Question",
										"name": "What is included in the package?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "The package includes meals, sightseeing, resort stay, transport support and boat safari."
										}
									},
									{
										"@type": "Question",
										"name": "Is pickup available from Kolkata?",
										"acceptedAnswer": {
											"@type": "Answer",
											"text": "Yes, pickup and transport arrangements from Kolkata are available."
										}
									}
								]
							},
							{
								"@type": "BreadcrumbList",
								"@id": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata/#breadcrumb",
								"itemListElement": [
									{
										"@type": "ListItem",
										"position": 1,
										"name": "Home",
										"item": "https://sundarbanbengaltrip.com/"
									},
									{
										"@type": "ListItem",
										"position": 2,
										"name": "Sundarban 1 Night 2 Days Package From Kolkata",
										"item": "https://sundarbanbengaltrip.com/sundarban-1-night-2-days-package-from-kolkata"
									}
								]
							},
							{
								"@type": "ImageObject",
								"contentUrl": "https://sundarbanbengaltrip.com/assets/og-image.png",
								"name": "Sundarban 1 Night 2 Days Tour",
								"description": "Boat safari and resort stay experience in Sundarban."
							}
						]
					})
				}}
			/>
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
		</>
	);
}
