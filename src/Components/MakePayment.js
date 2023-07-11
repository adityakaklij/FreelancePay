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
    const [status, setStatus] = useState(false);



    useEffect(() => {

        // let data = (window.location.pathname);
        let data = (window.location.href);
        let m = data.split('/');
        seturlData(m)
        console.log(m[10] );
    
        Amplify.configure({
            Auth:{
                // identityPoolId: process.env.POOL_ID,
                identityPoolId: "ap-south-1:78648954-8316-428e-94b4-05b7c94d9845",
                region: "ap-south-1",
            },
        Storage :{
            AWSS3: {
                // bucket: process.env.AWS_BUCKET,
                bucket: "freelancepay02" ,
                region: "ap-south-1",
            },
        },
        })
    },[0])

    function test() {
        downloadFile()
    }

    const downloadFile = async () => {

        let url;
        let key = "errimg.png"

        // await Storage.get(urlData[10]).then(res => {
        await Storage.get(key).then(res => {
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
            link.setAttribute('download', 'Freelance.zip'); // Set the desired file name
            document.body.appendChild(link);
            link.click();
            // setStatus(false);
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
        try{

            downloadFile()
        }catch(error) {
            alert("Error")
        }
        
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
        if (chainId !== urlData[7]){
            switchNetwork(urlData[7])
        }
    }
    const switchNetwork = async(networkID) => {
        try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: urlData[7] }],
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
            let contractAddress = ('ox' + urlData[7]);
            let ContractAdd = m[contractAddress][urlData[8]]

            const contractInstance = new ethers.Contract(ContractAdd, ERC20_ABI, signer);
            let decimals = await contractInstance.decimals();
            decimals = decimals.toString();

            const getApprove = await contractInstance.approve(accountAdd, (urlData[9] * (10**decimals)));
            // await getApprove.wait(); 
            alert("Token approved successfully:)")

            let tx = await contractInstance.transferFrom(accountAdd, urlData[6], (urlData[9]* (10**decimals) ), {gasLimit: 100000});
            await tx.wait();
            alert("Payment done successfully:)")
            setStatus(true);
            
        } catch (error) {
            alert(error)
        }
        
    }


  
    return (

        <>
        
        <div>MakePayment</div>
    
        <button onClick={test }>test</button>

        <br />
        <br />
        <br />

        <button onClick={makePayment}>{btnText}</button>
        
        </>
  )
}

export default MakePayment