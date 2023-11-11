const UserService = require("../services/UserService");
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword,department} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !department)
        {
            return res.status(200).json({
                status: 401,
                message: 'The input is required'
            })
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 401,
                message: 'The input is email'
            })
        } else if(password !== confirmPassword){
            return res.status(200).json({
                status: 401,
                message: 'The input is equal confirmPassword'
            })
        }
         const response = await UserService.createUser(req.body)
         return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(404).json({
      message: e,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    console.log("hello")
    if (!email || !password) {
      
      return res.status(200).json({
        status: 401,
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: 401,
        message: "The input is email",
      });
    }
    // else if(password !== confirmPassword){
    //     return res.status(200).json({
    //         status: 'ERR',
    //         message: 'The input is equal confirmPassword'
    //     })
    // }
    const response = await UserService.loginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    console.log(userId);
    if (!userId) {
      return res.status(200).json({
        status: 401,
        message: "The user is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "error",
        message: "The user is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "error",
        message: "The user is required",
      });
    }
    const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
};
