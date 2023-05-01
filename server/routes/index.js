const express = require("express")
const router = express.Router()
const Emp = require("../model/empSchema")


router.post("/postEmp", async(req,res)=>{
    try{
        const {name,department,address,longitude,latitude} = req.body
        
        const findName = await Emp.findOne({name:name})
        
        if(findName){
            res.status(400).json({message:"data already exixst"})
        }else{
            const post = new Emp({
                name,
                department,
                address,
                longitude,
                latitude
            })
            await post.save()
            res.status(200).json({message:"succsessfully"})
        }
        
    }catch(error){
        console.log(error);
        res.status(422).json({message:error})
    }
})

module.exports = router


