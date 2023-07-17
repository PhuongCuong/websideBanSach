import db from '../models/index'

let getHomepage = async (req, res) => {
    let data = await db.User.findAll();
    try {
        res.status(200).json({
            data: data
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getHomepage: getHomepage
};