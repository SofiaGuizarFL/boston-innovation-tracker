import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children, title = 'BostonTech Tracker' }) {
  return (
    <>
      <Head>
        <title>{title} | BostonTech Tracker</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
