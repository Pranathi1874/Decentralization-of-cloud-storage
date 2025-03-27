require("dotenv").config();
const axios = require("axios");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

async function testPinata() {
    const url = `https://api.pinata.cloud/data/testAuthentication`;

    const response = await axios.get(url, {
        headers: {
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_SECRET_KEY
        }
    });

    console.log("✅ Pinata API Connected:", response.data);
}

testPinata();
