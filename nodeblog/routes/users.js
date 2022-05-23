const express=require('express')
const router=express.Router()
const User=require('../models/User')
router.get(`/register`,(req,res)=>{
    res.render(`site/register`)
})
router.post(`/register`,(req,res)=>{
    User.create(req.body,(error,user)=>{
        req.session.sessionFlash={
            type: 'alert alert-danger',
            message:'kullanıcı  olusturuldu'
        }
        
res.redirect('/users/login')
    })
   
})
 

router.get(`/login`,(req,res)=>{
   // console.log(req.session)
    res.render(`site/login`)
})

router.post(`/login`,(req,res)=>{
    const {email,password} = req.body;

    User.findOne({email},(error,user)=>{
        if(error){
            console.log('dhfdggv')
        }
        if(user){
            console.log(user)
            if(user.password ==password){
                console.log('ghjder')
                req.session.userId=user._id
                res.redirect('/')
            }else {
                res.redirect('/users/login')
                console.log('aha')
            }
         } else{
            res.redirect('/users/register')
        }
    })
})
router.get(`/logout`,(req,res)=>{
    req.session.destroy(()=>{
res.redirect(`/`)
    })
     
 })
module.exports=router