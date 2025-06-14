import express from 'express'
import { getContracts, getContractsByFilter } from '../../controller/contracts/index.js'
import checkAuth from '../../middlewares/checkAuth.js'

const router = express.Router()

router.get('/', checkAuth, getContracts)
router.get('/filter', checkAuth, getContractsByFilter)

export default router