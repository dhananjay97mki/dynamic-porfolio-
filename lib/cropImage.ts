export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Given an image URL and cropped area pixels from react-easy-crop,
 * renders the cropped portion onto a canvas and returns a base64 Data URL.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  quality = 0.92
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get 2d canvas context');
  }

  // Set canvas size to match the cropped region
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped section onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Return base64 data URL
  return canvas.toDataURL('image/jpeg', quality);
}
