import React, { useState,useEffect, useRef } from 'react'
import { Amplify } from '@aws-amplify/core'
import { Storage } from 'aws-amplify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


function AWSStorage() {
    const [ID, setID] = useState();
    const ref = useRef(null);
  
    useEffect(() => {
        Amplify.configure({
            Auth:{
                identityPoolId:process.env.POOL_ID,
                region:process.env.REGION,
            },
        Storage :{
            AWSS3: {
                bucket:process.env.AWS_BUCKET,
                region:process.env.REGION,
            },
        },
        })
    },[])

    const handelFileLoad = () => {
        
        // const filename = ref.current.files[0].name;
        const filename = generateID();
        Storage.put(filename, ref.current.files[0]).then(resp => {
            console.log(resp);
        }).catch(err => {console.log(err)});
    }

    const getFile = async() => {
        // let fil; 
        // await Storage.list('').then(files => {
        //     fil = files 
        //     console.log(files)
        // })
        // let key = "AK_QR.png"
        // let key = "errimg.png"

        // let key = "remix-backup-at-19h51min-2023-7-4.zip"
        let key = "e7f9173b"
        Storage.get(key).then(res => {
            axios.get(res)
            console.log(res);
        }).catch(err => {console.log(err)});

    }

    const generateID = () => {
        let m = uuidv4()
        setID(m.slice(0,8));
        return (m.slice(0,8));

    }

    const downloadFile = async () => {
        let url;
        let key = "8192baa6"
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
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
            alert("Something went wrong :(");
        });
    }

    return (
    <>
        <h3>AWS S3 storage and reterival</h3>

        <input ref = {ref} type="file" onChange={handelFileLoad} />

        <br /><br />
        <button onClick={getFile}>getFile</button>
        

        <br /><br />
        <button onClick={downloadFile}>downloadFile</button>

    </>
  )
}

export default AWSStorage