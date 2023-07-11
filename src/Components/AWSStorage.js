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
                identityPoolId:'',
                region:'ap-south-1',
            },
        Storage :{
            AWSS3: {
                bucket:"freelancepay02",
                region:'ap-south-1',
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

        let key = "remix-backup-at-19h51min-2023-7-4.zip"
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

    const downloadFile = async() => {
        const url = 'https://freelancepay02.s3.ap-south-1.amazonaws.com/public/remix-backup-at-19h51min-2023-7-4.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2Z5Q7QNVI7RUZ35K%2F20230711%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230711T085001Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCmFwLXNvdXRoLTEiRzBFAiEA9HYGePER6QQgni7g9cgQDXW3XaSK3QxesQYMhimVvvsCIDMwdXaLlZSeHwit0aU4WsdW3hCfdKJa6OQseGtESzzbKpIGCLr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNzQyODYzNjM1MzA2Igz9mOzOc2Ef5MyrFSMq5gWKPLJ0L%2BxoROmgQwhrkR8siHYEoKxenzNmHYgo4ZBCAwY6dOah7lrJaBizzxDyedijOhAlcGsDq1kWpe%2Fs4PNvCsnDlp6KtiaprOY8tJeJu6oBVR6Z334iuCJMN4a8moZtlMhho50PjvKrBtK8x%2FuL1BNaZFd5KKkL94wgwNmqf0h9qI2r3AaPr9HshEnKXOsBxjh8URH44Gybyi5H2yDwr6nHPtNbunM7LB4f9U2tXo1Oec1D%2BUaptv08KgeaxOAqe5C95lpmcQ65zDdUYcHx171xgMu%2B%2BnQjMJHionZw1B9rGebnW5KRDuT%2BQOVVomF0cJ397xMx%2FQ5MeLhx%2BfIOzY%2FuNbeHN9DZoTrJ15JXXRrnfW9zSWSK5Zf9Oa9Y4rQC361bZZcoStuTAXc7vjFklV0Oz1lVLJ1xefZgwnYgGKAZKWW8CMlrz2kRzjkRxflyQiRKa7FawFqOjhiqTD%2BJnmWO6g%2BD34424mp2tyKYk4hrCx6NK4mXwM1X%2BX1Q1IhgoIqOty44UIqi1POsRAfo3nzSVxH%2FIKjFSBo7sDIbiTO096PsqYRFsgQF1FmI0kFQ%2F5AJdclrIT685EHXe%2B2l7XDlO8pTA4Jwl0hd3fRExbNf2UR6TYA4sjrzEVoCSFj74e8TkaZRMhJx%2Fy1NiLu1WtEvH4xzocMw6yPc%2F5h1QwKpMui0%2FRHqN8TUyFk2ucau4j0%2FTsXrpULMoHYwNcZnhei%2FcnNKSKU%2BrwLgaSClxLGBAhjtF8nKS9RqG8qFIaBjK0IQ7pPbQ8aqO1x4O9OMqGqEDFFWbfsDC9vio0uTi6cogvale5SDBbDX6Y9AbaoLg0PKQbCMK5wBT5iWd%2F1DjuQJ71y6403BIJSz1QASENi%2FKXkAfFkbWOsVfAhgWiGj66JMzFnNsKBvaGNraYDI5Tj7t9pTWFkJi4ql8JANE1POkdgssJAtXZT9s1ckc2zQxGtf6%2F1Hxp7lywyHrnmUQ0rzJfkcMLmvtKUGOocCR9m88WP9s5lLXr%2B5wArNiQkbf81LxbcXj6o740wd%2B%2BQZ43hEvXuFQtVt1pq7T1W3sn2FAfeuiCK9kDjWvImrEY8yPvV5AQZ2rR%2Bs1gdloq4KUAUUnrm9FN75KxhcqCzU0qfvUMyxh7K3769ddfPaT79y74pIN9HyLdCW1JdmTWt7uu%2BSdSfFxZafTql6X3miDXME%2F2r8vFAX1nfkJFO71miACu5ksFg4aFBG%2Bub%2B2T2mFcvXaIc%2FLsOMS68O%2FpRi14mQpx%2FSvII%2FucHGZCYdfRBGPuKMKBw3hMIhfyxb4oPcsCVOjOG4wf3ip0P5Qo%2BONDUhuqWzg1MYtzXT%2B3Wz4M4QgXT%2B%2Bk8%3D&X-Amz-Signature=78c96ec60c2f6832c81deddbd2c6fc9d64a68ef6fea0f4333d22317b531e8ec0&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.4%20os%2FmacOS%2F10.15.7%20lang%2Fjs%20md%2Fbrowser%2FChrome_114.0.0.0%20api%2Fs3%2F3.6.4%20aws-amplify%2F5.3.3%20storage%2F2%20framework%2F1&x-id=GetObject'
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

    return (
    <>
        <h3>AWS S3 storage and reterival</h3>

        <input ref = {ref} type="file" onChange={handelFileLoad} />

        <br /><br />
        <button onClick={getFile}>getFile</button>
        

        <br /><br />
        <button onClick={downloadFile}>test</button>

    </>
  )
}

export default AWSStorage