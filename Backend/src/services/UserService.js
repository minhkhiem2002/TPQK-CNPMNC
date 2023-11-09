const User = require('../models/UserModel.js')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')
const bcrypt = require('bcrypt')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, department, role } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            // hash = bcrypt.hashSync(password, 10)

            // console.log(hash);
            const createdUser = await User.create({
                name,
                email,
                password,
                department,
                role: 'user'
            })
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const loginUser = async (userLogin) => {
    const { email, password } = userLogin;
    try {
        const checkUser = await User.findOne({
            email: email
        });
        if (checkUser === null) {
            return {
                status: 'OK',
                message: 'The email is not defined'
            };
        }
        const comparePassword = bcrypt.compareSync(password, checkUser.password);
        if (!comparePassword) {
            return {
                status: 'OK',
                message: 'Password or is incorrect'
            };
        }
        const access_token = await genneralAccessToken({
            id: checkUser._id,
            role: checkUser.role
        });

        const refresh_token = await genneralRefreshToken({
            id: checkUser._id,
            role: checkUser.role
        });

        return {
            status: 'OK',
            message: 'SUCCESS',
            access_token: access_token,
            refresh_token: refresh_token,
            userId: checkUser._id,
            role: checkUser.role
        };
    } catch (e) {
        throw e;
    }
};

const updateUser = async (id, data) => {
    try {
        const checkUser = await User.findOne({
            _id: id
        })
        // console.log(checkUser)
        if (checkUser === null) {
            return resolve({
                status: 'OK',
                message: 'The user is not undefined'
            })
        }
        const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
        console.log(updateUser)
        return resolve({
            status: 'OK',
            message: 'SUCCESS',
            data: updateUser
        })
    } catch (e) {
        reject(e);
    }
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not undefined'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete User SUCCESS',
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Get All User SUCCESS',
                data: allUser
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not undefined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Get Detail User SUCCESS',
                data: checkUser
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}