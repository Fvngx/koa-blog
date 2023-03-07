import run from '../src'
import request from 'supertest'
import { Server } from 'http'

describe('http test', () => {
  let server: Server
  beforeAll(() => {
    server = run(3003)
  })
  it('Get /admin', () => {
    return request(server)
    .get('/admin')
    .expect(200)
    .then(res => {
      expect(res.body.length).toEqual(10)
      expect(res.body).toStrictEqual([1,2,3,4,5,6,7,8,9,0])
    })
  })
  afterAll(() => {
    server.close()
  })
})