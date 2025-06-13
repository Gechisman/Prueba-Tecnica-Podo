import express from 'express'
import { getContracts, getContractByCupon } from '../../controller/contracts/index.js'

const router = express.Router()

router.get('/', getContracts)
router.get('/cupon', getContractByCupon)

export default router