import cloudinary from "../config/cloudinary.ts";

export interface UploadResponse {
  secure_url: string;
  public_id: string;
}

export async function uploadToCloudinary(
  file: Uint8Array,
  folder = "cookio",
): Promise<UploadResponse> {
  try {
    // Convertir le fichier en base64
    const base64File = btoa(String.fromCharCode(...file));
    const uploadStr = `data:image/jpeg;base64,${base64File}`;

    const result = await cloudinary.uploader.upload(uploadStr, {
      folder,
      resource_type: "auto",
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Erreur lors de l'upload sur Cloudinary:", error);
    throw new Error("Échec de l'upload sur Cloudinary");
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Erreur lors de la suppression sur Cloudinary:", error);
    throw new Error("Échec de la suppression sur Cloudinary");
  }
}
