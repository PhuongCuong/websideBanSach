import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            errMessanger: 'Missing input paramenter!'
        })
    }
    let data = await userService.handleLoginUser(email, password);
    res.status(200).json({
        errCode: data.errCode,
        errMessanger: data.errMessager,
        data: data ? data.data : {}
    })

}

let handleCreatenNewUser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        if (!email || !password || !name) {
            return res.status(200).json({
                errCode: 1,
                errMessanger: 'Missing input paramenter!'
            })
        }
        let data = await userService.handleCreatenNewUser({
            email: email,
            password: password,
            name: name
        });
        res.status(200).json({
            errCode: data.errCode,
            errMessanger: data.errMessager,
            data: data ? data.data : {}
        })
    } catch (e) {
        console.log(e)
    }
}

let handlegetAlluser = async (req, res) => {
    try {
        let userId = req.query.userId;
        let data = await userService.handlegetAlluser(userId);
        res.status(200).json({
            errCode: data.errCode,
            errMessanger: data.errMessager,
            data: data ? data.data : {}
        })
    } catch (e) {
        console.log(e)
    }
}

let handlegetAllallCodebytype = async (req, res) => {
    try {
        let type = req.query.type;
        if (!type) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await userService.handlegetAllallCodebytype(type);
            res.status(200).json({
                errCode: data.errCode,
                errMessanger: data.errMessager,
                data: data ? data.data : {}
            })
        }

    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode: -1,
            errMessager: 'error server'
        })
    }
}

let handleCreatenNewUseradmin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let address = req.body.address;
        let phonenumber = req.body.phonenumber;
        let gender = req.body.gender;
        let roleId = req.body.roleId;
        let image = req.body.image;


        if (!email || !password || !firstName
            || !lastName || !address || !phonenumber
            || !gender || !roleId
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessanger: 'Missing input paramenter!'
            })
        }
        let data = await userService.handleCreatenNewUseradmin({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            address: address,
            phonenumber: phonenumber,
            gender: gender,
            roleId: roleId,
            image: image
        });
        res.status(200).json({
            errCode: data.errCode,
            errMessanger: data.errMessager,
            data: data ? data.data : {}
        })
    } catch (e) {
        console.log(e)
    }
}

let handleDeleteUser = async (req, res) => {
    try {
        let userId = req.body.userId;
        if (!userId) {
            return res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter!'
            })
        } else {
            let data = await userService.handleDeleteUser(userId);
            return res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handleUpdateUser = async (req, res) => {
    try {
        let userId = req.body;
        if (!userId.firstName || !userId.lastName || !userId.email
            || !userId.password || !userId.address || !userId.phoneNumber
            || !userId.gender || !userId.roleId || !userId.avatar || !userId.id
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await userService.handleUpdateUser(userId);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    handleLogin: handleLogin,
    handleCreatenNewUser: handleCreatenNewUser,
    handlegetAlluser: handlegetAlluser,
    handlegetAllallCodebytype: handlegetAllallCodebytype,
    handleCreatenNewUseradmin: handleCreatenNewUseradmin,
    handleDeleteUser: handleDeleteUser,
    handleUpdateUser: handleUpdateUser
}