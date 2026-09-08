import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export const TourismContent = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="container">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Main H1 Block */}
          <div>
            <h1 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Sundarban West Bengal Tourism – Discover the Wild Beauty, Mangrove Forests &amp; Unique Experiences of the Sundarbans
            </h1>
            <p>
              Being one of the world’s largest mangrove forests, Sundarbans are one of the World Heritage Biosphere Reserves. The natural beauty of West Bengal is a harmonious blend of mangrove forests and saltwater rivers. This unique mangrove ecosystem is the habitat for the Royal Bengal Tiger and a vast number of flora and fauna. You can travel through mangrove swamps and calm waters of the Sundarbans National Park and admire the beauty of exotic birds and animals. A boat tour by Sundarban West Bengal tourism through the Sunderbans will help you escape the hustle of city life, enjoy nature’s beauty.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/sundarban-mangrove-forest.jpg"
              alt="Sundarban mangrove forests and wild beauty"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          {/* H2 Block 1 */}
          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Experience an Unforgettable Sundarban Tour from Kolkata with Comfortable Travel &amp; Authentic Jungle Adventures
            </h2>
            <p className="mb-4">
              Taking a tour from Kolkata to Sundarban is a hassle-free experience if you choose the trip with Sundarban West Bengal tourism. The boat trip begins right from the place where you choose to stay. You can either reach the boat-ride starting point by road or by train and enjoy your jungle tour from there without a worry in the world.
            </p>
            <p className="mb-4">
              You can even take a trip in the narrow waterways in ancient wooden boats while spotting watch towers and villages. Your tour guide will take you through the waterways and show you isolated hereditary regions that only the local population is familiar with. A boat tour from Kolkata is exciting, safe, and a great way to relax and enjoy the local culture as you sample the local cuisine.
            </p>
            <p>
              This tour will see you track wildlife while having the most wonderful time possible exploring the world’s largest tidal mangrove forest.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/sundarban-river-boating-with-mangrove-forest-.jpg"
              alt="Sundarban river boating with mangrove forest"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          {/* H2 Block 2 */}
          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Discover the Rich Wildlife, Mangrove Forests &amp; Natural Beauty of the Sundarban Wildlife Tour
            </h2>
            <p>
              A wildlife tour in Sundarbans will unveil the rich biodiversity and diverse flora and fauna. Apart from spotting the Royal Bengal tiger, one can also spot estuarine crocodiles, spotted deer, wild boar, and monitor lizards sunning themselves on the banks of the Sundarbans. The trees provide a perfect habitat for kingfishers, eagles, and migratory birds that are very easy to spot during the wildlife tour. <br />
              The most popular watchtowers in Sundarbans include Sajnekhali, Sudhanyakhali, and Dobanki watchtower from where one can get a clear view of the mangroves and freshwater ponds. This ensures a great opportunity to catch a glimpse of the diverse wildlife.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/royel-bengal-tiger.webp"
              alt="Royal Bengal Tiger in Sundarban West Bengal"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          {/* H2 Block 3 */}
          <div>
            <h2 className="text-lg md:text-xl xl:text-2xl font-semibold text-foreground mb-4">
              Explore Carefully Planned Sundarban Tour Packages with SundarbanBengalTrip for a Memorable Jungle Escape
            </h2>
            <p>
              Sundarban west bengal tourism at SundarbanBengalTrip understand that different groups of people have varying needs. Hence, Sundarban West Bengal tourism offer the best family trips, solo expeditions and photography tours in Sundarban. It's tour packages include everything from comfortable hotels, customized boat cruise, clear permits and guided safari, making your adventure smooth and stress free. Choose Sundarban Bengal Trip tour packages for a hassle free, safe and enjoyable experience in exploring the hidden beauty of Sundarban.
            </p>
          </div>
          <div className="">
            <Image
              src="/assets/sundarbantourphoto.jpeg"
              alt="Sundarban Bengal Trip packages"
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* Bottom Contact / Inquiry Strip */}
      <div className="container mt-6 md:mt-10">
        <div className="text-base text-foreground/80 bg-foreground/10 p-4">
          <p>
            Choose Sundarban Bengal Trip tour packages for a hassle free, safe and enjoyable experience in exploring the hidden beauty of Sundarban. Contact our team today to get a customized, obligation-free quote tailored exactly to your group size and travel preferences.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Phone className="w-4 h-4" />
              <a href="tel:+917586889519" className="hover:text-primary transition-colors">
                +91 75868 89519
              </a>
            </div>
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Mail className="w-4 h-4" />
              <a href="mailto:sundarbanbengaltrip@gmail.com" className="hover:text-primary transition-colors">
                sundarbanbengaltrip@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
