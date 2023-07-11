import React, { useState,useEffect, useRef } from 'react'
import { Amplify } from '@aws-amplify/core'
import { Storage } from 'aws-amplify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ContractAddresses, ERC20_ABI } from '../Constants/Constant';
import {ethers} from "ethers";



// freelance.com/0x056397760b973BfB921Bc10Be9DA5034B1e921d7/0x1/0/1200/3085f9c4
// ['', '0x056397760b973BfB921Bc10Be9DA5034B1e921d7', '0x1', '0', '1200', '3085f9c4']
function MakePayment() {

    const [urlData, seturlData] = useState();
    const [accountAdd, setAccountAdd] = useState();
    const [btnText, setbtnText] = useState("Make Payment");
    const [provider1, setProvider] = useState();
    const [signer1, setSigner] = useState()



    useEffect(() => {

        let data = (window.location.pathname);
        let m = data.split('/');
        seturlData(m)
    
        Amplify.configure({
            Auth:{
                identityPoolId: process.env.POOL_ID,
                region: process.env.REGION,
            },
        Storage :{
            AWSS3: {
                bucket: process.env.AWS_BUCKET,
                region:process.env.REGION,
            },
        },
        })
    },[0])


    function test() {
        // console.log(blockchain)
        console.log(window.location);
        let data = (window.location.pathname);
        let m = data.split('/');
        console.log(m)
        
      }


    const downloadFile = async () => {

        let url;
        let key = "8192baa6"

        await Storage.get(urlData[5]).then(res => {
            url = res
            console.log(res);
        }).catch(err => {console.log(err)});

        
        axios({
        url,
        method: 'GET',
        responseType: 'blob',
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'filename.zip'); // Set the desired file name
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
            alert("Something went wrong :(");
        });
    }

    const makePayment = async() => {
        setbtnText("Connecting...")
        await connectWallet();
        setbtnText("Pay USDT")
        await makeTx()
        
    }

    const connectWallet = async() => {

        if(!window.ethereum){
            alert("Please install MetaMask!")
        }
        await window.ethereum.request({ method:"eth_requestAccounts"})
        .then( (accounts) => {
            setAccountAdd(accounts[0]);
        }).catch( (e) => {
          alert(e)
        })

        // const pro = await new ethers.providers.Web3Provider(window.ethereum);
        // setProvider(pro);
        // const sig = await pro.getSigner();
        // setSigner(sig)


        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        console.log(chainId);
        if (chainId !== urlData[2]){
            switchNetwork(urlData[2])
        }
    }
    const switchNetwork = async(networkID) => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: urlData[2] }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
            }
        }
    }

    const makeTx = async() => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        try {

            let m = ContractAddresses
            let contractAddress = ('ox' + urlData[2]);
            let ContractAdd = m[contractAddress][urlData[3]]

            const contractInstance = new ethers.Contract(ContractAdd, ERC20_ABI, signer);
            let decimals = await contractInstance.decimals();
            decimals = decimals.toString();

            const getApprove = await contractInstance.approve(accountAdd, (urlData[4] * (10**decimals)));
            // await getApprove.wait(); 
            alert("Token approved successfully:)")

            let tx = await contractInstance.transferFrom(accountAdd, urlData[1], (urlData[4]* (10**decimals) ), {gasLimit: 100000});
            await tx.wait();
            alert("Payment done successfully:)")
            
        } catch (error) {
            alert(error)
        }
        
    }


  
    return (

        <>
        
        <div>MakePayment</div>
    
        <button onClick={makeTx }>makeTx</button>

        <br />
        <br />
        <br />

        <button onClick={makePayment}>{btnText}</button>
        
        </>
  )
}

export default MakePayment