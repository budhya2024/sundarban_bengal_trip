import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "data", "content");

export interface HeroContent {
  tag: string;
  title: string;
  titleHighlight: string;
  description: string;
  buttons: {
    primary: {
      text: string;
      link: string;
    };
    secondary: {
      text: string;
      link: string;
    };
  };
  stats: Array<{
    icon: string;
    value: string;
    label: string;
  }>;
  videoUrl: string;
  posterUrl: string;
}

export interface HomeContent {
  hero: HeroContent;
}

/**
 * Read home page content
 */
export async function getHomeContent(): Promise<HomeContent> {
  try {
    const filePath = path.join(CONTENT_DIR, "home.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading home content:", error);
    throw new Error("Failed to load home content");
  }
}

/**
 * Update home page content
 */
export async function updateHomeContent(content: HomeContent): Promise<void> {
  try {
    const filePath = path.join(CONTENT_DIR, "home.json");
    await fs.writeFile(filePath, JSON.stringify(content, null, 2), "utf-8");
  } catch (error) {
    console.error("Error updating home content:", error);
    throw new Error("Failed to update home content");
  }
}

/**
 * Get hero section content only
 */
export async function getHeroContent(): Promise<HeroContent> {
  const homeContent = await getHomeContent();
  return homeContent.hero;
}

/**
 * Update hero section content only
 */
export async function updateHeroContent(
  heroContent: HeroContent,
): Promise<void> {
  const homeContent = await getHomeContent();
  homeContent.hero = heroContent;
  await updateHomeContent(homeContent);
}
