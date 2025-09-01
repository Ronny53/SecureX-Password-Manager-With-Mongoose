import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { PassWord } from './model.js'
import cors from 'cors'
dotenv.config({ path: '.env' })

await mongoose.connect(process.env.MONGO_URI)

const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    const password = await PassWord.find()
    res.json(password)
})

app.post('/', async (req, res) => {
    const password = new PassWord(req.body)
    const result = await password.save()
    res.send({success: true, message: "Password Added successfully", data: result})

})

app.delete('/', async (req, res) => {
    const password = req.body
    const result = await PassWord.deleteOne({ id: password.id })
    res.send({success: true, message: "Password Deleted successfully", data: result})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})