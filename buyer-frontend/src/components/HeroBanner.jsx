import React from 'react';

export default function HeroBanner() {
  return (
    <section className="relative w-full flex justify-center items-center py-10 md:py-20 px-2 md:px-0 bg-gradient-to-br from-pink-400 via-yellow-100 to-indigo-200 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-indigo-300 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/60 via-yellow-100/40 to-indigo-200/60 pointer-events-none z-0" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-10 md:gap-0">
        <div className="flex-1 flex flex-col items-start justify-center px-4 md:px-10 py-8 md:py-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight tracking-tight">
            Welcome to <span className="text-yellow-300">ShopEase</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-medium max-w-xl drop-shadow">
            Discover the best deals on building materials, home essentials, and more.<br className="hidden md:block" /> Fast delivery. Trusted brands. Unbeatable prices.
          </p>
          <a href="#hot-deals" className="inline-block bg-white text-pink-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-100 transition text-xl ring-2 ring-pink-200 hover:ring-yellow-300 focus:outline-none focus:ring-4">
            Shop Hot Deals
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center relative min-h-[220px] md:min-h-[320px]">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-200 opacity-40 rounded-full blur-2xl z-0" />
          <img
            src="/banner-hero.png"
            alt="ShopEase Hero"
            className="relative z-10 w-64 h-64 md:w-96 md:h-96 object-contain drop-shadow-2xl rounded-2xl bg-white/40 border border-yellow-100"
            style={{ maxWidth: '100%', maxHeight: '380px' }}
            onError={e => (e.target.style.display = 'none')}
          />
        </div>
      </div>
    </section>
  );
}
