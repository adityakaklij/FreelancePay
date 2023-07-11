import { useState } from 'react';
import GenerateURL from './Components/GenerateURL';
import AWSStorage from './Components/AWSStorage';
import MakePayment from './Components/MakePayment';




function App() {

  
  return (
    <>
      <GenerateURL/>

      <br />
      <br />
      <br />
      {/* <AWSStorage/> */}
      <MakePayment/>  
    </>
  );
}

export default App;
