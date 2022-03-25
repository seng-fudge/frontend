import { useContext } from 'react';
import { UserContext } from '../lib/context';
import styles from '../styles/Home.module.css'

export default function Test() {

    const {email, password, sendToken, createToken} = useContext(UserContext)
  
    return (
      <main>
        <h1 className='red_text'>Content data</h1>
        {email ? <h5>Email: {email}</h5>:<></>}
        {password ? <h5>Password: {password}</h5>:<></>}
        {sendToken ? <h5>Send: {sendToken}</h5>:<></>}
        {createToken ? <h5>Create: {createToken}</h5>:<></>}
      </main>
    );
  }