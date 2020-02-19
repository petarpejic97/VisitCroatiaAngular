import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy,loginUser } from './controller'
import { schema } from './model'
export User2, { schema } from './model'

const router = new Router()
const { name,email, password, phoneNumber } = schema.tree

/**
 * @api {post} /User2S Create user 2
 * @apiName CreateUser2
 * @apiGroup User2
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam email User 2's email.
 * @apiParam password User 2's password.
 * @apiParam phoneNumber User 2's phoneNumber.
 * @apiSuccess {Object} user2 User 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User 2 not found.
 * @apiError 401 master access only.
 */
router.post('/',
  //master(),
  body({name, email, password, phoneNumber }),
  create)

/**
 * @api {get} /User2S Retrieve user 2 s
 * @apiName RetrieveUser2S
 * @apiGroup User2
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} user2S List of user 2 s.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  //master(),
  query(),
  index)

/**
 * @api {get} /User2S/:id Retrieve user 2
 * @apiName RetrieveUser2
 * @apiGroup User2
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} user2 User 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User 2 not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  //master(),
  show)

/**
 * @api {put} /User2S/:id Update user 2
 * @apiName UpdateUser2
 * @apiGroup User2
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam email User 2's email.
 * @apiParam password User 2's password.
 * @apiParam phoneNumber User 2's phoneNumber.
 * @apiSuccess {Object} user2 User 2's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User 2 not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ email, password, phoneNumber }),
  update)

/**
 * @api {delete} /User2S/:id Delete user 2
 * @apiName DeleteUser2
 * @apiGroup User2
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User 2 not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

router.post('/login',
  //master(),
  loginUser)

export default router
