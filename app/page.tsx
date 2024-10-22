"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (walletAddress) {
      localStorage.setItem('receiverWalletAddress', walletAddress);
      router.push('/pos');
    } else {
      alert('Please enter the wallet address');
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-amber-800">Setup Tavern POS</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Enter Algorand wallet address"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 transition duration-300"
          >
            Confirm and Continue
          </button>
        </form>
      </div>
    </div>
  );
}

