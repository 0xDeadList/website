import { buryGif, lockGif, unsafeGif } from '@/assets';

export const AdBlocksConfig = [
  // {
  //   img: unsafeGif,
  //   title: 'Safer web3.0 World',
  //   description: 'Unsafe addresses damage the Internet.',
  // },
  {
    img: lockGif,
    title: 'Lock Address',
    description:
      'Lock address temporarily without revealing private key. Dapps are able to block locked address to avoid malicious exploitation.',
  },
  {
    img: buryGif,
    title: 'Bury And Earn NFTs',
    description:
      'Get NFT when successfully post dead address. The program will reward whoever holds Burrier NFT according the value of dead address.',
  },
];
