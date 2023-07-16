import React, { useState, useEffect, useRef } from "react";
import { Amplify } from "@aws-amplify/core";
import { Storage } from "aws-amplify";
import axios from "axios";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import wallet from '../assets/wallet.png';
import bitcoin from '../assets/bitcoin.svg'
import ethereum from '../assets/ethereum.svg'
import metamask from '../assets/MetaMask.svg'
import polygon from '../assets/polygon.svg'
import bnb from '../assets/bnb.svg'
import usdc from '../assets/usdc.svg'
import "./CSS/GenerateURL.css";

function GenerateURL() {
  const [blockchain, setBlockchain] = useState(1); // 1: ETH, 2: Polygon, 3: BNB
  const [token, setToken] = useState("0"); // USDT, USDC
  const [finalURL, setFinalURL] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy")
  const [receivingAddress, setReceivingAddress] = useState(
    "0x056397760b973BfB921Bc10Be9DA5034B1e921d7"
  );
  const [tokenAmount, setTokenAmount] = useState(0);

  const [ID, setID] = useState();
  const ref = useRef(null);

  useEffect(() => {
    Amplify.configure({
      Auth: {
        identityPoolId: "ap-south-1:78648954-8316-428e-94b4-05b7c94d9845",
        region: "ap-south-1",
      },
      Storage: {
        AWSS3: {
          bucket: "freelancepay02",
          region: "ap-south-1",
        },
      },
    });
  }, []);

  const generateURL = async () => {
    // const url =  `freelance.com/#/Payments/#/${receivingAddress}/${blockchain}/${token}/${tokenAmount}/${ID}`;
    const url = `http://localhost:3000/#/Payments/#/${receivingAddress}/${blockchain}/${token}/${tokenAmount}/${ID}`;
     setFinalURL(url);
    console.log(url);
  };

  const handelFileLoad = async () => {
    const filename = generateID();
    await Storage.put(filename, ref.current.files[0])
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });

    alert("File uploaded successfully!");
  };

  const generateID = () => {
    let m = uuidv4();
    setID(m.slice(0, 8));
    return m.slice(0, 8);
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalURL);
     setCopyStatus("Copied!")
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="mainBackground">
        <div className="usdc">
          <img src={usdc} alt="" />
        </div>
        <div className="bitcoin">
          <img src={bitcoin} alt="" />
        </div>
        <div className="metamask">
          <img src={metamask} alt="" />
        </div>
        <div className="polygon">
          <img src={polygon} alt="" />
        </div>
        <div className="bnb">
          <img src={bnb}alt="" />
        </div>
        <div className="ethereum">
          <img src={ethereum} alt="" />
        </div>
   { !finalURL &&  <div className="generateURL">
        <div className="icon">
          <span>Wallet address</span>
        <input
          type="text"
          placeholder="Receiving address"
          onChange={(e) => {
            setReceivingAddress(e.target.value);
          }}
          />
          </div>
          <div className="icon">
            <span>Amount</span>
        <input
          type="number"
          placeholder="Enter amount"
          onChange={(e) => {
            setTokenAmount(e.target.value);
          }}
          />
          </div>

          <div className="selections">
          <select
          onChange={(e) => {
            setBlockchain(e.target.value);
          }}
          name=""
          id=""
          placeholder="select"
        >
          <option value="#">Select Blockchain</option>
          <option value="0x1">Ethereum</option>
          <option value="0x89">Polygon</option>
          <option value="0x38">Binance</option>
          <option value="0xa86a">Avalanch -C</option>
          <option value="0xa">Optimism</option>
          <option value="0xa4b1">Arbitrum</option>
          <option value="0x13a">Filecoin</option>
          <option value="0x28">Telos EVM</option>
          <option value="0x32">XDC</option>
          <option value="0x13881">Mumbai</option>
          <option value="0x5">Goerli</option>
        </select>

        <select
          onChange={(e) => {
            setToken(e.target.value);
          }}
          name=""
          id=""
          placeholder="select"
        >
          <option value="#">Select Token</option>
          <option value={0}>USDT</option>
          <option value={1}>DAI</option>
          <option value={2}>USDC</option>
          <option value={3}>BUSD</option>
        </select>
          </div>
        

        <input ref={ref} type="file" onChange={handelFileLoad} />

        <button onClick={generateURL}>Generate URL</button>
      </div>}
      {finalURL && <div className="generateURL urlContainer">
        <div className="heading">
          <span>URL Generated!</span>
        </div>
        <div className="url">
          <span>{finalURL}</span>
        </div>
        <button onClick={copyToClipboard}>{copyStatus}</button>
        </div>}
      </div>
      
    </>
  );
}

export default GenerateURL;
