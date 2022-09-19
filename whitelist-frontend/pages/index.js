import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3Modal from 'web3modal'
import {providers, Contract} from 'ethers'
import {useEffect, useRef, useState} from 'react'
import {WHITELIST_CONTRACT_ADDRESS, abi} from '../constants'
import RenderButton from '../components/button'


function Home() {

  const [walletConnected, setWalletConnected] = useState(false)

  const [joinedWhitelist, setJoinedWhitelist] = useState(false)

  const [loading, setLoading] = useState(false)

  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0)

  const web3ModalRef = useRef()


  const getProviderOrSigner = async (needSigner = false) => {

    const provider = await web3ModalRef.current.connect()

    const web3Provider = new providers.Web3Provider(provider)

    const { chainId } = await web3Provider.getNetwork()
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner()
      return signer
    }

    return web3Provider
  }

  const addAddressToWhitelist = async () => {
    try {
      
      const signer = await getProviderOrSigner(true)

      const whitelistContract = new Contract(
       WHITELIST_CONTRACT_ADDRESS,
       abi,
       signer
      )

      const tx = await whitelistContract.addAdressTowhitelist()
      setLoading(true)

      await tx.wait()
      setLoading(false)

      await getNumberOfWhitelisted()
      setJoinedWhitelist(true)

    } catch (error) {
      console.error(error)
    }
  }

  const getNumberOfWhitelisted = async () => {

    try {

      const provider = await getProviderOrSigner()

    const whitelistContract = new Contract(
      WHITELIST_CONTRACT_ADDRESS,
       abi,
       provider
    )

    const _numberOfWhitelisted = await whitelistContract.numwhitelistaddresses()
    setNumberOfWhitelisted(_numberOfWhitelisted)
      
    } catch (error) {
      console.error(error)
    }
    

  }

  const checkIfAddressInWhitelist = async () => {

    try {
      const signer = await getProviderOrSigner(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      )

      const address = await signer.getAddress()

      const _joinedWhitelist = await whitelistContract.whitelistaddresses(
        address
      )
      setJoinedWhitelist(_joinedWhitelist)

    } catch (error) {
      console.error(error)
    }
  }

  const initiateWhitelist = async () => {
    try {

      const signer = await getProviderOrSigner(true)
      const whitelistContract = new Contract(
        WHITELIST_CONTRACT_ADDRESS,
        abi,
        signer
      )
      
      const tx = await whitelistContract.addAdressTowhitelist()
      await tx.wait()
      window.alert('thank you bitch')

    } catch (error) {
      console.error(error);
      window.alert('error homie')
    }
  }

  const connectWallet = async () => {
    try {
      
      await getProviderOrSigner()
      setWalletConnected(true)

      // initiateWhitelist()

      // checkIfAddressInWhitelist()
      getNumberOfWhitelisted();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false
      })
      connectWallet()
    }

    
  }, [walletConnected])



 return (
  <div>
    <Head>
      <title> Whitelist Dapp</title>
      <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs!</h1>
          <div className={styles.description}>
            Its an NFT collection for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numberOfWhitelisted} have already joined the Whitelist
          </div>
          <RenderButton walletConnected={walletConnected}
                        joinedWhitelist={joinedWhitelist}
                        loading={loading}
                        addAddressToWhitelist={addAddressToWhitelist}
                        connectWallet={connectWallet} 
                          />
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>
        Made with &#10084; by Crypto Devs
      </footer>
  </div>
 )

}

export default Home;