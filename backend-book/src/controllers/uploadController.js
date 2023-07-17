import { uploadfile } from '../services/uploadS3'

let uploadFile = async (req, res) => {
    let file = req.file
    if (!file) {
        return res.status(200).json({
            errCode: 1,
            errMessange: 'Missing parament input!'
        })
    } else {
        console.log('check file', file)
        const result = await uploadfile(file)
        return res.status(200).json(result)
    }
}

module.exports = {
    uploadFile: uploadFile
}