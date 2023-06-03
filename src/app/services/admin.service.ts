import { Injectable, OnInit } from '@angular/core';
import Web3 from 'web3';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import * as contractJson from '../../assets/contracts/DocumentVerification.json';
import { environment } from 'src/environments/environment';
import detectEthereumProvider from '@metamask/detect-provider';
import Swal from 'sweetalert2'

declare let window: any;
const defaultNetwork: string = 'mumbai';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private accounts: string[] | undefined;
  private contract: any;
  private provider: any;

  private isWalletConnected = new BehaviorSubject<boolean>(false);
  isWalletConnected$ = this.isWalletConnected.asObservable();

  private walletNetworkSource = new BehaviorSubject<string>(defaultNetwork); // Can be initialized with 'mumbai' or 'polygon'
  walletNetwork$ = this.walletNetworkSource.asObservable();


  constructor() {
    detectEthereumProvider().then(result => {
      this.provider = result;
      console.log(result)
      if (this.provider) {
        // From now on, this should always be true:
        // provider === window.ethereum
        if (this.provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?');
        } else {
          this.connectWallet()
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Metamask not found',
          text: 'Please install metamask!',
          footer: '<a target="_blank" href="https://metamask.io/download/">Install Metamask?</a>'
        })
      }
    })

    window.ethereum.on('chainChanged', (chainId: string) => {
      if(chainId != "0x13881" && chainId != "0x89" ) {
        Swal.fire(
          'Network not supported',
          'Switch to Polygon or Mumbai testnet'
          )
      }
    });

    window.ethereum.on('accountsChanged',(accounts:any) => {
      console.log("account changed via wallet", accounts)
      this.accounts = accounts;
    });
    this.initializeContract(new Web3(window.ethereum));
  }

  async connectWallet() {
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then((accounts: any) => {
        this.accounts = accounts;
        console.log("account connected", accounts)
        this.isWalletConnected.next(true);
        this.changeNetwork(defaultNetwork);
      })
      .catch((err: any) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      })
  }

  async disconnectWallet() {

  }

  async changeNetwork(network: string) {
    let chainId;
    switch (network) {
      case 'mumbai':
        chainId = '0x13881'; // Mumbai Testnet
        break;
      case 'polygon':
        chainId = '0x89'; // Polygon Mainnet
        break;
      default:
        return;
    }

    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    }).then((data: any) => {
      this.walletNetworkSource.next(network);
    }).catch((switchError: any) => {
      if (switchError.code === 4902) {
        this.addEthereumChain(network)
      }
    })
  }

  async addEthereumChain(network: string) {
    let params;
    switch (network) {
      case 'mumbai':
        params = {
          chainId: '0x13881', // Mumbai Testnet Chain ID
          chainName: 'Mumbai Testnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
          },
          rpcUrls: ['https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78'],
          blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        };
        break;
      case 'polygon':
        params = {
          chainId: '0x89', // Polygon Mainnet Chain ID
          chainName: 'Polygon Mainnet',
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
          },
          rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
          blockExplorerUrls: ['https://polygonscan.com/'],
        };
        break;
      default:
        return;
    }

    window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [params],
    }).then((data:any)=>{
      console.log(data)
      this.walletNetworkSource.next(network);
    }).catch((err:any)=>{
      console.error(err)
    })
  }

  private async initializeContract(web3:any) {
    if (web3) {
      console.log("Initialized succesfully")
      const contractJsonAny: any = contractJson;
      const networkId = await web3?.eth.net.getId();
      const deployedNetwork = contractJsonAny.networks[networkId];
      this.contract = new web3.eth.Contract(
        contractJsonAny.abi,
        deployedNetwork && deployedNetwork.address,
      );
    }else{
      console.log("Failure encountered")
    }

  }

  addAdmin(adminAddress: string): Observable<any> {
    if (this.accounts) {
      return from(this.contract.methods.addAdmin(adminAddress).send({ from: this.accounts[0] }));
    }
    return of();
  }

  listAdmins(): Observable<any> {
    if (this.contract) {
      return from(this.contract.methods.getAdmins().call());
    }
    return of();

  }
}
