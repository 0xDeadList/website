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
      'Lock the address temporarily without revealing the private key. Dapps are able to block locked addresses to avoid malicious exploitation.',
  },
  {
    img: buryGif,
    title: 'Bury And Earn NFTs',
    description:
      'Get NFT when successfully posting dead addresses. The program will reward whoever holds Burrier NFT according to the value of the dead address.',
  },
];
