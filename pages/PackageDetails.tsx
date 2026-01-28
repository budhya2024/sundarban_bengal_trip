import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { PopularPackagesSection } from "@/components/PopularPackagesSection";
import { Button } from "@/components/ui/button";
import {
  Check,
  Clock,
  Users,
  MapPin,
  Calendar,
  Star,
  ArrowLeft,
} from "lucide-react";
import tourAdventure from "@/assets/tour-adventure.jpg";
import tourPremium from "@/assets/tour-premium.jpg";
import tourBudget from "@/assets/tour-budget.jpg";

const packageData = {
  "day-trip": {
    title: "Day Trip Package",
    subtitle: "Quick 1-Day Safari Experience",
    duration: "1 Day",
    groupSize: "Up to 15 people",
    location: "Sajnekhali & Sudhanyakhali",
    price: "₹2,500",
    rating: 4.6,
    image: tourBudget,
    description:
      "Sundarban day trip is the most familiar Sundarban Bengal Trip package now. Tourists are enjoying a lot in this package. But it is very top to cover all sightseeing. Some logical reason for Sundarban Bengal Trip.",
    summary:
      "1 day in Mangrove, Boat safari experience, Pick up & Drop from Kolkata to Kolkata, Tour cost per person Rs. 2500 (No hidden cost)",
    highlights: [
      "Early morning departure from Kolkata",
      "Boat safari through main channels",
      "Visit Sajnekhali Watch Tower",
      "Spot deer, crocodiles, and birds",
      "Traditional Bengali lunch included",
      "Return by evening",
    ],
    timeline: [
      {
        day: "Day 1",
        title: "1st day in Sundarban",
        activities: [
          {
            time: "5:00 AM",
            title: "Start from Kolkata",
            description:
              "Pickup from designated location (Science City/Indian Museum main gate)",
          },
          {
            time: "8:00 AM",
            title: "Arrive at Godkhali Jetty",
            description:
              "The beautiful landscape covered with yellowish paddy fields, mud house, ponds. Three hours drive to Godkhali with tea break on the way.",
          },
          {
            time: "9:00 AM",
            title: "Board Boat & Begin Safari",
            description:
              "Start your mangrove adventure on a comfortable boat through the main channels",
          },
          {
            time: "11:00 AM",
            title: "Visit Sajnekhali Watch Tower",
            description:
              "Explore the famous watch tower and spot wildlife including deer, crocodiles, and various bird species",
          },
          {
            time: "1:00 PM",
            title: "Lunch on Boat",
            description:
              "Enjoy traditional Bengali lunch while cruising through the mangroves",
          },
          {
            time: "2:30 PM",
            title: "Continue Safari",
            description: "Afternoon safari session through different channels",
          },
          {
            time: "4:30 PM",
            title: "Begin Return Journey",
            description: "Start journey back to Kolkata",
          },
          {
            time: "8:00 PM",
            title: "Drop at Kolkata",
            description: "Arrive back at your pickup point",
          },
        ],
      },
    ],
    includes: [
      "AC transport",
      "Boat safari",
      "Forest permits",
      "Lunch",
      "Guide",
    ],
    excludes: ["Camera fees", "Personal expenses", "Tips"],
  },
  weekend: {
    title: "Weekend Getaway",
    subtitle: "2 Days / 1 Night Adventure",
    duration: "2 Days / 1 Night",
    groupSize: "Up to 12 people",
    location: "Core Sundarban Zone",
    price: "₹5,500",
    rating: 4.8,
    image: tourAdventure,
    description:
      "Sundarban Bengal Trip 1 night 2 days is the most familiar Sundarban Bengal Trip package now. Tourists are enjoying a lot in this package. But it is very top to cover all sightseeing. Some logical reason for Sundarban Bengal Trip.",
    summary:
      "2 days in Mangrove, Night stay at resort/Hotel/Cottage, Pick up & Drop from Kolkata to Kolkata, Tour cost per person Rs. 5500 (No hidden cost)",
    highlights: [
      "Overnight stay on houseboat",
      "Multiple boat safaris",
      "Visit 3-4 watch towers",
      "Sunset cruise included",
      "All meals provided",
      "Expert naturalist guide",
    ],
    timeline: [
      {
        day: "Day 1",
        title: "1st day in Sundarban",
        activities: [
          {
            time: "5:00 AM",
            title: "Start from Kolkata",
            description:
              "Pickup from designated location at Indian Museum (main gate)/Science City",
          },
          {
            time: "8:30 AM",
            title: "Journey to Godkhali",
            description:
              "The beautiful landscape covered with yellowish paddy fields, mud house, ponds. Three hours and a half drive to Godkhali. Tea Break on the way.",
          },
          {
            time: "9:30 AM",
            title: "Board Houseboat",
            description: "Check-in to your comfortable houseboat accommodation",
          },
          {
            time: "10:00 AM",
            title: "First Safari Session",
            description: "Morning boat safari through the core zone channels",
          },
          {
            time: "1:00 PM",
            title: "Lunch & Rest",
            description:
              "Delicious Bengali lunch on the houseboat followed by rest",
          },
          {
            time: "4:00 PM",
            title: "Evening Safari & Sunset",
            description:
              "Evening safari with beautiful sunset views over the mangroves",
          },
          {
            time: "8:00 PM",
            title: "Dinner & Overnight",
            description:
              "Traditional dinner and overnight stay on the houseboat",
          },
        ],
      },
      {
        day: "Day 2",
        title: "2nd day in Sundarban",
        activities: [
          {
            time: "6:00 AM",
            title: "Morning Safari",
            description:
              "Early morning safari for best wildlife spotting opportunities",
          },
          {
            time: "10:00 AM",
            title: "Breakfast & Checkout",
            description: "Hearty breakfast and checkout from houseboat",
          },
          {
            time: "11:00 AM",
            title: "Return Journey Begins",
            description: "Start journey back to Kolkata",
          },
          {
            time: "4:00 PM",
            title: "Arrive Kolkata",
            description: "Drop at your designated pickup point",
          },
        ],
      },
    ],
    includes: [
      "AC transport",
      "Houseboat stay",
      "All meals",
      "2 safaris",
      "Permits",
      "Guide",
    ],
    excludes: ["Camera fees", "Alcoholic beverages", "Tips"],
  },
  premium: {
    title: "Premium Safari",
    subtitle: "3 Days / 2 Nights Luxury Tour",
    duration: "3 Days / 2 Nights",
    groupSize: "Up to 8 people",
    location: "Deep Sundarban Reserve",
    price: "₹12,000",
    rating: 4.9,
    image: tourPremium,
    description:
      "The ultimate Sundarbans experience with luxury accommodation, private boat, gourmet meals, and access to remote areas for the best tiger spotting opportunities.",
    summary:
      "3 days in Mangrove, Luxury houseboat with AC cabins, Private boat, Gourmet Bengali cuisine, Pick up & Drop from Kolkata, Tour cost per person Rs. 12000 (No hidden cost)",
    highlights: [
      "Luxury houseboat with AC cabins",
      "Private boat for your group",
      "Deep forest exploration",
      "4+ boat safaris",
      "Village cultural visit",
      "Gourmet Bengali cuisine",
    ],
    timeline: [
      {
        day: "Day 1",
        title: "1st day in Sundarban",
        activities: [
          {
            time: "6:00 AM",
            title: "Premium Pickup from Kolkata",
            description: "Comfortable AC vehicle pickup from your location",
          },
          {
            time: "10:00 AM",
            title: "Board Luxury Houseboat",
            description: "Welcome drink and check-in to premium AC cabins",
          },
          {
            time: "11:00 AM",
            title: "First Safari to Sajnekhali",
            description:
              "Visit the famous Sajnekhali watch tower and wildlife museum",
          },
          {
            time: "1:30 PM",
            title: "Gourmet Lunch",
            description: "Authentic Bengali cuisine prepared by expert chefs",
          },
          {
            time: "5:00 PM",
            title: "Sunset Cruise with Snacks",
            description: "Relaxing evening cruise with tea and snacks",
          },
          {
            time: "8:00 PM",
            title: "Dinner & Entertainment",
            description: "Special dinner with local folk performances",
          },
        ],
      },
      {
        day: "Day 2",
        title: "2nd day in Sundarban",
        activities: [
          {
            time: "5:30 AM",
            title: "Early Morning Safari",
            description: "Best time for tiger and wildlife spotting",
          },
          {
            time: "9:00 AM",
            title: "Breakfast",
            description: "Hearty breakfast on the boat",
          },
          {
            time: "12:00 PM",
            title: "Visit to Local Village",
            description:
              "Experience local culture and honey collection demonstration",
          },
          {
            time: "1:30 PM",
            title: "Lunch",
            description: "Fresh seafood and Bengali delicacies",
          },
          {
            time: "4:00 PM",
            title: "Deep Forest Safari",
            description: "Explore remote areas of the reserve",
          },
          {
            time: "8:00 PM",
            title: "Candlelight Dinner",
            description: "Special dinner under the stars",
          },
        ],
      },
      {
        day: "Day 3",
        title: "3rd day in Sundarban",
        activities: [
          {
            time: "6:00 AM",
            title: "Final Safari",
            description: "Last chance for wildlife photography",
          },
          {
            time: "9:00 AM",
            title: "Breakfast",
            description: "Final breakfast on the boat",
          },
          {
            time: "11:00 AM",
            title: "Brunch & Checkout",
            description: "Farewell brunch and checkout",
          },
          {
            time: "12:00 PM",
            title: "Return Journey",
            description: "Start journey back to Kolkata",
          },
          {
            time: "5:00 PM",
            title: "Arrive Kolkata",
            description: "Drop at your location",
          },
        ],
      },
    ],
    includes: [
      "Luxury AC transport",
      "Premium houseboat",
      "All gourmet meals",
      "4 safaris",
      "Permits",
      "Expert naturalist",
      "Village tour",
    ],
    excludes: ["Camera fees", "Personal shopping", "Tips"],
  },
  adventure: {
    title: "Adventure Expedition",
    subtitle: "4 Days / 3 Nights Expedition",
    duration: "4 Days / 3 Nights",
    groupSize: "Up to 6 people",
    location: "Remote Sundarban Areas",
    price: "₹18,000",
    rating: 5.0,
    image: tourAdventure,
    description:
      "For serious wildlife enthusiasts. This expedition takes you to the most remote areas of Sundarbans with maximum safari time and best chances of tiger sightings.",
    summary:
      "4 days in Mangrove, Access to restricted zones, Night safari experience, Camping on secluded island, Expert wildlife photographer guide, Tour cost per person Rs. 18000 (No hidden cost)",
    highlights: [
      "Access to restricted zones",
      "6+ boat safaris",
      "Night safari experience",
      "Photography-focused itinerary",
      "Camping on secluded island",
      "Expert wildlife photographer guide",
    ],
    timeline: [
      {
        day: "Day 1",
        title: "1st day - Arrival & Orientation",
        activities: [
          {
            time: "5:00 AM",
            title: "Departure from Kolkata",
            description: "Early morning pickup for the adventure",
          },
          {
            time: "9:30 AM",
            title: "Arrive Sundarbans",
            description: "Board expedition boat and orientation briefing",
          },
          {
            time: "11:00 AM",
            title: "First Safari",
            description: "Initial exploration of the mangrove channels",
          },
          {
            time: "2:00 PM",
            title: "Lunch & Photography Session",
            description: "Lunch followed by bird photography tips",
          },
          {
            time: "4:00 PM",
            title: "Evening Safari",
            description: "Golden hour photography safari",
          },
          {
            time: "8:00 PM",
            title: "Dinner & Night Briefing",
            description: "Prepare for tomorrow's deep exploration",
          },
        ],
      },
      {
        day: "Day 2",
        title: "2nd day - Netidhopani & Dobanki",
        activities: [
          {
            time: "5:00 AM",
            title: "Dawn Safari",
            description: "Best time for tiger tracking",
          },
          {
            time: "8:00 AM",
            title: "Breakfast",
            description: "Energy-packed breakfast",
          },
          {
            time: "10:00 AM",
            title: "Netidhopani Exploration",
            description: "Visit the ancient temple ruins and watch tower",
          },
          {
            time: "1:00 PM",
            title: "Lunch",
            description: "Packed lunch in the wilderness",
          },
          {
            time: "3:00 PM",
            title: "Dobanki Canopy Walk",
            description: "Experience the unique canopy walkway",
          },
          {
            time: "6:00 PM",
            title: "Sunset Photography",
            description: "Capture the magical sunset",
          },
        ],
      },
      {
        day: "Day 3",
        title: "3rd day - Remote Exploration & Night Safari",
        activities: [
          {
            time: "5:00 AM",
            title: "Remote Area Safari",
            description: "Access restricted zones for serious wildlife viewing",
          },
          {
            time: "10:00 AM",
            title: "Island Camping Setup",
            description: "Set up camp on a secluded island",
          },
          {
            time: "12:00 PM",
            title: "Lunch & Rest",
            description: "Relax and prepare for night safari",
          },
          {
            time: "4:00 PM",
            title: "Afternoon Safari",
            description: "Pre-dusk wildlife activity",
          },
          {
            time: "7:00 PM",
            title: "Night Safari Experience",
            description: "Unique night safari with spotlights",
          },
          {
            time: "10:00 PM",
            title: "Campfire Dinner",
            description: "Dinner under the stars on the island",
          },
        ],
      },
      {
        day: "Day 4",
        title: "4th day - Final Safari & Return",
        activities: [
          {
            time: "5:00 AM",
            title: "Final Morning Safari",
            description: "Last chance for the perfect shot",
          },
          {
            time: "9:00 AM",
            title: "Breakfast & Pack Up",
            description: "Break camp and pack up",
          },
          {
            time: "11:00 AM",
            title: "Return Journey Begins",
            description: "Start journey back with photo review session",
          },
          {
            time: "5:00 PM",
            title: "Arrive Kolkata",
            description: "Drop at your location with memories for lifetime",
          },
        ],
      },
    ],
    includes: [
      "Premium transport",
      "Mixed accommodation",
      "All meals",
      "6 safaris",
      "All permits",
      "Photo guide",
      "Camping gear",
    ],
    excludes: ["Camera fees", "Insurance", "Tips"],
  },
};

