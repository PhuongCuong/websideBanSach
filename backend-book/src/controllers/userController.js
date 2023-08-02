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
        let file = req.file;
        if (!email || !firstName || !address || !phonenumber || !roleId
        ) {
            return res.status(200).json({
                errCode: 1,
                errMessanger: 'Missing input paramenter!'
            })
        }
        let data = await userService.handleCreatenNewUseradmin(req.body, file);
        return res.status(200).json({
            errCode: data.errCode,
            errMessanger: data.errMessager,
            id: data.id,
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
        let file = req.file;
        if (!userId.email || !userId.address || !userId.phoneNumber || !userId.id
        ) {
            res.status(200).json({
                errCode: 1,
                errMessager: 'Missing input paramenter'
            })
        } else {
            let data = await userService.handleUpdateUser(userId, file);
            res.status(200).json({
                errCode: data.errCode,
                errMessager: data.errMessager
            })
        }
    } catch (e) {
        console.log(e)
    }
}

let handlegetAlluserbyEmail = async (req, res) => {
    try {
        let userId = req.query.email;
        let data = await userService.handlegetAlluserbyEmail(userId);
        res.status(200).json({
            errCode: data.errCode,
            errMessanger: data.errMessager,
            data: data ? data.data : {}
        })
    } catch (e) {
        console.log(e)
    }
}


let updatePassword = async (req, res) => {
    try {
        let userId = req.body
        let data = await userService.updatePassword(userId);
        res.status(200).json({
            errCode: data.errCode,
            errMessanger: data.errMessager,
            data: data ? data.data : {}
        })
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
    handleUpdateUser: handleUpdateUser,
    handlegetAlluserbyEmail: handlegetAlluserbyEmail,
    updatePassword: updatePassword
}