"use server";

import "dotenv/config";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function uploadImage(formData: FormData, folder?: string) {
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
