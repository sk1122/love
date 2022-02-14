import Head from 'next/head'

import Detail from '../components/Detail'
import Card from '../components/Card'
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
// import toast from "../components/Toast";
import 'react-toastify/dist/ReactToastify.css';


interface Props {
  nft: any
  setNFT: any
  audio: string
  setAudio: Function
  name: string
  setName: Function
  desc: string
  setDesc: Function
  home: boolean
  setHome: Function
  receiver: string
  setReceiver: Function
  notify: Function
  value: string
  setValue: Function
}

function blobToBase64(blob: any) {
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

export default function Home({ nft, setNFT, audio, setAudio, name, setName, desc, setDesc, home, setHome, receiver, setReceiver, notify, value, setValue }: Props) {
  const { audioResult, timer, startRecording, stopRecording, status } =
    useAudioRecorder()

  useEffect(() => {
    // Audio URL
    fetch(audioResult).then(d => d.blob()).then(s => {
      blobToBase64(s).then(s => setAudio(s))
    })
  }, [audioResult])

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    toast.configure();

  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-[#FFDDEB] to-[#FFCCD5]">
      <Head>
        <title>onchainheart</title>
        <link rel="shortcut icon" href="https://pbs.twimg.com/profile_images/1492844146465599488/lcpIKQSH_400x400.jpg" type="image/x-icon" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sk1122_" />
        <meta name="twitter:creator" content="@sk1122_" />
        <meta property="og:url" content="https://onchainheartz.xyz" />
        <meta property="og:title" content="onchainheartz - From your Wallet to your valentines heart" />
        <meta property="og:description" content="Your Gifts will be sent on 12 AM IST, 15th Feburary, they will know who sent it and all the details associated with it, every NFT will be directly minted to their wallet address which can be viewed from opensea or rarible" />
        <meta property="og:image" content="https://i.imgur.com/JRQEYlw.jpeg" />
      </Head>
      <div
        className="flex flex-col items-center justify-center  py-2 pt-20
    xl:flex-row xl:pt-0"
      >
        <Detail
          title="From your Wallet to 
your valentines heart"
          button="GIFT A NFT"
          button2="REDEEM A NFT"
          button_href="/"
          button2_href="/redeem"
          audio={audio}
          name={name} 
          message={desc} 
          receiver={receiver}
          value={value}
        />
        <div className="mt-20 flex w-full justify-center xl:mt-0">
          {setHome(true)}
          <Card isHome={home} name={name} setName={setName} desc={desc} setDesc={setDesc} receiver={receiver} setReceiver={setReceiver} value={value} setValue={setValue} />
        </div>
      </div>
      {/* recording section */}
      <div className="mb-20 flex flex-col items-center justify-center">
        <div className="text-gabriola text-2xl text-[#C24B66]">
          Record a message and add it to your gift
        </div>
        <a
          className="text-gabriola mb-8 text-2xl text-[#C24B66]"
          href={audioResult}
          download="test"
        >
          Status : <b className="text-gray-400">{status}</b>
        </a>
        <div>
          {/* <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p> */}
          <div className="flex space-x-6">
            <button onClick={startRecording}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--zondicons text-green-400"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9 18v-1.06A8 8 0 0 1 2 9h2a6 6 0 1 0 12 0h2a8 8 0 0 1-7 7.94V18h3v2H6v-2h3zM6 4a4 4 0 1 1 8 0v5a4 4 0 1 1-8 0V4z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>

            <button onClick={stopRecording}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--subway text-red-400"
                width="32"
                height="32"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 512 512"
              >
                <path
                  d="M465.5 0h-419C20.9 0 0 20.9 0 46.5v418.9C0 491.1 20.9 512 46.5 512h418.9c25.7 0 46.5-20.9 46.5-46.5v-419C512 20.9 491.1 0 465.5 0z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
