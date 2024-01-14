
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});

export async function uploadImageToCloudinary(image: File, folder: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
        const byteData = await image.arrayBuffer();
        const buffer = Buffer.from(byteData);

        cloudinary.uploader.upload_stream(
            { folder: folder, quality: 70, progressive: true, fetch_format: "auto" }, 
            async (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) {
                    console.error('Error uploading image:', error);
                    reject(error);
                } else {
                    if (result && result.secure_url) {
                        resolve(result.secure_url);
                    } else {
                        reject(new Error('Secure URL is undefined in the upload result.'));
                    }
                }
            }
        ).end(buffer);
    });
}
