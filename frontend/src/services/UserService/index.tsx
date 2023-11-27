import axios from "axios";

import { DEPLOYED_API_GATEWAY_URL } from "../../constants";

export interface UserData {
  username: string;
  email: string;
  password: string;
}

export const getAllUsers = async () => {
  try {

    const response = await axios.get(DEPLOYED_API_GATEWAY_URL + `/users`);

    return response.data;
  } catch (error) {
    throw new Error("Something went wrong while fetching users!!");
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get(

      DEPLOYED_API_GATEWAY_URL + `/users/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("User with given Id does not exist!!");
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.get(
      DEPLOYED_API_GATEWAY_URL +
        `/users/login?email=${email}&password=${password}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {};
    } else {
      throw new Error("User with given credentials does not exist!!");
    }
  }
};

export const createUser = async (user: UserData) => {
  try {
    const response = await axios.post(
      DEPLOYED_API_GATEWAY_URL + "/users",
      user
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to create user, try again!!");
  }
};

export const checkEmailAvailability = async (email: string) => {
  try {
    const response = await axios.get(
      DEPLOYED_API_GATEWAY_URL + `/users/email?email=${email}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return {};
    } else {
      throw new Error("Unable to fetch data, try again!!");
    }
  }
};

export const changePasswordByEmail = async (
  email: string,
  newPassword: string
) => {
  try {
    const existingUser = await checkEmailAvailability(email);

    await axios.patch(DEPLOYED_API_GATEWAY_URL + `/users/${existingUser.id}`, {
      password: newPassword,
    });
    return true;
  } catch (error: any) {
    console.error("Error updating password: " + error.message);
    return false;
  }
};
