import axios from "axios";

export const getUserByUsername = async (username: string) => {
   try {
      // const response = await axios.get("/api/user/" + username);
      // return response.data;
      return { something: true };
   } catch (err) {
      return {
         error: true,
         message: "Error fetching user",
      };
   }
};
