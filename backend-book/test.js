// const AWS = require('aws-sdk');
// const multer = require('multer');

// const s3 = new AWS.S3({
//     accessKeyId: 'AKIAQCHWPLWPFF6WW7XS',
//     secretAccessKey: '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',
//     region: 'ap-southeast-1'
// });

// const upload = multer({ dest: 'uploads/' });



// let uploadFile = async () => {
//     try {
//         await s3.putObject({
//             Body: 'hello word',
//             Bucket: 'bookstore-1/Book',
//             Key: '8935086855720.jpg',
//         }).promise();

//         // Lấy link công khai cho tệp
//         const params = {
//             Bucket: 'bookstore-1/Book',
//             Key: 'my-file.txt',
//             Expires: 3600 // Thời gian tồn tại của URL (tính bằng giây)
//         };

//         const fileUrl = await s3.getSignedUrl('getObject', params);
//         console.log('Link tải lên:', fileUrl);
//     } catch (error) {
//         console.log('Lỗi trong quá trình tải lên:', error);
//     }
// }

// uploadFile();



// // Sử dụng multer để xử lý yêu cầu tải lên từ frontend

// // Endpoint API để xử lý yêu cầu tải lên
// app.post('/upload', upload.single('file'), (req, res) => {
//     const file = req.file;

//     // Kiểm tra nếu có file được tải lên
//     if (!file) {
//         res.status(400).json({ error: 'No file uploaded' });
//         return;
//     }

//     // Tạo thông tin về tệp tin trên Amazon S3
//     const params = {
//         Body: file.buffer,
//         Bucket: 'YOUR_BUCKET_NAME',
//         Key: file.originalname
//     };

//     // Tải lên tệp tin lên Amazon S3
//     s3.upload(params, (err, data) => {
//         if (err) {
//             console.log('Lỗi trong quá trình tải lên:', err);
//             res.status(500).json({ error: 'Failed to upload file' });
//         } else {
//             // Trả về đường dẫn công khai cho tệp tin đã tải lên
//             const fileUrl = data.Location;
//             console.log('Link tải lên:', fileUrl);
//             res.json({ fileUrl });
//         }
//     });
// });

// // Khởi chạy server
// app.listen(3000, () => {
//     console.log('Backend Node.js is running on port 3000');
// });
