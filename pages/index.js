import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import styles from '../styles/Home.module.css'

export default function Home() {

  const {email, password, sendToken, createToken} = useContext(UserContext)

  return (
    <main>
      <h1 className='red_text'>Home page</h1>
      <h2 className={styles.rainbow_text}>Some rainbow text</h2>
      <h1 className='red_text'>Content data</h1>
         <h5>Email: {email}</h5>
         <h5>Password: {password}</h5>
        <h5>Send: {sendToken}</h5>
         <h5>Create: {createToken}</h5>
    </main>
  );
}
