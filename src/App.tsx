import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@solana/wallet-adapter-react-ui/lib/types/Button';
//import * as borsh from '@project-serum/borsh';
import '../src/css/bootstrap.css'
import {Buffer} from "buffer";
import * as BufferLayout from "@solana/buffer-layout";
import * as borsh from 'borsh';


import {
    GlowWalletAdapter,
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,

} from '@solana/wallet-adapter-wallets';
import fs from "fs";

import { clusterApiUrl, Transaction, TransactionInstruction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useCallback, useState } from 'react';

import { actions, utils, programs, NodeWallet, Connection} from '@metaplex/js'; 


const BN = require("bn.js");

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');
let thelamports = 0;
let theWallet = "9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9"
function getWallet(){

    
}

/**
* The state of a greeting account managed by the hello world program
*/
class GreetingAccount {
    counter = 0;
    constructor(fields: {counter: number} | undefined = undefined) {
      if (fields) {
        this.counter = fields.counter;
      }
    }
  }
  let greetedPubkey: PublicKey

  
  /**
   * The expected size of each greeting account.
   */
 
const App: FC = () => {
/**
 * The public key of the account we are saying hello to
 */
let greetedPubkey: PublicKey;


 /**
* Borsh schema definition for greeting accounts
*/
const GreetingSchema = new Map([
   [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
 ]);
 
 /**
  * The expected size of each greeting account.
  */




    return (
        <Context>
            <Content />
        </Context>
    );
};


export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new LedgerWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolletExtensionWalletAdapter(), 
            new SolletWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

   

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    let [lamports, setLamports] = useState(.1);
    let [wallet, setWallet] = useState("9m5kFDqgpf7Ckzbox91RYcADqcmvxW4MmuNvroD5H2r9");
    let [counterI, setCounterI] = useState(1)
    let [blockchainCounter, setBlockchainCounter] = useState("")

    // const { connection } = useConnection();
    const connection = new Connection(clusterApiUrl("devnet"))
    const { publicKey, sendTransaction } = useWallet();

    const GreetingSchema = new Map([
        [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
      ]);
 

    const onClick = useCallback(async () => {
        if (!publicKey) throw new Error('Wallet not connected');

        // Assuming you have a programId and some instructionData
        const programId = new PublicKey("G5TNPLYcRPRWpg3NFMzpxij2GQuuLAY9MAsbkez3MThP");
        //const instructionData = Buffer.from([/* Your serialized instruction data here */]);



        
       

        const instructionData: Buffer = Buffer.from(
            
            Uint8Array.of(0, ...new BN(10).toArray("le", 8)
            
            ));

             const data_b = borsh.serialize(
              GreetingSchema,
              new GreetingAccount(),
              
            )

//NO

        const layout = BufferLayout.struct([BufferLayout.u32("counter")])
        let data: Buffer = Buffer.alloc(layout.span);
        layout.encode({counter:counterI}, data);
        greetedPubkey = new PublicKey("HJgsAeHzKRN1gap9Kz7rNkXQY9rEA3do5tJ4epX4cA56");

        const instruction = new TransactionInstruction({
            keys: [
              {pubkey: greetedPubkey, isSigner: false, isWritable: true}],
                programId,
            data: data
            
            
        })

        const transaction = new Transaction().add(instruction);
        const signature = await sendTransaction(transaction, connection);
        console.log("Transaction signature", signature);
        reportGreetings()

        // Additional logic to confirm the transaction may go here
    }, [publicKey, sendTransaction, connection]);

    async function reportGreetings(): Promise<void> {
        greetedPubkey = new PublicKey("HJgsAeHzKRN1gap9Kz7rNkXQY9rEA3do5tJ4epX4cA56");

        const accountInfo = await connection.getAccountInfo(greetedPubkey);
        if (accountInfo === null) {
          throw 'Error: cannot find the greeted account';
        }
        const greeting = borsh.deserialize(
          GreetingSchema,
          GreetingAccount,
          accountInfo.data,
        );
        setBlockchainCounter(greeting.counter+"")
        console.log(
          greetedPubkey.toBase58(),
          'has been greeted',
          Number(greeting.counter),
          'time(s)',
        );
      }
function setTheLamports(e: any)
{
    console.log(Number(e.target.value));
    setCounterI(Number(e.target.value));
}
function setTheWallet(e: any){
    setWallet(e.target.value)
    theWallet = e.target.value;
}
    return (
       

        <div className="App">
                <div className="navbar">
        <div className="navbar-inner ">
          <a id="title" className="brand" href="#">Brand</a>
          <ul className="nav">


          </ul>
          <ul className="nav pull-right">
                      <li><a href="#">White Paper</a></li>
                      <li className="divider-vertical"></li>
                      <li><WalletMultiButton /></li>

                    </ul>
        </div>
      </div>
<input value={counterI} type="number" onChange={(e) => setTheLamports(e)}></input>
        <br></br>
      <button className='btn' onClick={onClick}>Recalculate counter </button>
<button onClick={reportGreetings} >Refresh Counter</button>
<p style={{color:'whitesmoke'}}>{blockchainCounter}</p>
        </div>
    );
};
