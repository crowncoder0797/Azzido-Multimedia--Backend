import User from '../../models/User.js'
import Role from '../../models/Role.js'
import UserRole from '../../models/UserRole.js'
import Profile from '../../models/Profile.js'
import { generateToken } from '../../../utils/auth.js'

export const register = async (req, res) => {
  try {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email.toLowerCase()
    const password = req.body.password

    const user = await User.findOne({ email })

    if (user) {
      return res.status(400).send({ error: 'Failed! Email is already in use'})
    }

    const name = `${firstname} ${lastname}`

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      confirmed: true
    })

    const authenticatedRole = await Role.findOne({type: 'AUTHENTICATED'})

    await UserRole.create({ user: newUser._id, role: authenticatedRole._id })

    await Profile.create({ name: name, image: `https://ui-avatars.com/api/?uppercase=true&name=${name}&background=random&color=random&size=128`, user: newUser._id })

    return res.status(200).send(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
