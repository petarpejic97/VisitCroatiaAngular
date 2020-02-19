import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy, allEvents, imageUpload,imageUpload2, dohvatiAktualne,dohvatiOdabrani } from './controller'
import { schema } from './model'
export Event, { schema } from './model'

const router = new Router()
const { name, dateStart, time, location, type,createdBy } = schema.tree

/**
 * @api {post} /events Create event
 * @apiName CreateEvent
 * @apiGroup Event
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Event's name.
 * @apiParam dateStart Event's dateStart.
 * @apiParam dateEnd Event's dateEnd.
 * @apiParam location Event's location.
 * @apiParam type Event's type.
 * @apiSuccess {Object} event Event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Event not found.
 * @apiError 401 master access only.
 */
router.post('/',
  //master(),
  body({ name, dateStart, time, location, type,createdBy }),
  create)

/**
 * @api {get} /events Retrieve events
 * @apiName RetrieveEvents
 * @apiGroup Event
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} events List of events.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  //master(),
  query(),
  index)
  
  router.get('/dohvatiAktualne',
  //master(), 
  dohvatiAktualne)

  router.put('/dohvatiOdabrani',
  //master(),
  dohvatiOdabrani)

/**
 * @api {get} /events/:id Retrieve event
 * @apiName RetrieveEvent
 * @apiGroup Event
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} event Event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Event not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  //master(),
  show)

/**
 * @api {put} /events/:id Update event
 * @apiName UpdateEvent
 * @apiGroup Event
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Event's name.
 * @apiParam dateStart Event's dateStart.
 * @apiParam dateEnd Event's dateEnd.
 * @apiParam location Event's location.
 * @apiParam type Event's type.
 * @apiSuccess {Object} event Event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Event not found.
 * @apiError 401 master access only.
 */
router.put('/uredi/:id',
  //master(),
  body({ name, dateStart, time, location, type }),
  update)

/**
 * @api {delete} /events/:id Delete event
 * @apiName DeleteEvent
 * @apiGroup Event
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Event not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  //master(),
  destroy)

router.get('/allEvents',
  //master(),
  allEvents)

  
router.put('/uploadSlike',
//master(),
imageUpload)

router.put('/uploadSlike2',
//master(),
imageUpload2)

export default router
