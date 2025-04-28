"use client"
import { useState } from "react";
import ConnectWalletTab from "./ConnectWalletTab";
import Step1 from "./Step1";
import Step2 from "./Step2";

const ConnetWalletForm = () => {
    const [tabName, setTabName] = useState<string>("step-1")
    const renderTab = () => {
        switch (tabName) {
            case "step-1":
                return <Step1 setTabName={setTabName} />

            case "step-2":
                return <Step2 />


            default:
                return <Step1  setTabName={setTabName}/>

        }
    }
    return (
        <>
            <div className="w-full h-full p-10" >
                <ConnectWalletTab tabName={tabName} setTabName={setTabName} />

                {renderTab()}
            </div>
        </>
    );
}

export default ConnetWalletForm;