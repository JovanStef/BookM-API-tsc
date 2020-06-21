import mongoose from 'mongoose';

export const dbConnection =()=>{
  mongoose.connect('mongodb://127.0.0.1:27017/bookM-api',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
})
  mongoose.connection.on('open',()=>{
    console.log('DB conected')
  })
  mongoose.connection.on('err',(err:any)=>{
    console.error(err)
  })
}