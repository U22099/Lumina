import AddToHomeScreen from "a2hs.js";
export const runPwaPrompt = () => AddToHomeScreen({
  brandName: "Lumina",
  fontFamily: "comic-neue-bold, Tahoma, sans-serif",
  backgroundColor: "white",
  color: "#black",
  logoImage: `<img src="logo.jpg" style="width:100px;height:50px;border-radius:8px">`,
})