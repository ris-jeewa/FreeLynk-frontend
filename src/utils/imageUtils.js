// Utility functions for handling images and fallbacks

// Reliable placeholder images from Unsplash
export const PLACEHOLDER_IMAGES = {
  PROFILE: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  PROJECT: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
  AVATAR: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  HERO: 'https://images.unsplash.com/photo-1590650046871-92c887180603?w=800&h=600&fit=crop',
};

// Function to get a reliable placeholder image
export const getPlaceholderImage = (type = 'PROFILE', width = 150, height = 150) => {
  const baseImages = {
    PROFILE: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    PROJECT: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    AVATAR: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    HERO: 'https://images.unsplash.com/photo-1590650046871-92c887180603',
  };

  const baseUrl = baseImages[type] || baseImages.PROFILE;
  return `${baseUrl}?w=${width}&h=${height}&fit=crop${type === 'PROFILE' || type === 'AVATAR' ? '&crop=face' : ''}`;
};

// Function to handle image loading errors
export const handleImageError = (event, fallbackType = 'PROFILE') => {
  console.warn('Image failed to load, using fallback:', event.target.src);
  event.target.src = PLACEHOLDER_IMAGES[fallbackType];
  event.target.onerror = null; // Prevent infinite loop
};

// Function to validate image URL
export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Check if it's a valid URL
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Check if it's an image URL
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const hasImageExtension = imageExtensions.some(ext => 
    url.toLowerCase().includes(ext)
  );
  
  // Check if it's a data URL
  const isDataUrl = url.startsWith('data:image/');
  
  return hasImageExtension || isDataUrl || url.includes('unsplash.com') || url.includes('cloudinary.com');
};

// Function to get the best available image
export const getBestImage = (primaryUrl, fallbackType = 'PROFILE') => {
  if (isValidImageUrl(primaryUrl)) {
    return primaryUrl;
  }
  return PLACEHOLDER_IMAGES[fallbackType];
}; 