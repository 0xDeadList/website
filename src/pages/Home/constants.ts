import { buryGif, lockGif, unsafeGif } from '@/assets';

export const AdBlocksConfig = [
  {
    img: unsafeGif,
    title: 'Safer web3.0 world',
    description: 'Unsafe addresses damage the Internet.',
  },
  {
    img: lockGif,
    title: 'Lock the address in limited time',
    description:
      'Owners could check addresses for leaks in limited time.\nProjects could choose to stop interactions with addresses in locked list.',
  },
  {
    img: buryGif,
    title: 'Bury the address and earn NFTs',
    description:
      'Users having private key could choose to bury the locked address to mark them dead on the chain.\nThe burier could get one NFT minted with the address when having the same identity with the locker.\nProjects could choose to remove these dead addresses from the client library.',
  },
];
