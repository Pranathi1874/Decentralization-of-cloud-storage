import React, { useState } from "react";
import { web3, contract } from "../utils/web3";
import { uploadToIPFS } from "../utils/ipfs";  // Import IPFS upload function
import FileUpload from "../components/FileUpload";

const Upload = () => {
  const [fileHash, setFileHash] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    try {
      setIsUploading(true);

      // ✅ Upload file to IPFS using Pinata
      const ipfsUrl = await uploadToIPFS(file);
      if (!ipfsUrl) {
        alert("Failed to upload to IPFS.");
        setIsUploading(false);
        return;
      }

      // ✅ Extract IPFS hash from URL
      const hash = ipfsUrl.split("/").pop();
      setFileHash(hash);

      // ✅ Connect to Ethereum wallet
      const accounts = await web3.eth.requestAccounts();

      // ✅ Store the file hash on the blockchain
      await contract.methods.storeFile(hash).send({ from: accounts[0] });

      alert("File stored on blockchain!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <FileUpload onUpload={handleUpload} />
      {isUploading && <p>Uploading...</p>}
      {fileHash && <p>Stored File Hash: {fileHash}</p>}
    </div>
  );
};

export default Upload;
