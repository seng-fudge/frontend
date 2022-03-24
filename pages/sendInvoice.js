import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function SendInvoice() {
  return (
    <main>
      <h1 className='red_text'>Home page</h1>
      <h2 className={styles.rainbow_text}>Some rainbow text</h2>
    </main>
  );
}
