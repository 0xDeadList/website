import { deleteStorage, getStorage, updateStorage } from '@/utils/storage';

const AddressKey = '0xdeadlistuser';

export const updateAddress = (address?:string)=>{
  updateStorage(AddressKey, address)
}

export const getAddress = ()=>{
  return getStorage(AddressKey)
}

export const clearAddress = ()=>{
  deleteStorage(AddressKey)
}