const PackageDetails = () => {
  const { packageId } = useParams();
  const pkg = packageData[packageId as keyof typeof packageData];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, [packageId]);

  if (!pkg) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-display text-4xl font-bold mb-4 text-foreground">
            Package Not Found
          </h1>
          <Button variant="hero" asChild>
            <Link to="/packages">View All Packages</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title={pkg.title}
        subtitle={pkg.subtitle}
        backgroundImage={pkg.image}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            to="/packages"
            data-aos="fade-right"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Packages
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div data-aos="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Overview
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Summary Box */}
              <div
                data-aos="fade-up"
                className="bg-card border-l-4 border-primary p-6 rounded-r-xl shadow-soft"
              >
                <p className="text-foreground leading-relaxed">{pkg.summary}</p>
              </div>

              {/* Quick Info */}
              <div
                data-aos="fade-up"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <p className="font-semibold text-foreground">
                    {pkg.duration}
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Group Size
                  </span>
                  <p className="font-semibold text-foreground">
                    {pkg.groupSize}
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <MapPin className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Location
                  </span>
                  <p className="font-semibold text-foreground text-sm">
                    {pkg.location}
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl text-center shadow-soft">
                  <Star className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <p className="font-semibold text-foreground">
                    {pkg.rating}/5
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div data-aos="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Highlights
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Timeline */}
              <div data-aos="fade-up">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Tour Timeline
                </h2>
                <div className="space-y-8">
                  {pkg.timeline.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="border-l-4 border-primary pl-6"
                    >
                      <h3 className="font-display text-xl font-bold text-foreground mb-4">
                        {day.day} : {day.title}
                      </h3>
                      <div className="space-y-6">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="space-y-1">
                            <span className="text-sm font-semibold text-secondary">
                              {activity.time}
                            </span>
                            <h4 className="font-semibold text-foreground">
                              {activity.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes/Excludes */}
              <div data-aos="fade-up" className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    What's Not Included
                  </h3>
                  <ul className="space-y-2">
                    {pkg.excludes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <span className="w-4 h-4 flex items-center justify-center text-destructive">
                          ×
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div
                className="bg-card rounded-2xl p-6 shadow-elevated sticky top-24"
                data-aos="fade-left"
              >
                <div className="text-center mb-6">
                  <span className="text-muted-foreground">Starting from</span>
                  <div className="font-display text-4xl font-bold text-primary">
                    {pkg.price}
                  </div>
                  <span className="text-muted-foreground">per person</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>Daily departures available</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-secondary" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                <Button variant="hero" size="xl" className="w-full mb-4">
                  Book This Package
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">Contact for Custom Tour</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Packages Section */}
      <PopularPackagesSection currentPackageId={packageId} />

      <Footer />
    </main>
  );
};

export default PackageDetails;
