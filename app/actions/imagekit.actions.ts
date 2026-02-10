"use server";

import "dotenv/config";
import ImageKit from "imagekit";

// 1. Declare a variable to hold the instance (Singleton)
let imagekitInstance: ImageKit | null = null;

// 2. Create a helper function to get/initialize the instance
const getIK = () => {
  if (imagekitInstance) return imagekitInstance;

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    // During build time, if keys are missing, we log a warning instead of crashing
    console.warn(
      "ImageKit keys missing. Initialization skipped (expected during build).",
    );
    return null;
  }

  imagekitInstance = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });

  return imagekitInstance;
};

export async function uploadImage(formData: FormData, folder?: string) {
  const imagekit = getIK();
  if (!imagekit) return { success: false, error: "Configuration missing" };
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided");
    }

    // Convert File to Buffer for ImageKit
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      ...(folder ? { folder } : {}),
    });

    return { success: true, url: response.url, fileId: response.fileId };
  } catch (error) {
    console.error("Image upload failed:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function uploadImageFromBase64(
  base64: string,
  fileName: string,
  folder?: string,
) {
  const imagekit = getIK();
  if (!imagekit) return { success: false, error: "Configuration missing" };
  try {
    if (!base64) {
      throw new Error("No base64 string provided");
    }

    const response = await imagekit.upload({
      file: base64, // Pass the Base64 string directly
      fileName: fileName, // ImageKit requires a fileName
      ...(folder ? { folder } : {}), // Optional folder path
    });

    return { success: true, url: response.url, fileId: response.fileId };
  } catch (error) {
    console.error("Image upload failed:", error);
    return { success: false, error: "Upload failed" };
  }
}

export async function getIKAuthenticationParameters() {
  const ik = getIK();
  return ik ? ik.getAuthenticationParameters() : null;
}

export async function deleteFromImageKit(fileId: string) {
  const ik = getIK();
  if (!ik) return { success: false, error: "Configuration missing" };

  try {
    await ik.deleteFile(fileId);
    return { success: true };
  } catch (error) {
    console.error("Cloud Delete Error:", error);
    return { success: false, error: "Failed to delete image from cloud" };
  }
}
