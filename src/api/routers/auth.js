import express from 'express'
import { isAuth } from '../../utils/auth.js'
import {
  getPermissions,
  postPermission,
  putPermission,
  deletePermission,
} from '../controllers/auth/permissions.js'
import {
  deleteRole,
  getRoles,
  postRole,
  putRole,
} from '../controllers/auth/roles.js'
import {
  getClientPermissions,
  postClientPermission,
  putClientPermission,
  deleteClientPermission,
} from '../controllers/auth/client-permissions.js'
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getUserById,
} from '../controllers/auth/users.js'
import {
  getUserRoles,
  postUserRole,
  deleteUserRole,
  putUserRole,
  postUserRoleById,
} from '../controllers/auth/user-roles.js'
import { getProfile, postProfile } from '../controllers/auth/profile.js'
import { getUserProfiles } from '../controllers/auth/user-profiles.js'
import { login } from '../controllers/auth/login.js'
import { register } from '../controllers/auth/register.js'
import { postForgotPassword } from '../controllers/auth/forgot-password.js'
import { postResetPassword } from '../controllers/auth/reset-password.js'
import { seed } from '../controllers/auth/seed.js'

const router = express.Router()

// login
router.route(`/${process.env.API_STR}auth/login`).post(login)

// register
router.route(`/${process.env.API_STR}auth/register`).post((register))

// forgot password
router.route(`/${process.env.API_STR}auth/forgot-password`).post(postForgotPassword)

// reset password
router.route(`/${process.env.API_STR}auth/reset-password`).post(postResetPassword)

// // seed
router.route(`/${process.env.API_STR}auth/seed`).get(seed)

// user profiles
router.route(`/${process.env.API_STR}auth/user-profiles`).get(isAuth, getUserProfiles)

// permissions
router
  .route(`/${process.env.API_STR}auth/permissions`)
  .get(isAuth, getPermissions)
  .post(isAuth, postPermission)
router
  .route(`/${process.env.API_STR}auth/permissions/:id`)
  .put(isAuth, putPermission)
  .delete(isAuth, deletePermission)

// roles
router.route(`/${process.env.API_STR}auth/roles`).get(isAuth, getRoles).post(isAuth, postRole)
router
  .route(`/${process.env.API_STR}auth/roles/:id`)
  .put(isAuth, putRole)
  .delete(isAuth, deleteRole)

// client permissions
router
  .route(`/${process.env.API_STR}auth/client-permissions`)
  .get(isAuth, getClientPermissions)
  .post(isAuth, postClientPermission)
router
  .route(`/${process.env.API_STR}auth/client-permissions/:id`)
  .put(isAuth, putClientPermission)
  .delete(isAuth, deleteClientPermission)

// profile
router
  .route(`/${process.env.API_STR}auth/profile`)
  .get(isAuth, getProfile)
  .post(isAuth, postProfile)

// user roles
router
  .route(`/${process.env.API_STR}auth/user-roles`)
  .get(isAuth, getUserRoles)
  .post(isAuth, postUserRole)
router
  .route(`/${process.env.API_STR}auth/user-roles/:id`)
  .put(isAuth, putUserRole)
  .delete(isAuth, deleteUserRole)
  .post(postUserRoleById)

// users
router.route(`/${process.env.API_STR}auth/users`).get(isAuth, getUsers).post(isAuth, postUser)
router
  .route(`/${process.env.API_STR}auth/users/:id`)
  .put(isAuth, putUser)
  .delete(isAuth, deleteUser)
  .get(isAuth, getUserById)

export default router
