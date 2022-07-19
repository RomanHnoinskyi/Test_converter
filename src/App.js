import './App.css';
import {useEffect, useState} from "react";
import {URLLINK} from "./const";
import Input from "./Input";

function App() {

    const [info, setInfo] = useState([])
    const [amount1, setAmount1] = useState(1)
    const [amount2, setAmount2] = useState(1)
    const [currency1, setCurrency1 ] = useState('UAH')
    const [currency2, setCurrency2 ] = useState('USD')

    const xxx =  new Object()
    xxx.UAH = 1

    useEffect( () => {
        fetch(URLLINK)
            .then(response => response.json())
             .then(data => setInfo(data))
    },[])


    function format(number) {
        return number.toFixed(4);
    }

    for (const item of info) {
        Object.defineProperty(xxx, item.ccy, {
          value: Number(item.buy),
            enumerable:true
        })
    }

    function handleAmount1Change (amount1) {
        setAmount2( format(amount1 * xxx[currency2] / xxx[currency1]))
        setAmount1(amount1)
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * xxx[currency2] / xxx[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * xxx[currency1] / xxx[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * xxx[currency1] / xxx[currency2]));
        setCurrency2(currency2);
    }

  return (
    <div className="App">
       <div className='card'>
           <div className='header'>
               <div className='monitor'>
                   <h4>USD Buy: {Object(info[0]).buy}, Sale: {Object(info[0]).sale} </h4>
               </div>
               <div className='monitor'>
                   <h4>EUR  Buy: {Object(info[1]).buy},  Sale: {Object(info[1]).sale} </h4>
               </div>
           </div>
           <div className='header'>
               <div>
                   <Input
                       currencies = {Object.keys(xxx)}
                       currency = {currency2}
                       onAmountChange ={handleAmount1Change}
                       onCurrencyChange = {handleCurrency1Change}
                       amount={amount1}

                   />
               </div>
               <div>
                   <Input
                       currencies = {Object.keys(xxx)}
                       currency = {currency1}
                       onCurrencyChange = {handleCurrency2Change}
                       amount = { amount2 }
                       onAmountChange ={handleAmount2Change}
                   />
               </div>
           </div>

        </div>
    </div>
  );
}

export default App;
