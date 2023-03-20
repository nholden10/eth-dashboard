import Head from "next/head";
import Image from "next/image";

import Header from "../components/Header";
import MainDash from "../components/MainDash";

import styles from "@/styles/Dashboard.module.css";

import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [etherBalance, setEtherBalance] = useState("");

  useEffect(() => {
    const checkForInjectedProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log(accounts);
        setConnectedAccount(accounts[0]);
        const balance = await provider.getBalance(accounts[0]);
        setEtherBalance(balance);
      } else {
        console.log("No injected provider found. Download Metamask!");
      }
    };
    checkForInjectedProvider();
  }, []);

  const connectToMetamask = async () => {
    try {
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      setConnectedAccount(accounts[0]);

      console.log("Account connected: ", accounts[0]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const disconnectMetamask = async () => {
    try {
      if (window.ethereum.isConnected()) {
        await window.ethereum.request({ method: "eth_logout" });
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        setConnectedAccount(null);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const renderContent = () => {
    if (connectedAccount) {
      return (
        <>
          <button className={styles.walletButton} onClick={disconnectMetamask}>
            Connected
          </button>
        </>
      );
    } else {
      return (
        <button onClick={connectToMetamask}>Connect using Metamask!</button>
      );
    }
  };

  return (
    <>
      <Head>
        <title>Eth Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <MainDash
          account={connectedAccount}
          balance={ethers.utils.formatEther(etherBalance.toString())}
        />
        <div className={styles.description}>{renderContent()}</div>
      </main>
    </>
  );
}
