import { useState } from 'react';

function GenerateURL() {

  const [blockchain, setBlockchain] = useState(1); // 1: ETH, 2: Polygon, 3: BNB
  const [token, setToken] = useState("0"); // USDT, USDC
  const [receivingAddress, setReceivingAddress] = useState("0x056397760b973BfB921Bc10Be9DA5034B1e921d7");
  const [tokenAmount, setTokenAmount] = useState(0);


  const generateURL = async()=> {
    // console.log( "freelance.com/" + receivingAddress );
    console.log("URL:- ",  `freelance.com/${receivingAddress}/${blockchain}/${token}/${tokenAmount}`);

  }


function test() {
  console.log(blockchain)
  console.log(window.location.search);
}
  return (
    <>
      <h1>Freelnace pay</h1>


        <input type="text" placeholder='Receiving address' onChange={(e) => {setReceivingAddress(e.target.value)}}/>
        <br />
        <input type="number" placeholder='Enter amount' onChange={(e) => {setTokenAmount(e.target.value)}} />
        <br />

        <select onChange={(e) => {setBlockchain(e.target.value)}} name="" id=""  placeholder='select'>
          <option value="#">Select Blockchain</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Polygon">Polygon</option>
          <option value="Binance">Binance</option>
        </select>
        <br />

        <select onChange={(e) => {setToken(e.target.value)}} name="" id=""  placeholder='select'>
          <option value="#">Select Token</option>
          <option value="USDT">USDT</option>
          <option value="USDC">USDC</option>
          <option value="Ethereum">ETH</option>
        </select>
        <br />
        <button onClick={generateURL}>Generate URL</button>

        <br />
        <br />
        <br />

<button onClick={test}>test</button>
    </>
  );
}

export default GenerateURL;
