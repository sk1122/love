import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
// import toast from "../components/Toast";
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    ethereum: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [audio, setAudio] = useState('')
  const [home, setHome] = useState(true)
  const [name, setName] = useState(home ? 'Name of your special someone' : 'Your Name')
  const [desc, setDesc] = useState(home ? 'Leave a beautiful message for them' : 'Your Special Message')
  const [value, setValue] = useState('')
  const [receiver, setReceiver] = useState('')

  const notify = () => toast("Wow so easy!");

  return <Component {...pageProps} audio={audio} setAudio={setAudio} name={name} setName={setName} desc={desc} setDesc={setDesc} home={home} setHome={setHome} receiver={receiver} setReceiver={setReceiver} notify={notify} value={value} setValue={setValue} />
}

export default MyApp
