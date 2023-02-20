import React from 'react';
import Bodycontent from './Bodycontent';
import Footer from './Footer';
import './css/Homepage.css';
import './css/Home_mobile.css';
import Navbar from './Navbar';
import Scrollbutton from './Scrollbutton';

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Bodycontent />
      <Footer />
      <Scrollbutton />
    </div>
  );
}
