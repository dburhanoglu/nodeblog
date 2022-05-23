const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')

router.get(`/`, (req, res) => {

    res.render('admin/index')
})

router.get(`/categories`, (req, res) => {

    Category.find({}).sort({$natural:-1}).lean().then(categories => {
        res.render('admin/categories', { categories: categories })
    })
})
router.post(`/categories`, (req, res) => {
    Category.create(req.body, (error, category) => {
        if (!error) {
            res.redirect('categories')
            console.log('ekle')
        }
    })

})

//sil kısmı
router.delete('/categories/:id', (req, res) => {
console.log('cıktı'+req.params.id)
   Category.remove({ _id: req.params.id }).then(() => {
        res.redirect('/admin/categories')
        
    })  
})
module.exports = router