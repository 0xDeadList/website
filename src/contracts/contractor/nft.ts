import { ethers } from 'ethers';
import contractABI from '../abi/nft.json';
import { nftContractAddress } from './constants';

const provider = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum)
  : null;

export const nftContract = provider
  ? new ethers.Contract(nftContractAddress, contractABI, provider.getSigner())
  : null;
