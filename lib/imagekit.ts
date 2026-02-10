import ImageKit from "imagekit";

// Use a singleton pattern to reuse the connection
let imagekitInstance: ImageKit | null = null;

/**
 * Initializes and returns the ImageKit SDK instance.
 * Using a function prevents top-level execution errors during Next.js builds.
 */
export const getImageKitInstance = () => {
  // Return existing instance if already initialized
  if (imagekitInstance) return imagekitInstance;

  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  // Safety check: Prevents crashing if variables are missing during build-time
  if (!publicKey || !privateKey || !urlEndpoint) {
    console.warn("ImageKit: Missing configuration. Initialization skipped.");
    return null;
  }

  imagekitInstance = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });

  return imagekitInstance;
};
