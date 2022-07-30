import contractABI from '../abi/sbt.json';
import { ethers } from 'ethers';
import { sbtContractAddress } from './constants';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const sbtContract = new ethers.Contract(
  sbtContractAddress,
  contractABI,
  provider.getSigner(),
);
