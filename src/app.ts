import express, {Application, json} from "express"
import { creatList, deleteItemList, deleteList, getAllLists, getListById, updateItemList } from "./logic"
import { ensureListExists, ensureItemListExists, validateBodyRequest, validateDataBodyRequest } from "./middlewares"

const app: Application = express()
app.use(json())

app.post('/purchaseList', validateBodyRequest ,creatList)
app.get('/purchaseList', getAllLists)
app.get('/purchaseList/:id', ensureListExists,getListById)
app.patch('/purchaseList/:id/:name',ensureListExists,ensureItemListExists,validateDataBodyRequest,updateItemList)
app.delete('/purchaseList/:id/', ensureListExists,deleteList)
app.delete('/purchaseList/:id/:name', ensureListExists ,ensureItemListExists,deleteItemList)


const PORT: number = 3000
const runningMsg: string = `Server is running on http://localhost:${PORT}` 
app.listen(PORT,()=>{
  console.log(runningMsg)
})
