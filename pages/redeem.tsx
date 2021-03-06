import Head from 'next/head'

import Detail from '../components/Detail'
import Card from '../components/Card'
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder'
import { useEffect } from 'react'

// var videoshow = require('videoshow')

interface Props {
  name: string
  setName: Function
  desc: string
  setDesc: Function
  home: boolean
  setHome: Function
  receiver: string
  setReceiver: Function
  value: string
  setValue: Function
}

export default function Redeem({ name, setName, desc, setDesc, home, setHome, receiver, setReceiver, value, setValue }: Props) {
  const { audioResult, timer, startRecording, stopRecording, status } =
    useAudioRecorder()

  useEffect(() => {
    console.log(audioResult)
  }, [audioResult])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-[#FFDDEB] to-[#FFCCD5]">
      <Head>
        <title>
          redeem - onchainheartz
        </title>
        <link rel="shortcut icon" href="https://pbs.twimg.com/profile_images/1492844146465599488/lcpIKQSH_400x400.jpg" type="image/x-icon" />
      </Head>
      <Detail
          title="Redeem your love here after 15th FEB"
          button="REDEEM A NFT"
          button2="GIFT A NFT"
          button_href="/redeem"
          button2_href="/"
          audio=""
          name={name} 
          message={desc} 
          receiver={receiver}
          value={value}
        />
    </div>
  )
}

    // <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-[#FFDDEB] to-[#FFCCD5]">
    //   <Head>
    //     <title>redeem your nft - onchainheart</title>
    //   </Head>
    //   <div
    //     className="flex flex-col items-center justify-center  py-2 pt-20
    // xl:flex-row xl:pt-0"
    //   >
    //     <Detail
    //       title="Redeem your love here"
    //       button="REDEEM A NFT"
    //       button2="GIFT A NFT"
    //       button_href="/redeem"
    //       button2_href="/"
    //       audio=""
    //       name={name} 
    //       message={desc} 
    //       receiver={receiver}
    //       value={value}
    //     />
    //     <div className="mt-20 flex w-full justify-center xl:mt-0">
    //       {setHome(false)}
    //       <Card isHome={home} name={name} setName={setName} desc={desc} setDesc={setDesc} receiver={receiver} setReceiver={setReceiver} value={value} setValue={setValue} />
    //     </div>
    //   </div>
    // </div>