import express from 'express'
import { getContracts, getContractsByFilter } from '../../controller/contracts/index.js'

const router = express.Router()

router.get('/', getContracts)
router.get('/filter', getContractsByFilter)

export default router