const API_BASE = "http://localhost:8000";


export function getImageUrl(imagePath) {
  if (!imagePath) {
    return "https://placehold.co/600x400?text=No+Image";
  }

  // External image URL
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  // Uploaded image path from FastAPI
  return `${API_BASE}${imagePath}`;
}