import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import loginStyles from login.css

export default function Home() {
  return (
    <main>
      <h1 className='red_text'>Home page</h1>
      <h2 className={loginStyles.title}>Sign up</h2>
    </main>
  );
}
