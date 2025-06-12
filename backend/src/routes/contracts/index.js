import express from 'express'
import { getContracts, getContractByCupon } from '../../controller/contracts/index.js'

const router = express.Router()

router.get('/', getContracts)
router.get('/contract/:cupon', getContractByCupon)

export default router