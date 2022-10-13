import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);

const { expect } = chai;

const mockLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const mockTeam =  [{

  "id": 1,
  "teamName": "Avaí/Kindermann"
},
{
  "id": 2,
  "teamName": "Bahia"
},
{
  "id": 3,
  "teamName": "Botafogo"
},
{
  "id": 4,
  "teamName": "Corinthians"
},
{
  "id": 5,
  "teamName": "Cruzeiro"
},
{
  "id": 6,
  "teamName": "Ferroviária"
},
{
  "id": 7,
  "teamName": "Flamengo"
},
{
  "id": 8,
  "teamName": "Grêmio"
},
{
  "id": 9,
  "teamName": "Internacional"
},
{
  "id": 10,
  "teamName": "Minas Brasília"
},
{
  "id": 11,
  "teamName": "Napoli-SC"
},
{
  "id": 12,
  "teamName": "Palmeiras"
},
{
  "id": 13,
  "teamName": "Real Brasília"
},
{
  "id": 14,
  "teamName": "Santos"
},
{
  "id": 15,
  "teamName": "São José-SP"
},
{
  "id": 16,
  "teamName": "São Paulo"
}
]

describe('Testing login route', () => {
  describe('Login route type POST', () => {
    it('User login with success', async () => {
      const response = await chai.request(app).post('/login').send(mockLogin);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.key('token');
    })

    it('Login with email field empty', async () => {
      const response = await chai.request(app).post('/login').send({
        email: '',
        password: 'secret_admin',
      })
      expect(response.status).to.equal(400);
      expect(response.body).to.have.key('message')
      expect(response.body.message).to.equal('All fields must be filled')
    })

    it('Login with password field empty', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: '',
      })
      expect(response.status).to.equal(400);
      expect(response.body).to.have.key('message');
      expect(response.body.message).to.equal('All fields must be filled');
    })

    it('Login with email or password invalid', async () => {
      const response = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: 'password12',
      })
      expect(response.status).to.equal(401);
      expect(response.body).to.have.key('message')
      expect(response.body.message).to.equal('All fields must be filled')
      expect(response.body.message).to.equal('Incorrect email or password')
    })
  })
});

describe('/teams', () => {
  describe('/get', () => {
    before( async () => {
      sinon.stub(Team, 'findAll').resolves(mockTeam as any)
    })
    after(() => {
      sinon.restore();
    })
    it('List all teams with success', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.equal(200);
      expect(response.body[0]).to.have.keys('id','teamName')

    })
  })

})
