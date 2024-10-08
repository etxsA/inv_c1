import bcrypt from "bcryptjs";

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };
  
  helpers.matchPassword = async (password, savedPassword) => {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (e) {
      console.log(e)
    }
  };

  export default helpers;
