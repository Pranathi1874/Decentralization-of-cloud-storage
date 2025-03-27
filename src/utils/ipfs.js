import axios from "axios";

const PINATA_API_KEY = "51b58796a991be27d734";
const PINATA_SECRET_API_KEY = "bd1df05c0d623869382b22dc2220f7a71d82987e0a04f747072bf147d26f8138";

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: file.name,
  });

  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 1,
  });

  formData.append("pinataOptions", pinataOptions);

  try {
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    console.log("IPFS Hash:", response.data.IpfsHash);
    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to Pinata:", error);
    return null;
  }
};
