import React from "react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { Layout } from "antd";
import { Home } from "./components";
import { INFURA_ID } from "./constants";

const VRFCordABI = require("@chainlink/contracts/abi/v0.6/VRFCoordinator.json")
  .compilerOutput.abi;
const VRFCordAdd = "0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9";
const Provider = new JsonRpcProvider("https://kovan.infura.io/v3/" + INFURA_ID);
const VRFCordContract = new Contract(VRFCordAdd, VRFCordABI, Provider);

function App() {
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Home contract={VRFCordContract} provider={Provider} />
      </Layout>
    </div>
  );
}

export default App;
