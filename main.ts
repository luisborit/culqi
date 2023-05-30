import express from 'express'
import { CardImplementation } from './app/src/infraestrucutre/implementations/card.implementations'
import bodyParser from 'body-parser'
const app = express()
const router = express.Router()
const cardImplementation = new CardImplementation()
const PORT = 3000
app.use(bodyParser.json())
router.post('/tokens',async (req, res)=>{
    const response = await cardImplementation.saveCard(req.body.payload, req.header("token") as string)
    res.status(200).send(response)
})

router.post('/charges',async (req, res)=>{
    const response = await cardImplementation.getCard(req.body.jwtToken)
    res.status(200).send(response)
})

app.use('/v2', router)

app.listen(PORT, ()=>{
    console.log(`Runing on port ${PORT}`)
})