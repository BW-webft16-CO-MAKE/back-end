const request = require('supertest');
// const router = require('../routing/petRouter');
const server = require('../api/server')
const db = require('../data/db-config')

const registerUser = {
    first_name: 'test',
    last_name: 'user',
    email: 'testuser@mail.com',
    username: 'test1234',
    password: 'testpass123'
}

const loginUser = {
    username: 'test1234',
    password: 'testpass123'
}

let token;

beforeAll(async ()=> {
    await db('users').truncate()
    request(server)
    .post('/api/auth/register')
    .send(registerUser)
    .then(res => {
        console.log("register response -->", res.body)
    })
})

beforeAll((done) => {
    request(server)
      .post('/api/auth/login')
      .send(loginUser)
      .then((response) => {
        token = response.body.token
        console.log("the response you're looking for -->", token)
        done();
      });
  });

  afterAll(async () => {
      await db('users').truncate()
  })
  
  beforeAll(async ()=> {
    await db('posts').truncate()
})


describe('post-router.js module', () => {
  it('is the testing environment', () => {
      expect(process.env.DB_ENV).toBe('testing')
  })

  describe('[GET] /', () => {

        it('should give a 401 error without a token', async () => {
            const res = await request(server).get('/api/posts/')
            .send({

            })
            expect(res.status).toBe(401)
        })

        it('responds with a 200 status and json data', async () => {
            await request(server)
              .get('/api/posts')
              .set('Authorization', token)
              .then((response) => {
                console.log('actual test response -->', token)
                expect(response.status).toBe(200);
                expect(response.type).toBe('application/json');
              });
    })
})

    describe('[POST] /newPost', () => {

        it('should give a 401 error without a token', async () => {
            const res = await request(server).post('/api/users/1/newpost')
            .send({
                post_name: 'test post',
                post_location: 'test location',
                post_description: 'test description',
                user_id: 1
            })
            expect(res.status).toBe(401)
        })

        it('responds with a 200 status and the new item', async () => {
            await request(server)
              .post('/api/users/1/newpost')
              .set('Authorization', token)
              .send({
                  user_id: '1',
                  post_name: 'test post',
                  post_location: 'test location',
                  post_description: 'test description'
              })
              .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('post_name');
                expect(response.body).toHaveProperty('post_location');
                expect(response.body).toHaveProperty('post_description');
              });
    })
    })

    describe('[PUT] /:id', () => {

        it('should give a 401 error without a token', async () => {
            await request(server)
            .delete('/api/posts/1')
            .then(res => {
                expect(res.status).toBe(401)
            })
        })

        it('responds with a 200 status', async () => {
            await request(server)
              .put('/api/posts/1')
              .set('Authorization', token)
              .send({
                  post_name: 'updated',
                  post_location: 'updated',
                  post_description: 'updated'
              })
              .then((response) => {
                expect(response.status).toBe(200);
                console.log('put response -->', response.body)
              })
    })
    })

    describe('[DELETE] /:id', () => {

        it('should give a 401 error without a token', async () => {
            await request(server)
            .delete('/api/posts/1')
            .then(res => {
                expect(res.status).toBe(401)
            })
        })

        it('responds with a 200 status and confirms post was deleted', async () => {
            await request(server)
              .delete('/api/posts/1')
              .set('Authorization', token)
              .send({
                post_name: 'updated',
                post_location: 'updated',
                post_description: 'updated'
            })
              .then((response) => {
                // console.log('delete response -->', response.body)
                expect(response.status).toBe(200);
                expect(response.body).toMatchObject({ removed: 1 })
              });
    })
})


})
