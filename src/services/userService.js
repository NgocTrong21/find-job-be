import db from "../models";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let validateUser = (data) => {
  let check = true;
  let arrKeys = [
    "email",
    "password",
    "phoneNumber",
    "firstName",
    "lastName",
    "role",
    "gender",
  ];
  for (let i = 0; i < arrKeys.length; i++) {
    if (!data[arrKeys[i]]) {
      check = false;
      return {
        check: check,
        missingKey: arrKeys[i],
      };
    }
  }
  return {
    check: check,
  };
};

let handleUserLogin = (userEmail, userPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await chechUserEmail(userEmail);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: userEmail },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(userPassword, user.password);
          if (check) {
            userData.errorCode = 0;
            userData.message = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errorCode = 3;
            userData.message = "Password wrong!";
          }
        } else {
          userData.errorCode = 2;
          userData.message = "User not found!";
        }
      } else {
        userData.errorCode = 1;
        userData.message = "Your email is not exist!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let chechUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let validate = validateUser(data);
      if (validate.check) {
        let check = await chechUserEmail(data.email);
        if (check) {
          resolve({
            errorCode: 1,
            message: "Your email is already in used, please use another email!",
          });
        } else {
          let hashPasswordFromBcrypt = await hashUserPassword(data.password);
          db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            roleId: data.role,
            image: data.avatar || "",
          });
          resolve({
            errorCode: 0,
            message: "OK",
          });
        }
      } else {
        resolve({
          errorCode: 2,
          message: `Missing ${validate.missingKey}`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errorCode: 2,
          message: `Missing userId`,
        });
      } else {
        let user = await db.User.findOne({
          where: {
            id: data.id,
          },
          raw: false,
        });
        if (user) {
          let validate = validateUser(data);
          if (validate.check) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.gender = data.gender;
            user.phoneNumber = data.phoneNumber;
            user.roleId = data.role;
            user.image = data.image || "";
            await user.save();
            resolve({
              errorCode: 0,
              message: "Update the user succeeds!",
            });
          } else {
            resolve({
              errorCode: 3,
              message: `Missing ${validate.missingKey}`,
            });
          }
        } else {
          resolve({
            errorCode: 1,
            message: `User's not found!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (userId) {
        let user = await db.User.findOne({
          where: { id: userId },
        });
        if (!user) {
          resolve({
            errorCode: 2,
            message: `The user isn't exist`,
          });
        }

        await db.User.destroy({
          where: {
            id: userId,
          },
        });

        resolve({
          errorCode: 0,
          message: "The user is deleted",
        });
      } else {
        resolve({
          errorCode: 3,
          message: "Missing userId",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errorCode: 1,
          message: "Missing required parameters",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errorCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  chechUserEmail: chechUserEmail,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};
