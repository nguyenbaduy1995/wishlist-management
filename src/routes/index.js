import {
  Router
} from 'express'

import PatientRouter from './patient'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).send('Hello from  Wishlist Management')
})

router.use('/patients', PatientRouter)

export default router
