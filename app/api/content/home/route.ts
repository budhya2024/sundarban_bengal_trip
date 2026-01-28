import { NextRequest, NextResponse } from "next/server";
import { getHomeContent, updateHomeContent } from "@/lib/content";
import { isAuthenticated } from "@/lib/auth";

/**
 * GET /api/content/home
 * Fetch home page content
 */
export async function GET() {
  try {
    const content = await getHomeContent();
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error("Error fetching home content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/content/home
 * Update home page content (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate content structure
    if (!body.hero) {
      return NextResponse.json(
        { error: "Invalid content structure" },
        { status: 400 },
      );
    }

    // Update content
    await updateHomeContent(body);

    return NextResponse.json(
      { success: true, message: "Content updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating home content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 },
    );
  }
}
