import axios from "axios";
import userModel from "../models/userModels.js";
import FormData from "form-data"; // import FormData correctly

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Check user credit balance
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        message: `No Credit Balance, creditBalance: ${user.creditBalance}`,
      });
    }

    // Create FormData and append prompt
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Call the ClipDrop API
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(), // include FormData headers
        },
        responseType: "arraybuffer", // correct response type
      }
    );

    // Convert image from array buffer to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit from user before sending image
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true } // return updated document
    );

    // Send response
    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
