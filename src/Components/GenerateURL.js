import React, { useState,useEffect, useRef } from 'react'
import { Amplify } from '@aws-amplify/core'
import { Storage } from 'aws-amplify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function GenerateURL() {

  const [blockchain, setBlockchain] = useState(1); // 1: ETH, 2: Polygon, 3: BNB
  const [token, setToken] = useState("0"); // USDT, USDC
  const [receivingAddress, setReceivingAddress] = useState("0x056397760b973BfB921Bc10Be9DA5034B1e921d7");
  const [tokenAmount, setTokenAmount] = useState(0);

  const [ID, setID] = useState();
  const ref = useRef(null);


  useEffect(() => {
    Amplify.configure({
        Auth:{
            // identityPoolId:'ap-south-1:78648954-8316-428e-94b4-05b7c94d9845',
            identityPoolId: process.env.POOL_ID,
            region:process.env.REGION,
        },
    Storage :{
        AWSS3: {
            bucket: process.env.AWS_BUCKET,
            region: process.env.REGION,
        },
    },
    })
},[])


  const generateURL = async()=> {
    const url =  `freelance.com/${receivingAddress}/${blockchain}/${token}/${tokenAmount}/${ID}`;
    alert(url);
    console.log(url);

  }

  const handelFileLoad = async () => {
      const filename = generateID();
      await Storage.put(filename, ref.current.files[0]).then(resp => {
          console.log(resp);
      }).catch(err => {console.log(err)});

      alert("File uploaded successfully!")
  }

  const generateID = () => {
      let m = uuidv4()
      setID(m.slice(0,8));
      return (m.slice(0,8));
  }


  
  return (
    <>
      <h1>Freelance pay</h1>


        <input type="text" placeholder='Receiving address' onChange={(e) => {setReceivingAddress(e.target.value)}}/>
        <br />
        <input type="number" placeholder='Enter amount' onChange={(e) => {setTokenAmount(e.target.value)}} />
        <br />

        <select onChange={(e) => {setBlockchain(e.target.value)}} name="" id=""  placeholder='select'>
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
        <br />

        <select onChange={(e) => {setToken(e.target.value)}} name="" id=""  placeholder='select'>
          <option value="#">Select Token</option>
          <option value={0}>USDT</option> 
          <option value={1}>DAI</option>
          <option value={2}>USDC</option>
          <option value={3}>BUSD</option>
        </select>
        <br />
        <br />
          <input ref = {ref} type="file" onChange={handelFileLoad} />
        <br />
        <br />

        <button onClick={generateURL}>Generate URL</button>

        <br />
        <br />
        <br />
    </>
  );
}

export default GenerateURL;
