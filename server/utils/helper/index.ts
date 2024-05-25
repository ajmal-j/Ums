import axios from "axios";

export const baseProfileUrl: string =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export async function sendRequest() {
  try {
    const response = await axios.get("https://www.rarekicks.shop/user/home");
    console.log("Request sent successfully:", response.status);
  } catch (error) {
    console.error("Error sending request:", error);
  }
}
