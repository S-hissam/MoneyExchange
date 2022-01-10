import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'

const key = 'a16a2f1c9dc2461a479db5c3e9bbb770';
function App() {
  const [eur, setEur] = useState([])
  const [tl, setTl] = useState([])
  const [base, setBase] = useState([])
  const [amount, setAmount] = useState(1)
  const [amountInFrom, setAmountInFrom] = useState(true)


  let toAmount, fromAmount;
  if (amountInFrom) {
    fromAmount = amount
    toAmount = amount * tl;
  } else {
    toAmount = amount
    fromAmount = amount / tl;
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://api.exchangeratesapi.io/v1/latest?',
      params: {
        access_key: key,
      }
    }).then(({ data }) => {
      setBase(data.base)
      setEur([Object.keys(data.rates)[143]])
      setTl([Object.values(data.rates)[143]])
    })

  }, [])



  const submit = (e) => {
    e.preventdefault()
  }

  const handleFrom = (e) => {
    setAmount(e.target.value)
    setAmountInFrom(true)
  }
  const handleTo = (e) => {
    setAmount(e.target.value)
    setAmountInFrom(false)
  }

  return (
    <div className=" mx-auto bg-slate-900 h-screen w-full  flex flex-col items-center justify-center text-white">
      <div className='rounded-2xl bg-slate-700 w-96 p-3 shadow-2xl shadow-cyan-500/50'>
        <h1 className='text-md text-center font-bold text-cyan-300 tracking-wide '>Welcome to Money Exchange</h1>
        <h1 className='text-xs text-center font-bold text-cyan-400 tracking-wide pb-2'>Between Euro and Turkish Lira</h1>


        <form className='flex-col flex p-1 rounded text-black bg-red-100' onSubmit={submit}>
          <span>EUR:</span>
          <input className='m-2' type='text' value={fromAmount} onChange={handleFrom} />
          <span>TRY: </span>
          <input className='m-2' type='text' value={toAmount} onChange={handleTo} />
          <div></div>
        </form>
      </div>
    </div>
  );
}

export default App;


