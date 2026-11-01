import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import type { Express } from 'express'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'

let app: Express
let mongo: MongoMemoryServer
let token = ''
let articleId = ''

before(async () => {
  mongo = await MongoMemoryServer.create()
  process.env.MONGODB_URI = mongo.getUri()
  process.env.JWT_SECRET = 'test-secret-key-for-estrategicamente'
  process.env.CLIENT_ORIGIN = 'http://localhost:5173'

  const appModule = await import('../src/app')
  app = appModule.default
})

after(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

describe('API de ESTRATEGICAMENTE', () => {
  it('responde el health check', async () => {
    const response = await request(app).get('/health')

    assert.equal(response.status, 200)
    assert.deepEqual(response.body, { status: 'ok' })
  })

  it('crea una cuenta', async () => {
    const response = await request(app).post('/signup').send({
      name: 'Jerson Foronda',
      email: 'jerson@example.com',
      password: 'password123',
    })

    assert.equal(response.status, 201)
    assert.equal(response.body.user.name, 'Jerson Foronda')
    assert.equal(response.body.user.email, 'jerson@example.com')
    assert.equal(typeof response.body.token, 'string')
    assert.equal(response.body.user.password, undefined)

    token = response.body.token
  })

  it('rechaza un correo duplicado', async () => {
    const response = await request(app).post('/signup').send({
      name: 'Otro usuario',
      email: 'jerson@example.com',
      password: 'password123',
    })

    assert.equal(response.status, 409)
  })

  it('rechaza una contraseña corta', async () => {
    const response = await request(app).post('/signup').send({
      name: 'Otro usuario',
      email: 'otro@example.com',
      password: 'corta',
    })

    assert.equal(response.status, 400)
  })

  it('inicia sesión con credenciales válidas', async () => {
    const response = await request(app).post('/signin').send({
      email: 'jerson@example.com',
      password: 'password123',
    })

    assert.equal(response.status, 200)
    assert.equal(typeof response.body.token, 'string')
    token = response.body.token
  })

  it('rechaza credenciales inválidas', async () => {
    const response = await request(app).post('/signin').send({
      email: 'jerson@example.com',
      password: 'incorrecta123',
    })

    assert.equal(response.status, 401)
  })

  it('protege la ruta del usuario', async () => {
    const response = await request(app).get('/users/me')

    assert.equal(response.status, 401)
  })

  it('devuelve el usuario autenticado', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
    assert.equal(response.body.user.email, 'jerson@example.com')
  })

  it('guarda un artículo', async () => {
    const response = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        articleId: 123456,
        title: 'Cómo construir una estrategia de contenidos',
        url: 'https://dev.to/ejemplo/estrategia-de-contenidos',
        coverImage: 'https://dev.to/cover.png',
        description: 'Una guía práctica para planificar contenido.',
        author: 'Autora Ejemplo',
        tags: ['marketing', 'content'],
      })

    assert.equal(response.status, 201)
    assert.equal(response.body.article.articleId, 123456)
    assert.equal(response.body.article.owner, undefined)

    articleId = response.body.article._id
  })

  it('lista los artículos guardados', async () => {
    const response = await request(app)
      .get('/articles')
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
    assert.equal(response.body.articles.length, 1)
    assert.equal(response.body.articles[0].title, 'Cómo construir una estrategia de contenidos')
  })

  it('rechaza un artículo duplicado', async () => {
    const response = await request(app)
      .post('/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        articleId: 123456,
        title: 'Cómo construir una estrategia de contenidos',
        url: 'https://dev.to/ejemplo/estrategia-de-contenidos',
        author: 'Autora Ejemplo',
        tags: ['marketing'],
      })

    assert.equal(response.status, 409)
  })

  it('elimina un artículo guardado', async () => {
    const response = await request(app)
      .delete(`/articles/${articleId}`)
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
  })

  it('deja la biblioteca vacía tras eliminar', async () => {
    const response = await request(app)
      .get('/articles')
      .set('Authorization', `Bearer ${token}`)

    assert.equal(response.status, 200)
    assert.deepEqual(response.body.articles, [])
  })

  it('devuelve 404 en rutas desconocidas', async () => {
    const response = await request(app).get('/ruta-inexistente')

    assert.equal(response.status, 404)
  })
})
