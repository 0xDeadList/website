import { ethers, Wallet } from 'ethers';
import contractABI from '../abi/tombstone.json';
import { mainContractAddress } from './constants';

const provider = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum)
  : null;
export const dlContract = provider
  ? new ethers.Contract(mainContractAddress, contractABI, provider.getSigner())
  : null;

const LOCK_TIME = 129600;

export const handleLockAddress = async (
  walletToBury: Wallet,
  localAddress?: string,
) => {
  if (!provider) {
    console.error(
      'No ethereum detected, please install MetaMask or any other wallet first.',
    );
    return;
  }
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const isSuicide = !localAddress; //  本地没有登陆就是自杀
  const addressToBury = walletToBury.address;
  const blockNum = (await provider.getBlockNumber()) - 10;
  const blockInfo = await provider.getBlock(blockNum);
  const lockTimeBinary = ethers.utils.zeroPad(
    ethers.utils.arrayify(LOCK_TIME),
    32,
  );
  const addrBinary = ethers.utils.arrayify(localAddress ?? addressToBury); // 本地没有登陆就是自杀
  const blockHashBinary = ethers.utils.arrayify(blockInfo.hash);
  const binary_data = ethers.utils.concat([
    addrBinary,
    lockTimeBinary,
    blockHashBinary,
  ]);

  const signature = await walletToBury.signMessage(binary_data);

  const contract = isSuicide
    ? new ethers.Contract(mainContractAddress, contractABI, walletToBury)
    : dlContract;

  return contract!.lockAddress(addressToBury, signature, LOCK_TIME, blockNum);
};

export const handleBuryAddress = (walletToBury: Wallet) => {
  return dlContract!.buryAddress(walletToBury.privateKey);
};

export const checkLock = (walletToBury?: Wallet) => {
  if (!walletToBury) return;
  return dlContract!.isAddressLocked(walletToBury.address);
};

export const checkDead = (walletToBury?: Wallet) => {
  if (!walletToBury) return;
  return dlContract!.isAddressDead(walletToBury.address);
};

// export const buryAddress = async (privateKey: string, mint: boolean) => {
//   const message = await dlContract!.methods
//     .buryAddress(privateKey, mint)
//     .call(handleMessage);
//   return message;
// };

// export const getDeadAddress = async (privateKey: string) => {
//   const message = await dlContract!.methods
//     .getDeadAddress(privateKey)
//     .call(handleMessage);
//   return message;
// };

// export const lockAddress = async (v: string, r: string, s: string) => {
//   const message = await dlContract!.methods
//     .lockAddress(v, r, s)
//     .call(handleMessage);
//   return message;
// };

// export const verifyBurier = async (dead_addr: string, burier_addr: string) => {
//   const message = await dlContract!.methods
//     .verifyBurier(dead_addr, burier_addr)
//     .call(handleMessage);
//   return message;
// };

// export const checkLockInfo = async (address: string) => {
//   // const message = await dlContract!.methods
//   //   .checkLockInfo(address)
//   //   .call(handleMessage);

//   // console.log(message, '--------');
//   // return message;

//   return await dlContract!.checkLockInfo(address);
// };

// export const isAddressDead = async (address: string) => {
//   const message = await dlContract!.methods
//     .isAddressDead(address)
//     .call(handleMessage);
//   return message;
// };

// export const isAddressLocked = async (address: string) => {
//   const message = await dlContract!.methods
//     .isAddressLocked(address)
//     .call(handleMessage);
//   return message;
// };

// const handleMessage = (err: any, res: any) => {
//   if (err) {
//     notification.error({
//       message: 'calling contract error',
//     });
//   }
//   if (res) {
//     // TODO: handle res
//     console.log('Contract call result:', res);
//   }
// };
