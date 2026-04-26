import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

let configured = false;

function ensureConfigured() {
  if (configured) return;
  const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      'Cloudinary credentials missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env',
    );
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

export interface UploadedImage {
  url: string;
  publicId: string;
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = 'bepro/courses',
): Promise<UploadedImage> {
  ensureConfigured();

  return new Promise<UploadedImage>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result?: UploadApiResponse) => {
        if (error || !result) return reject(error ?? new Error('Upload failed'));
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    // Without this, an error emitted on the stream (e.g. auth failure,
    // network drop) becomes an uncaught 'error' event → process crash →
    // connection dropped → browser sees "Failed to fetch" instead of a
    // proper HTTP error response.
    stream.on('error', reject);

    Readable.from(buffer).pipe(stream);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return;
  ensureConfigured();
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch {
    // best-effort: deletion failures shouldn't break the request
  }
}
