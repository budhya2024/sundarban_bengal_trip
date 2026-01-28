import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AOS from "aos";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, Share2 } from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/icons/SocialIcons";
import galleryTiger from "@/assets/gallery-tiger.jpg";
import galleryBoat from "@/assets/gallery-boat.jpg";
import galleryBird from "@/assets/gallery-bird.jpg";
import galleryDeer from "@/assets/gallery-deer.jpg";
import gallerySunset from "@/assets/gallery-sunset.jpg";
import heroImage from "@/assets/hero-sundarban.jpg";

const blogPosts = [
  {
    id: "1",
    slug: "best-time-to-visit-sundarbans",
    title: "Best Time to Visit Sundarbans: A Complete Guide",
    excerpt: "Discover the ideal seasons for tiger spotting, bird watching, and exploring the mangrove forests.",
    content: `
      <p>The Sundarbans, a UNESCO World Heritage Site and the world's largest mangrove forest, offers a unique wildlife experience throughout the year. However, choosing the right time to visit can significantly enhance your experience.</p>
      
      <h2>Winter Season (October - March)</h2>
      <p>This is considered the best time to visit Sundarbans. The weather is pleasant with temperatures ranging from 15°C to 25°C. The clear skies and comfortable temperatures make boat safaris enjoyable. This is also the peak season for bird watching as migratory birds arrive from various parts of the world.</p>
      
      <h2>Summer Season (April - June)</h2>
      <p>The summer months can be quite hot with temperatures reaching up to 40°C. However, this is an excellent time for tiger sightings as animals come to the water bodies more frequently to quench their thirst. The vegetation is less dense, improving visibility.</p>
      
      <h2>Monsoon Season (July - September)</h2>
      <p>The monsoon transforms the Sundarbans into a lush green paradise. While boat safaris continue, some areas might be inaccessible due to high water levels. This season offers unique photography opportunities with dramatic skies and verdant landscapes.</p>
      
      <h2>Tips for Your Visit</h2>
      <ul>
        <li>Book your accommodation and tours in advance, especially during peak season</li>
        <li>Carry binoculars for wildlife spotting</li>
        <li>Wear neutral-colored clothing to blend with the environment</li>
        <li>Always follow safety guidelines provided by your guides</li>
      </ul>
    `,
    image: galleryTiger,
    date: "Jan 15, 2024",
    author: "Rajiv Banerjee",
    readTime: "8 min read",
  },
  {
    id: "2",
    slug: "traditional-boat-safari",
    title: "Traditional Boat Safari: What to Expect",
    excerpt: "Everything you need to know about the iconic wooden boat safaris through the winding waterways.",
    content: `
      <p>A boat safari in the Sundarbans is unlike any other wildlife experience. The traditional wooden boats, locally known as "dinghis" or "bhotbhoti," take you through narrow creeks and wide rivers, offering glimpses of the diverse wildlife and unique ecosystem.</p>
      
      <h2>Types of Boats</h2>
      <p>Depending on your package, you might travel on motorized launches, houseboats with overnight facilities, or smaller country boats that can navigate narrow waterways. Each offers a different perspective of this magnificent forest.</p>
      
      <h2>What You'll See</h2>
      <p>The boat safari takes you through multiple zones of the tiger reserve. Watch out for crocodiles basking on the banks, spotted deer grazing near the water, and if you're lucky, the magnificent Royal Bengal Tiger. The birdlife is exceptional, with kingfishers, eagles, and herons being common sights.</p>
      
      <h2>Safari Tips</h2>
      <ul>
        <li>Early morning safaris offer the best wildlife sightings</li>
        <li>Maintain silence to increase chances of spotting animals</li>
        <li>Carry a good zoom camera for photography</li>
        <li>Listen to your guide's instructions at all times</li>
      </ul>
    `,
    image: galleryBoat,
    date: "Jan 10, 2024",
    author: "Priya Mukherjee",
    readTime: "6 min read",
  },
  {
    id: "3",
    slug: "bird-watching-sundarbans",
    title: "Bird Watching in Sundarbans: Species to Spot",
    excerpt: "From Kingfishers to White-bellied Sea Eagles, discover the diverse avian life of the Sundarbans.",
    content: `
      <p>The Sundarbans is a paradise for bird watchers, hosting over 260 species of birds. From colorful kingfishers to majestic eagles, the diversity is astounding.</p>
      
      <h2>Resident Birds</h2>
      <p>The forest is home to numerous resident species including the White-bellied Sea Eagle, Brahminy Kite, various species of kingfishers, herons, egrets, and the beautiful Lesser Adjutant Stork.</p>
      
      <h2>Migratory Birds</h2>
      <p>During winter (November to February), the Sundarbans welcomes numerous migratory birds from Central Asia, Europe, and other parts of the Indian subcontinent. Look out for various species of ducks, waders, and raptors.</p>
      
      <h2>Best Spots for Bird Watching</h2>
      <ul>
        <li>Sajnekhali Bird Sanctuary</li>
        <li>Sudhanyakhali Watch Tower</li>
        <li>Dobanki Watch Tower</li>
        <li>Netidhopani area</li>
      </ul>
    `,
    image: galleryBird,
    date: "Jan 5, 2024",
    author: "Arun Das",
    readTime: "10 min read",
  },
  {
    id: "4",
    slug: "royal-bengal-tiger-behavior",
    title: "The Royal Bengal Tiger: Behavior and Habitat",
    excerpt: "Learn about the magnificent tigers of Sundarbans and their unique adaptations.",
    content: `
      <p>The Royal Bengal Tigers of Sundarbans are unique among their species. They have adapted to the challenging mangrove environment in remarkable ways.</p>
      
      <h2>Swimming Tigers</h2>
      <p>Unlike tigers elsewhere, Sundarban tigers are excellent swimmers and regularly cross rivers and creeks. They have been known to swim up to 8 kilometers in search of prey or territory.</p>
      
      <h2>Diet and Hunting</h2>
      <p>These tigers primarily prey on spotted deer and wild boar. However, they are opportunistic and also feed on fish, crabs, and even monitor lizards. Their hunting techniques are adapted to the aquatic environment.</p>
      
      <h2>Conservation Efforts</h2>
      <p>The Sundarban Tiger Reserve is actively involved in tiger conservation. Regular monitoring, anti-poaching patrols, and community involvement have helped maintain a stable tiger population of approximately 100 individuals.</p>
    `,
    image: heroImage,
    date: "Dec 28, 2023",
    author: "Rajiv Banerjee",
    readTime: "12 min read",
  },
  {
    id: "5",
    slug: "wildlife-photography-tips",
    title: "Wildlife Photography Tips for Sundarbans",
    excerpt: "Expert tips for capturing stunning wildlife photos in challenging mangrove conditions.",
    content: `
      <p>Photographing wildlife in the Sundarbans presents unique challenges and opportunities. The interplay of water, forest, and wildlife creates magical moments worth capturing.</p>
      
      <h2>Equipment Recommendations</h2>
      <p>A telephoto lens (200-500mm) is essential for wildlife photography here. Consider weather-sealed equipment as humidity is high. A good tripod or monopod helps stabilize shots from the moving boat.</p>
      
      <h2>Best Times for Photography</h2>
      <ul>
        <li>Early morning (6-9 AM) - soft golden light, active wildlife</li>
        <li>Late afternoon (3-6 PM) - beautiful sunset opportunities</li>
        <li>Overcast days - even lighting, reduced harsh shadows</li>
      </ul>
      
      <h2>Composition Tips</h2>
      <p>Use the reflections in water to create stunning compositions. Include the mangrove roots and environment to tell a complete story. Patience is key - wait for the right moment rather than shooting continuously.</p>
    `,
    image: galleryDeer,
    date: "Dec 20, 2023",
    author: "Arun Das",
    readTime: "15 min read",
  },
  {
    id: "6",
    slug: "sunset-cruises-experience",
    title: "Sunset Cruises: A Magical Experience",
    excerpt: "Why sunset cruises are the most romantic way to experience the Sundarbans.",
    content: `
      <p>There's something magical about watching the sun set over the vast waterways of the Sundarbans. The sky transforms into a canvas of oranges, pinks, and purples, reflected perfectly in the calm waters below.</p>
      
      <h2>What to Expect</h2>
      <p>Sunset cruises typically begin around 4 PM and last for 2-3 hours. As you glide through the waterways, you'll witness the forest coming alive with the sounds of returning birds and nocturnal animals beginning to stir.</p>
      
      <h2>Photography Opportunities</h2>
      <p>The golden hour light creates stunning silhouettes of the mangrove trees and wildlife. Capture the flight of birds returning to their roosts, the reflections in the water, and the dramatic sky.</p>
      
      <h2>Romantic Getaway</h2>
      <p>Our luxury houseboats offer private sunset viewing decks, perfect for couples. Enjoy complimentary refreshments while watching one of nature's most beautiful spectacles.</p>
    `,
    image: gallerySunset,
    date: "Dec 15, 2023",
    author: "Priya Mukherjee",
    readTime: "5 min read",
  },
];

