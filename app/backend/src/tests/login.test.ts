import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

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
