import db from '../models/index';

import { uploadfile } from './uploadS3'

let handleLoginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let check = await checkemail(email);
            if (check === true) {

                let data = await db.User.findOne({
                    where: {
                        email: email,
                    }
                })

                if (data) {
                    if (password === data.password) {
                        userData.errCode = 0;
                        userData.errMessager = 'Ok';
                        userData.data = data;
                    }
                    else {
                        userData.errCode = 2;
                        userData.errMessager = 'password infomation is not defined';
                    }
                }
                else {
                    userData.errCode = 3;
                    userData.errMessager = 'Email not exist';
                }
            }
            else {
                userData.errCode = 3;
                userData.errMessager = 'Email not exist';
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}


let checkemail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: {
                    email: email
                },
                raw: true
            })
            if (data) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreatenNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let check = await checkemail(data.email);
            if (check === true) {
                let finduser = await db.User.findOne({
                    where: {
                        email: data.email
                    }
                })
                if (finduser && !finduser.password) {
                    await db.User.update({
                        password: data.password
                    }, {
                        where: {
                            email: data.email
                        }
                    });
                    userData.errCode = 0;
                    userData.errMessager = 'create new user success!';
                } else if (finduser && finduser.password) {
                    userData.errCode = 2;
                    userData.errMessager = 'Email existed';
                }

            } else {
                let datas = await db.User.create({
                    email: data.email,
                    password: data.password,
                    firstName: data.name,
                    roleId: 'R2',
                })
                if (datas) {
                    userData.errCode = 0;
                    userData.errMessager = 'create new user success!';
                } else {
                    userData.errCode = 3;
                    userData.errMessager = 'create new user not success!';
                }
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAlluser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let data = '';
            if (userId === 'ALL') {
                data = await db.User.findAll({
                    include: [
                        { model: db.allCode, as: 'genderData', attributes: ['value'] },
                        { model: db.allCode, as: 'roleData', attributes: ['value'] },

                    ]
                });
            } if (userId && userId !== 'ALL') {
                data = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    include: [
                        { model: db.allCode, as: 'genderData', attributes: ['value'] },
                        { model: db.allCode, as: 'roleData', attributes: ['value'] },

                    ]
                })
            } else {
                userData.errCode = 1;
                userData.errMessager = 'Missing valid undefid!';
                userData.data = {};
            }

            if (data) {
                userData.errCode = 0;
                userData.errMessager = 'ok!';
                userData.data = data;
            } else {
                userData.errCode = 1;
                userData.errMessager = 'Missing valid undefid!';
                userData.data = {};

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAllallCodebytype = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            if (!type) {
                userData.errCode = 1;
                userData.errMessager = 'vaild not type';
            } else {
                let data = await db.allCode.findAll({
                    where: {
                        type: type
                    }
                });
                if (data) {
                    userData.errCode = 0;
                    userData.errMessager = 'ok';
                    userData.data = data;
                } else {
                    userData.errCode = 2;
                    userData.errMessager = 'no data';
                    userData.data = {};

                }

                resolve(userData);

            }
        } catch (e) {
            reject(e)
        }
    })
}

let handleCreatenNewUseradmin = (data, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let check = await checkemail(data.email);
            if (check === true) {
                userData.errCode = 2;
                userData.errMessager = 'Email existed';
            } else {
                let link = await uploadfile(file);
                let datas = await db.User.create({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    image: link
                })
                if (datas) {
                    userData.errCode = 0;
                    userData.errMessager = 'create new user success!';
                    userData.id = datas.id
                } else {
                    userData.errCode = 3;
                    userData.errMessager = 'create new user not success!';
                }
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleDeleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let userData = {}
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                userData.errCode = 2;
                userData.errMessager = 'not find user!';

            }
            else {
                await db.User.destroy({
                    where: {
                        id: userId
                    }
                })
                userData.errCode = 0;
                userData.errMessager = 'OK!';
            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handleUpdateUser = (userId, file) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                where: {
                    id: userId.id
                }
            });
            if (!user) {
                userData.errCode = 2;
                userData.errMessager = 'not find user';
            } else {
                let link = '';
                if (file) {
                    link = await uploadfile(file);

                } else {
                    link = userId.image;
                }
                await db.User.update({
                    firstName: userId.firstName,
                    lastName: userId.lastName,
                    email: userId.email,
                    password: userId.password,
                    address: userId.address,
                    phoneNumber: userId.phoneNumber,
                    gender: userId.gender,
                    roleId: userId.roleId,
                    image: link
                }, {
                    where: {
                        id: userId.id
                    }
                })

                userData.errCode = 0;
                userData.errMessager = 'Ok';
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let handlegetAlluserbyEmail = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let data = '';
            if (userId === 'ALL') {
                data = await db.User.findAll({
                    include: [
                        { model: db.allCode, as: 'genderData', attributes: ['value'] },
                        { model: db.allCode, as: 'roleData', attributes: ['value'] },

                    ]
                });
            } if (userId && userId !== 'ALL') {
                data = await db.User.findOne({
                    where: {
                        email: userId
                    },
                    include: [
                        { model: db.allCode, as: 'genderData', attributes: ['value'] },
                        { model: db.allCode, as: 'roleData', attributes: ['value'] },

                    ]
                })
            } else {
                userData.errCode = 1;
                userData.errMessager = 'Missing valid undefid!';
                userData.data = {};
            }

            if (data) {
                userData.errCode = 0;
                userData.errMessager = 'ok!';
                userData.data = data;
            } else {
                userData.errCode = 1;
                userData.errMessager = 'Missing valid undefid!';
                userData.data = {};

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let updatePassword = (datainput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let data = '';
            data = await db.User.findOne({
                where: {
                    id: datainput.id
                }
            })
            if (data && data.password === datainput.passwordbefor) {
                await db.User.update({
                    password: datainput.passwordcomfim
                }, {
                    where: {
                        id: datainput.id
                    }
                })
                userData.errCode = 0;
                userData.errMessager = 'ok!';
            } else {
                userData.errCode = 1;
                userData.errMessager = 'Password chưa chính xác!';
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleLoginUser: handleLoginUser,
    checkemail: checkemail,
    handleCreatenNewUser: handleCreatenNewUser,
    handlegetAlluser: handlegetAlluser,
    handlegetAllallCodebytype: handlegetAllallCodebytype,
    handleCreatenNewUseradmin: handleCreatenNewUseradmin,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser,
    handlegetAlluserbyEmail: handlegetAlluserbyEmail,
    updatePassword: updatePassword
}