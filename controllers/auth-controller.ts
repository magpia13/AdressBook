import {Response} from 'express'

import {IRequest} from '../interfaces/request'
import User from '../models/user'
import {TUser} from '../types/user'
import checkValidPassword from '../utils/check-valid-password'
import generateJWT from '../utils/generate-JWT'

export const login = async (req: IRequest<TUser>, res: Response) => {
  try {
    const user = await User.findOne({email: req.body.email})

    if (!user) {
      res.status(401).json({success: false, error: `User doesn't exist`})
      return
    }

    const isValidPassword = await checkValidPassword(req.body.password, user)

    if (isValidPassword) {
      const jwt = generateJWT(user)
      res.status(200).json({
        success: true,
        result: {user, token: jwt.token, expiresIn: jwt.expires},
      })
    } else
      res.status(401).json({success: false, error: 'Password is incorrect'})
  } catch (err) {
    res.status(500).json({success: false, error: err})
  }
}
