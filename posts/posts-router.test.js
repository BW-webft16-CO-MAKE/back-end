const request = require('supertest');
// const router = require('../routing/petRouter');
const server = require('../api/server')
const db = require('../data/db-config')

const user = { 
    username: 'test1234',
    password: 'testpass123'
}

let token;

beforeAll(async ()=> {
    await db('users').truncate()
    request(server)
    .post('/api/auth/register')
    .send(user)
})

beforeAll((done) => {
    request(server)
      .post('/api/auth/login')
      .send(user)
      .then((response) => {
        token = response.body.token; // save the token!
        done();
      });
  });


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

        it('responds with JSON', () => {
            return request(server)
              .get('/api/posts')
              .set('Authorization', 'Bearer ' + token)
              .then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toBe('application/json');
              });
    })
})

    // describe('[POST] /newPost', () => {

    //     it('should add a post', async () => {
    //         const res = await request(server).post('/api/auth/register')
    //         .send({

    //         })
    //         expect(res.status).toBe(500)
    //     })

    // })

    // describe('[PUT] /:id', () => {

    //     it('should update a post', async () => {
    //         await request(server).post('/api/auth/login')
    //         .send(user)
    //         .then(res => {
    //             expect(res.body).toHaveProperty('token')
    //         })
    //     })
    // })

    // describe('[DELETE] /:id', () => {

    //     it('should remove a post', async () => {
    //         await request(server).post('/api/auth/login')
    //         .send(user)
    //         .then(res => {
    //             expect(res.body).toHaveProperty('token')
    //         })
    //     })
    // })

})