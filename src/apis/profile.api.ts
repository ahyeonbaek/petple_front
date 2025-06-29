import { AddressType } from "@/types/user.type";
import baseInstance from "./axios";

const checkNickName = async (nickName: string) => {
  try {
    const response = await baseInstance.post("/user/nickname/check", {
      nickName,
    });

    if (response.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const recieveUserInfo = async () => {
  try {
    const response = await baseInstance.get("/user/info");

    const user = response.data.user;
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUserInfo = async (
  userEmail: string | null,
  userNickName: string | null,
  profileImage: string | null,
  selectedAddress: AddressType | null
) => {
  try {
    const response = await baseInstance.post("/user/info/update", {
      userEmail,
      userNickName,
      profileImage,
      selectedAddress,
    });

    if (response.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const createPet = async (userId: string, petData: any, imageUrl: string) => {
  try {
    const response = await baseInstance.post("/user/pet/create", {
      userId,
      formData: petData,
      image: imageUrl,
    });

    return response.data.pet;
  } catch (error) {
    throw error;
  }
};

const updatePetInfo = async (
  userId: string,
  petData: any,
  _id: string,
  imageUrl: string
) => {
  try {
    const response = await baseInstance.post("/user/pet/update", {
      userId: userId,
      userPet: petData,
      petId: _id,
      petImage: imageUrl,
    });

    return response.data.pet;
  } catch (error) {
    throw error;
  }
};

const deletePet = async (userId: string, _id: string) => {
  try {
    const response = await baseInstance.post("/user/pet/delete", {
      userId: userId,
      petId: _id,
    });

    if (response.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

const getMyPosts = async () => {
  try {
    const response = await baseInstance.get("/user/posts/get");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  updateUserInfo,
  checkNickName,
  createPet,
  updatePetInfo,
  deletePet,
  recieveUserInfo,
  getMyPosts,
};
