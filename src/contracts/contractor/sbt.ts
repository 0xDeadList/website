import contractABI from '../abi/sbt.json';
import { ethers } from 'ethers';
import { sbtContractAddress } from './constants';

const provider = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum)
  : null;

export const sbtContract = provider
  ? new ethers.Contract(sbtContractAddress, contractABI, provider.getSigner())
  : null;
