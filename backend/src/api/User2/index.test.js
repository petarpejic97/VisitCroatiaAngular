import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { User2 } from '.'

const app = () => express(apiRoot, routes)

let user2

beforeEach(async () => {
  user2 = await User2.create({})
})

test('POST /User2S 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, email: 'test', password: 'test', phoneNumber: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.phoneNumber).toEqual('test')
})

test('POST /User2S 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /User2S 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /User2S 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /User2S/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${user2.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(user2.id)
})

test('GET /User2S/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${user2.id}`)
  expect(status).toBe(401)
})

test('GET /User2S/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /User2S/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user2.id}`)
    .send({ access_token: masterKey, email: 'test', password: 'test', phoneNumber: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(user2.id)
  expect(body.email).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.phoneNumber).toEqual('test')
})

test('PUT /User2S/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${user2.id}`)
  expect(status).toBe(401)
})

test('PUT /User2S/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, email: 'test', password: 'test', phoneNumber: 'test' })
  expect(status).toBe(404)
})

test('DELETE /User2S/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${user2.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /User2S/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${user2.id}`)
  expect(status).toBe(401)
})

test('DELETE /User2S/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
