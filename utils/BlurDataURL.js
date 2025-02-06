"use client"
import lqip from "lqip-modern";

export const generateBlurDataURL = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const lqipResult = await lqip(Buffer.from(buffer));
    return lqipResult.metadata.dataURI;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
    return null;
  }
};
