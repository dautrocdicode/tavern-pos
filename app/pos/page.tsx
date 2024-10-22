"use client"
import { useEffect, useState } from "react";
import { FaBeer, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';
import { NetworkId, useWallet } from '@txnlab/use-wallet-react';
import React from "react";
import algosdk from 'algosdk';
import { useRouter } from 'next/navigation';

interface Beer {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function Pos() {
  const {
    algodClient,
    activeAddress,
    setActiveNetwork,
    transactionSigner,
    wallets
  } = useWallet();
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const isConnectedToWallet = !!accountAddress;
  const [beers] = useState<Beer[]>([
    { id: 1, name: "Cold Beer", price: 5, description: "Fresh cold beer" },
    { id: 2, name: "Black Beer", price: 7, description: "Rich black beer" },
    { id: 3, name: "Craft Beer", price: 8, description: "Special craft beer" },
    { id: 4, name: "IPA Beer", price: 9, description: "Rich IPA beer" },
    { id: 5, name: "Lager Beer", price: 6, description: "Fresh Lager beer" },
    { id: 6, name: "Pale Ale Beer", price: 8, description: "Light Pale Ale beer" },
    { id: 7, name: "Porter Beer", price: 10, description: "Rich Porter beer" },
    { id: 8, name: "Stout Beer", price: 11, description: "Dark Stout beer" },
    { id: 9, name: "Wheat Beer", price: 7, description: "Light Wheat beer" },
    { id: 10, name: "Sour Beer", price: 12, description: "Sour Sour beer" },
    { id: 11, name: "Fruit Beer", price: 9, description: "Fruit flavored beer" },
    { id: 12, name: "Belgian Beer", price: 13, description: "Belgian style beer" },
    { id: 13, name: "Amber Beer", price: 10, description: "Amber colored beer" },
  ]);
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const savedAddress = localStorage.getItem('receiverWalletAddress');
    if (!savedAddress) {
      router.push('/setup');
    } else {
      setReceiverAddress(savedAddress);
    }
  }, [router]);

  function handleConnectWalletClick() {
    wallets[0]
      .connect()
      .then((newAccounts) => {
        setAccountAddress(newAccounts[0].address);
        setActiveNetwork(NetworkId.TESTNET);
        wallets[0].setActiveAccount(newAccounts[0].address)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDisconnectWalletClick() {
    wallets[0].disconnect();
    setAccountAddress(null);
  }

  function addToCart(beerId: number) {
    setCart(prevCart => ({
      ...prevCart,
      [beerId]: (prevCart[beerId] || 0) + 1
    }));
  }

  function removeFromCart(beerId: number) {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[beerId] > 1) {
        newCart[beerId]--;
      } else {
        delete newCart[beerId];
      }
      return newCart;
    });
  }

  const totalAmount = Object.entries(cart).reduce((total, [beerId, quantity]) => {
    const beer = beers.find(b => b.id === Number(beerId));
    return total + (beer ? beer.price * quantity : 0);
  }, 0);

  async function handlePayment() {
    if (!accountAddress || !activeAddress) {
      alert('Please connect your wallet before making a payment.');
      return;
    }

    try {
      const atc = new algosdk.AtomicTransactionComposer()
      const suggestedParams = await algodClient.getTransactionParams().do()
      const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        suggestedParams: suggestedParams,
        from: accountAddress,
        to: receiverAddress, // Use the saved wallet address
        amount: totalAmount * 1000000, // Convert ALGO to microALGO
      });
      
      atc.addTransaction({ txn: transaction, signer: transactionSigner })

      const result = await atc.execute(algodClient, 2)
      console.info(`Transaction successful!`, {
        confirmedRound: result.confirmedRound,
        txIDs: result.txIDs
      })
      alert('Payment successful!')
      setCart({}) // Clear the cart after payment
    } catch (error) {
      console.error('Error during transaction:', error)
      alert('An error occurred during payment. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-yellow-100 text-gray-800">
      <header className="bg-amber-600 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <FaBeer className="mr-2" />
            Tavern POS
          </h1>
          <button
            className="bg-yellow-400 text-amber-800 px-4 py-2 rounded-full flex items-center hover:bg-yellow-300 transition duration-300"
            onClick={isConnectedToWallet ? handleDisconnectWalletClick : handleConnectWalletClick}
          >
            {isConnectedToWallet ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-8 flex">
        <div className="w-2/3 pr-8">
          <h2 className="text-2xl font-semibold mb-4 text-amber-800">Beer List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beers.map((beer) => (
              <div key={beer.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-amber-200">
                <div className="p-4">
                  <h3 className="font-semibold text-xl mb-1 text-amber-700">{beer.name}</h3>
                  <p className="text-gray-600 mb-2">{beer.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-600">{beer.price} ALGO</span>
                    <div className="flex items-center">
                      <button
                        className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition duration-300"
                        onClick={() => removeFromCart(beer.id)}
                      >
                        <FaMinus />
                      </button>
                      <span className="mx-2 font-bold">{cart[beer.id] || 0}</span>
                      <button
                        className="bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition duration-300"
                        onClick={() => addToCart(beer.id)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4 text-amber-800 flex items-center">
              <FaShoppingCart className="mr-2" />
              Cart
            </h2>
            {Object.keys(cart).length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <>
                {Object.entries(cart).map(([beerId, quantity]) => {
                  const beer = beers.find(b => b.id === Number(beerId));
                  return beer ? (
                    <div key={beerId} className="flex justify-between items-center mb-2">
                      <span>{beer.name} x {quantity}</span>
                      <span>{beer.price * quantity} ALGO</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t pt-2 mt-2">
                  <p className="font-bold flex justify-between items-center text-lg">
                    <span>Total:</span>
                    <span>{totalAmount} ALGO</span>
                  </p>
                </div>
                <button
                  className="mt-4 bg-amber-500 text-white w-full py-2 rounded-full hover:bg-amber-600 transition duration-300"
                  onClick={handlePayment}
                >
                  Pay
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-amber-700 text-white p-4 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Tavern POS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
