require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

// Upload file function
async function uploadFile(filePath) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append("file", fs.createReadStream(filePath));

    const response = await axios.post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
            "Content-Type": `multipart/form-data`,
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_SECRET_KEY
        }
    });

    console.log("✅ File uploaded to IPFS:", response.data.IpfsHash);
    return response.data.IpfsHash;
}


uploadFile("C:\\Users\\prana\\OneDrive\\Pictures\\wp.jpg").then((cid) => console.log("IPFS CID:", cid));
