import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Event } from '.'

const app = () => express(apiRoot, routes)

let event

beforeEach(async () => {
  event = await Event.create({})
})

test('POST /events 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', dateStart: 'test', dateEnd: 'test', location: 'test', type: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.dateStart).toEqual('test')
  expect(body.dateEnd).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.type).toEqual('test')
})

test('POST /events 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /events 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /events 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /events/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${event.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(event.id)
})

test('GET /events/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${event.id}`)
  expect(status).toBe(401)
})

test('GET /events/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /events/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${event.id}`)
    .send({ access_token: masterKey, name: 'test', dateStart: 'test', dateEnd: 'test', location: 'test', type: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(event.id)
  expect(body.name).toEqual('test')
  expect(body.dateStart).toEqual('test')
  expect(body.dateEnd).toEqual('test')
  expect(body.location).toEqual('test')
  expect(body.type).toEqual('test')
})

test('PUT /events/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${event.id}`)
  expect(status).toBe(401)
})

test('PUT /events/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', dateStart: 'test', dateEnd: 'test', location: 'test', type: 'test' })
  expect(status).toBe(404)
})

test('DELETE /events/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${event.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /events/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${event.id}`)
  expect(status).toBe(401)
})

test('DELETE /events/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
