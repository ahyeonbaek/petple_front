export type Pet = {
  _id?: string;
  age: string;
  name: string;
  image?: string;
  breed: string;
};

export type SignupFields = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

export type LoginFields = {
  email: string;
  password: string;
};

export type AuthStore = {
  userId: string | null;
  setUserId: (userId: string) => void;
  userEmail: string | null;
  setUserEmail: (userEmail: string) => void;
  userNickName?: string | null;
  setUserNickName?: (nickName: string) => void;
  userImage?: string | null;
  setUserImage?: (image: string) => void;
  userPet?: Pet[] | null;
  setUserPet: (pets: Pet[]) => void;
  petId: string | null;
  userAddress: AddressType | null;
  setUserAddress: (address: AddressType) => void;
};

export interface AddressType {
  jibunAddress: string;
  x: string;
  y: string;
}
