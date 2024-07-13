import express from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';


const app=express();

const saltRound=10;
let generateHash;
function async HashPassword (password){
    try {
        generateHash= bcrypt.hash(password,saltRound);
        return generateHash;
    } catch (error) {
        console.log("Error found ",error.stack);
    }
}
async function decodeHash(hash){
    try {
        const result=bcrypt.compare('myPassword',generateHash);
        return result;
    } catch (error) {
        console.log(error);
    }
}
app.get('/',(req,res)=>{
    const myHash= await HashPassword('myPassword');
    console.log(myHash)
    res.send(myHash);
})

app.get('/checked',async (req,res)=>{
    try {
        const result= await decodeHash(generateHash);
        console.log(result);
        res.send(result);
    } catch (error) {
        
    }
})
app.listen(3000,()=>{
    console.log("port is running on 3000...");
})