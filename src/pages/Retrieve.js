import React, { useState } from "react";
import { web3, contract } from "../utils/web3";

const Retrieve = () => {
  const [fileHash, setFileHash] = useState("");

  const fetchFile = async () => {
    const storedHash = await contract.methods.getFile().call();
    setFileHash(storedHash);
  };

  return (
    <div>
      <h1>Retrieve File</h1>
      <button onClick={fetchFile}>Fetch File</button>
      {fileHash && <p>File Hash: {fileHash}</p>}
    </div>
  );
};

export default Retrieve;
