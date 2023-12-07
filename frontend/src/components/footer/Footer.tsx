import React from 'react'

const Footer = () => {
  return (
    <footer className="py-4 bg-black text-yellow-400 text-center">
      <p>&copy; 2023 PawProfile Pro. All rights reserved.</p>
      <div className="mt-2">
        <a href="/about" className="mx-2">About Us</a>
        <a href="/contact" className="mx-2">Contact Us</a>
        <a href="/privacy" className="mx-2">Privacy Policy</a>
      </div>
    </footer>
  );
  
}

export default Footer