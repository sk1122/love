import React, { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { ethers } from 'ethers'
import abi from '../abi.json'
import { toast } from 'react-toastify'

const CONTRACT_ADDRESS = "0x77848747CF7aE80310b081CB4926e52270E0baA5"

const supabase = createClient(
	'https://jetiljetyojmgdcmehxy.supabase.co/',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldGlsamV0eW9qbWdkY21laHh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ3NTY3ODAsImV4cCI6MTk2MDMzMjc4MH0.XIfxvSYzkAcvNL2gVJ9D5BLiQQ6Ky5C_mz3C98lyNWM'
)

type Props = {
  title: string
  button: string
  button2: string
  button_href: string
  button2_href: string
  audio: string
  receiver: string
  name: string
  message: string
  value: string
}

const Detail = (props: Props) => {
  const [account, setAccount] = useState('')
  const giftNFT = async () => {
    console.log(props.audio)
    const data = {
      address: props.receiver, // change address to owner
      song: props.audio
    }
    
    await mint()
    
    await supabase.from('songs').insert([data])
  }

  const redeemNFT = () => {
    redeem()
  }

  async function connectWallet() {
    try {
			const { ethereum } = window;
		
			if (ethereum) {
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				});
		
				if (accounts.length !== 0) {
					console.log(accounts)
					setAccount(accounts[0])
					console.log("Found");
				} else {
					console.log("Not Found");
				}
			} else {
				console.log("Install Metamask");
			}
		} catch (e) {
			console.log(e);
		}
  }

  async function mint() {
    try {
      connectWallet()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  
      let txn1 = await contract.mint(props.receiver, props.name, props.message, {value: ethers.utils.parseEther(props.value)});
      let wait = await txn1.wait();
      toast.success('Minted NFT to ' + props.receiver)
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  async function redeem() {
    try {
      connectWallet()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  
      let txn1 = await contract.redeem();
      let wait = await txn1.wait();

      toast.success('Redeemed NFT, check on Opensea')
    } catch (e: any) {
      toast.error(e.data.message)  
    }
  }


  return (
    <div className="flex w-full flex-col items-center">
      <div className="mx-10 md:ml-20">
        <div className="text-gabriola mb-4 text-4xl text-[#C24B66]">
          GIFT YOUR LOVED ONE A LOVELY NFT ON THIS VALENTINE
        </div>
        <div className="text-gabriola mb-4 text-8xl text-[#912235]">
          {props.title}
        </div>
        <div className="text-gabriola mb-10 text-3xl text-[#C24B66]">
          Your Gifts will be sent on 12 AM IST, 15th Feburary, they will know
          who sent it and all the details associated with it, every NFT will be
          directly minted to their wallet address which can be viewed from
          opensea or rarible
        </div>
        <div className="flex space-x-4">
          <button onClick={() => props.button === "GIFT A NFT" ? giftNFT() : redeemNFT()} className="text-gabriola cursor-pointer rounded-xl bg-[#912235] py-4 px-8 text-lg text-white">
            {props.button}
          </button>
          <Link href={props.button2_href}>
            <button className="text-gabriola cursor-pointer rounded-xl bg-[#912235] py-4 px-8 text-lg text-white">
              {props.button2}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Detail
