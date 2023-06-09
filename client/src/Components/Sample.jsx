import React, { useState } from 'react';
import useMeta from '../MetamaskLogin/useMeta';
import axios from "axios"

export default function Sample() {
  const { state: { sampleContract, accounts } } = useMeta();

  const [randomAddre, setRandomAddre] = useState("");
  const [_randomAddre, set_RandomAddre] = useState("");
  const [owner, setOwner] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [_randomNumber, set_RandomNumber] = useState("");

  const getOwner = async () => {
    if (!accounts) {
      alert("Please Connect Wallet.");
      return;
    }
    await sampleContract.methods.owner().call({ from: accounts[0] })
      .then(e => setOwner(e))
      .catch(err => console.log(err));
  }

  const getUser = async () => {
    if (!accounts) {
      alert("Please Connect Wallet.");
      return;
    }
    await sampleContract.methods.randomAddress().call({ from: accounts[0] })
      .then(e => setRandomAddre(e))
      .catch(err => console.log(err));
  }

  const _randomAddressHandler = (e) => {
    set_RandomAddre(e.target.value);
  }

  const setRandomAddress = async () => {
    if (!accounts) {
      alert("Please Connect Wallet.");
      return;
    }
    if (_randomAddre === "") {
      alert("Please enter valid address.");
      return;
    }
    await sampleContract.methods.setRandomAddress(_randomAddre).send({ from: accounts[0] })
      .then(e => console.log(e))
      .catch(err => console.log(err));
    set_RandomAddre("");
  }

  const getNumber = async () => {
    if (!accounts) {
      alert("Please Connect Wallet.");
      return;
    }
    await sampleContract.methods.randomNumber().call({ from: accounts[0] })
      .then(e => setRandomNumber(e))
      .catch(err => console.log(err));
  }

  const _randomNumberHandler = (e) => {
    set_RandomNumber(e.target.value);
  }

  const setRandomNum = async () => {
    let response = await axios.post('http://localhost:4000/crypto/sample', {
      address: accounts[0],
      randomNumber: _randomNumber,
    });
    console.log(response);
    set_RandomNumber("");
  }

  return (
    <div>
      <h3>{`${owner ? owner : "Owner"}`}</h3>
      <button onClick={getOwner}>getOwner</button>
      <h3>{`${randomAddre ? randomAddre : "randomAddress"}`}</h3>
      <button onClick={getUser}>getUser</button><br />
      <h3>{`${randomNumber ? randomNumber : "randomNumber"}`}</h3>
      <button onClick={getNumber}>getNumber</button><br />
      <input value={_randomNumber} onChange={_randomNumberHandler}></input>
      <button onClick={setRandomNum}>setRandomNumber</button><br />
      <input value={_randomAddre} onChange={_randomAddressHandler}></input>
      <button onClick={setRandomAddress}>setRandomAddress</button><br />
    </div>
  )
}
