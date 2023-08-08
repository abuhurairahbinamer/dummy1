import React, { useState } from 'react';
import axios from 'axios';
// import '~video-react/dist/video-react.css'; 
import ReactPlayer from 'react-player';
import './style.css'
// import { Player } from 'video-react';
// import "video-react/dist/video-react.css";
const VideoUploadForm = () => {
  const [video, setVideo] = useState(null);
  let [urll,setUrl]=useState("http://localhost:4000/uploads/e7351e74fece2267bdb02f93856296f3");
  // let urll="http://localhost:4000/uploads/e7351e74fece2267bdb02f93856296f3"
  let [count,setCount]=useState(0);
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };
let p=0; //remember ,check this out 
// urll="http://localhost:4000/uploads/e7351e74fece2267bdb02f93856296f3"
const han=()=>{
  p++;                  //remember ,check this out 
  setCount(p)
  urll="http://localhost:4000/uploads/de933cea46fc996f4d0eeeacc03ca601"
  setUrl(urll)
  console.log(count);
}  
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('videoKey', video);
// console.log("upload")
       const response= await axios.post('http://localhost:4000/api/upload', formData);
      console.log(response);
      urll=response.data.message;
      setUrl(urll)
      count++;
      setCount(count);
      console.log(urll)
      // Do something after successful upload, like showing a success message.
    } catch (error) {
      // Handle error here.
      console.log("here is the error");
    }
  };

 

  console.log("hellow",urll);
  return (
    
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Video</button>




      <h1>Video Player</h1>
      <span>{count}</span>
      
      {/* <video  controls width="640" height="360" >
        <source  src={urll} type="video/mp4" />
        Your browser does not support the video tag.
        
      </video> */}
        {/* <div className="custom-player"> */}
        <ReactPlayer  url={urll} height="200px" width="200px" className="custom-player" controls />
      {/* </div> */}
<br /><br /><br /><br />
<span>{count}</span>
<button  onClick={han}>click</button>
    </div>
  );
};

export default VideoUploadForm;