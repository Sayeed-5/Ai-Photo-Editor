
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might show a more user-friendly error or disable features.
  // For this context, throwing an error is sufficient to indicate a configuration issue.
  console.error("API_KEY environment variable is not set. Please set it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface EditedImageResult {
  imageUrl: string;
}

export const editImageWithPrompt = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<EditedImageResult> => {
  if (!API_KEY) {
    throw new Error("Gemini API key is not configured. Cannot process image.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    const editedImagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
    
    if (editedImagePart?.inlineData) {
      const base64ImageBytes: string = editedImagePart.inlineData.data;
      const imageMimeType: string = editedImagePart.inlineData.mimeType;
      const imageUrl = `data:${imageMimeType};base64,${base64ImageBytes}`;
      return { imageUrl };
    } else {
      const refusalText = response.text || "The model may have refused the request due to safety policies.";
      throw new Error(`No image was generated. Reason: ${refusalText}`);
    }
  } catch (error) {
    console.error("Error editing image with Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to generate image: ${errorMessage}`);
  }
};