const BlogDetails = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    AOS.refresh();
  }, [slug]);

  if (!post) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
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
        title="Travel Blog"
        subtitle="Stories, tips, and insights from our Sundarban adventures"
        backgroundImage={post.image}
      />

      {/* Article Content with Sidebar */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Back Link */}
              <Link
                to="/blog"
                data-aos="fade-right"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Blog Title */}
              <h1
                data-aos="fade-up"
                className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6"
              >
                {post.title}
              </h1>

              {/* Author Info */}
              <div
                data-aos="fade-up"
                className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{post.author}</span>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div
                data-aos="fade-up"
                className="relative mb-10 rounded-2xl overflow-hidden shadow-elevated"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Excerpt */}
              <p
                data-aos="fade-up"
                className="text-lg text-muted-foreground mb-8 italic border-l-4 border-secondary pl-4"
              >
                {post.excerpt}
              </p>

              {/* Content */}
              <div
                data-aos="fade-up"
                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div
                data-aos="fade-up"
                className="mt-12 pt-8 border-t border-border"
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share this article:
                  </span>
                  <button className="w-10 h-10 rounded-full bg-[hsl(221,44%,41%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                    <FacebookIcon className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[hsl(0,0%,0%)] text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                    <TwitterIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <BlogSidebar
                latestPosts={blogPosts}
                currentPostId={post.id}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogDetails;
