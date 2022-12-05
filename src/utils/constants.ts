import { nftContractAddress } from '@/contracts/contractor/constants';

export enum StatusTypeEn {
  Before = 0,
  // Loading = 'loading',
  Normal = 1,
  LockedByOthers = 2,
  LockedBySelf = 3,
  Buried = 4,
}

export const TipMap: Record<StatusTypeEn, string> = {
  [StatusTypeEn.Before]: 'Please enter the private key to start the bury.',
  [StatusTypeEn.Normal]:
    'Public key of this address is *address*. You can choose to lock and mint it now.',
  [StatusTypeEn.LockedByOthers]:
    'Public key of this address is *address*. It has been locked. You can bury it, but its NFT will NOT be minted to your wallet.',
  [StatusTypeEn.LockedBySelf]:
    'Public key of this address is *address*. It has been locked. You can bury it, and its NFT will be minted to your wallet.',
  [StatusTypeEn.Buried]: `Address *address* buried successfully! Check your NFT at https://opensea.io/assets/matic/${nftContractAddress}/*buriedAddr*`,
  //https://opensea.io/assets/matic/ + nft合约地址 + / + 被bury的地址的十进制
  // [StatusTypeEn.Loading]: 'loading',
};

export enum ButtonTypeEn {
  Start = 'Start',
  Lock = 'Lock',
  Bury = 'Bury',
  Buried = 'Home',
}

export type ClickButtonType = ButtonTypeEn | null;

export const BtnMap: Record<StatusTypeEn, ClickButtonType> = {
  [StatusTypeEn.Normal]: ButtonTypeEn.Lock,
  [StatusTypeEn.LockedByOthers]: ButtonTypeEn.Bury,
  [StatusTypeEn.Buried]: ButtonTypeEn.Buried,
  [StatusTypeEn.LockedBySelf]: ButtonTypeEn.Bury,
  [StatusTypeEn.Before]: ButtonTypeEn.Start,
};

export const InvalidAddress = '0x0000000000000000000000000000000000000000';
