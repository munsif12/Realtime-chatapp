export default async function uploadImageToCloudinary(CLOUDINARY_URL, data) {
    try {
        const resp = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: data,
        });
        const { secure_url } = await resp.json();
        return secure_url;
    } catch (error) {
        return error;
    }
} 