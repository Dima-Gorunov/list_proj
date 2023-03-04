const Router=require('express')
const router=new Router()
const fileController=require('../controllers/FilesController')

router.post('/upload', fileController.upload)




module.exports=router