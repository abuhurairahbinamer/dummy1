const mongoose=require("mongoose");
const connect="mongodb+srv://abuhurairah131:eMeg4XtkQEocEg2t@cluster0.tdzzrvl.mongodb.net/vedioProject?retryWrites=true&w=majority"

const dbconnect=async ()=>{

    try {
        const con1= await mongoose.connect(connect);
        console.log("database is connected to host "+con1.connection.host);
    } catch (error) {
        console.log("Error is:"+error);
    }
    }
    
    module.exports= dbconnect;