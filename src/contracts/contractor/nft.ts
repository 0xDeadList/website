import { ethers } from 'ethers';
import contractABI from '../abi/nft.json';
import { nftContractAddress } from './constants';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const nftContract = new ethers.Contract(
  nftContractAddress,
  contractABI,
  provider.getSigner(),
);
