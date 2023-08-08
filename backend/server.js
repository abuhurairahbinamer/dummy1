const dbconnect=require('./database/db')
const express=require("express");
const Vedio=require('./database/schema/index')
const path=require("path");
const multer=require("multer");
const fs=require('fs');
const app=express();
const cors = require('cors');
const Joi=require('joi');
dbconnect();

app.use(express.json({limit:"100mb"}));
app.use(cors());
app.use('/uploads',express.static('uploads'))


const upload = multer({ dest: 'uploads/' });

// app.post('/api/upload', upload.single('video'), async (req, res) => {
//   console.log("hellow try");  
//   try {
    
//       if (!req.file) {
//         return res.status(400).json({ error: 'No video file provided.' });
//       }




  
//       // Move the uploaded file to a specified location on the server.
//       const filePath = path.resolve(req.file.path);
//       console.log(filePath)
//       // let pathfile = filePath.split('\\');
//       // let p1= pathfile[pathfile.length-1];
//       // let final="http://localhost:4000/uploads/"+p1;
//       // console.log(final); 
      
  
//       // Assuming you have defined a Video model with a "path" field to store the file path.
    
//       const newVideo = new Vedio({
//         path: filePath,
//         // You can also save other video-related information in the model, like title, description, etc.
//       });
  
//       await newVideo.save();
//       res.status(200).json({ message: 'Video uploaded successfully!' });
//       console.log("saved");
//       fs.renameSync(req.file.path, filePath);
//       // fs.writeFileSync(req.file.path, filePath)
//     } catch (error) {
//       console.log("error");
//       // Handle error here.
//       res.status(500).json({ error: 'Something went wrong.' });
//     }
//   });


  






app.post('/api/upload', upload.single('videoKey'), async (req, res) => {
  console.log('Hello, try');
const vedioSchema=Joi.object({
  videoKey: Joi.string().required()
})
if (req.file){
const { error } = vedioSchema.validate({ videoKey: req.file.mimetype });
if(error){
  console.log("joi error")
  return;
}
}

else{
  console.log("no file");
  return;
}

const allowedVideoMimeTypes = ["video/mp4", "video/avi", "video/mov"]; // Add more allowed video mime types as needed.
if (!allowedVideoMimeTypes.includes(req.file.mimetype)) {
  console.log("Invalid video file format");
  
  return res.status(400).json({ error: 'Invalid video file format.' });
}



  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided.' });
    }

    // Move the uploaded file to a specified location on the server.
    const filePath = path.resolve(req.file.path);
  

    // Assuming you have defined a Video model with a "path" field to store the file path.
    const Video = require('./database/schema/index');
    
    // Read the file into a buffer
    const buffer = fs.readFileSync(filePath);

    // Create the final path where the video will be stored
    let p1 = path.basename(filePath);
    // p1=p1+".mp4";
    const finalPath = path.join(__dirname, 'uploads', p1);
    
   

console.log(p1)
console.log(finalPath)
    // Use the "finalPath" to store the file path in the database
    const newVideo = new Video({
      path: `http://localhost:4000/uploads/${p1}`,
    //   // You can also save other video-related information in the model, like title, description, etc.
    });

    await newVideo.save();
    console.log('saved to database');

    // Write the buffer to the final path on the server.
    fs.writeFileSync(finalPath, buffer);
    console.log('saved to file system');

    res.status(200).json({ message: `http://localhost:4000/uploads/${p1}` });
  } catch (error) {
    console.log('error', error);
    // Handle error here.
    res.status(500).json({ error: 'Something went wrong.' });
  }
});



app.listen(4000,()=>{
    console.log("app is running at the port "+ 4000);
})