import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import 'dotenv/config';

import { app } from '../app';
import { Response } from 'superagent';
import UserModel from '../database/models/UserModel';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import { verify, JwtPayload} from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

const mockUser = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
  },
]

const mockLogin = {
  loginValid: {
    email: 'admin@admin.com',
    password: 'secret_admin'
  },
  passwordInvalid: {
    email: 'admin@admin.com',
    password: 'xablau'
  },
  emailInvalid: {
    email: 'xablau@admin.com',
    password: 'secret_admin'
  },
 
}

const mockTeam = [
  {
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

const mockFinishedMatch = [
	{
		"id": 1,
		"homeTeam": 16,
		"homeTeamGoals": 1,
		"awayTeam": 8,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "São Paulo"
		},
		"teamAway": {
			"teamName": "Grêmio"
		}
	},
	{
		"id": 2,
		"homeTeam": 9,
		"homeTeamGoals": 1,
		"awayTeam": 14,
		"awayTeamGoals": 1,
		"inProgress": false,
		"teamHome": {
			"teamName": "Internacional"
		},
		"teamAway": {
			"teamName": "Santos"
		}
	},
	{
		"id": 3,
		"homeTeam": 4,
		"homeTeamGoals": 3,
		"awayTeam": 11,
		"awayTeamGoals": 0,
		"inProgress": false,
		"teamHome": {
			"teamName": "Corinthians"
		},
		"teamAway": {
			"teamName": "Napoli-SC"
		}
	},
]

const mockInProgressMatch = [
	{
		"id": 6,
		"homeTeam": 5,
		"homeTeamGoals": 1,
		"awayTeam": 13,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "Cruzeiro"
		},
		"teamAway": {
			"teamName": "Real Brasília"
		}
	},
	{
		"id": 7,
		"homeTeam": 12,
		"homeTeamGoals": 2,
		"awayTeam": 6,
		"awayTeamGoals": 2,
		"inProgress": true,
		"teamHome": {
			"teamName": "Palmeiras"
		},
		"teamAway": {
			"teamName": "Ferroviária"
		}
	},
	{
		"id": 8,
		"homeTeam": 15,
		"homeTeamGoals": 0,
		"awayTeam": 1,
		"awayTeamGoals": 1,
		"inProgress": true,
		"teamHome": {
			"teamName": "São José-SP"
		},
		"teamAway": {
			"teamName": "Avaí/Kindermann"
		}
	},
]

describe('Testing login route', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Login with valid email and status 200', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser[0] as UserModel);

    const response = await chai.request(app).post('/login').send(mockLogin.loginValid)

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object').that.has.keys('token');

    const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
    const { iat, ...decoded } = verify(response.body.token, secret) as JwtPayload;

    const userLoginInfo = { email: 'admin@admin.com', id: 1 };
    expect(decoded).to.be.equal(userLoginInfo);
  })
  it('Login with invalid password not possible and status 401', async () => {
    sinon.stub(UserModel, 'findOne').resolves(mockUser[0] as UserModel);

    const response = await chai.request(app).post('/login').send(mockLogin.passwordInvalid)
    expect(response.status).to.be.equal(401);

    const messageInvalid = { message: 'Incorrect email or password' }
    expect(response.body).to.be.equal(messageInvalid);

  });
  it('Login with invalid email not possible and status 401',async () => {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(mockLogin.emailInvalid)
    expect(response.status).to.be.equal(401);

    const messageInvalid = { message: 'Incorrect email or password' }
    expect(response.body).to.be.equal(messageInvalid);
  });
});

describe('Testing team route', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Return all teams as array with status 200', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(mockTeam as TeamModel[]);

    const response = await chai.request(app).get('/teams')

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array').equal(mockTeam);
    expect(response.body).to.have.length(16);
  });

  it('Return specific team by id as object with status 200', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(mockTeam[9] as TeamModel);

    const response = await chai.request(app).get('/teams/10')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('object').to.be.equal(mockTeam[9]);
  });

  it('If specific team by id not existent, return message "Team not found"', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(null);

    const response = await chai.request(app).get('/teams/17')

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an('object').and.equal({ message: 'Time not found'});
  });
});

describe('Testing match route', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('If match is finalized, return as array all matches with status 200', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(mockFinishedMatch as unknown as MatchModel[]);

    const response = await chai.request(app).get('/matches?inProgress=false')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array').and.equal(mockFinishedMatch);
    expect(response.body).to.have.length(3);
  });

  it('If match is still in progress, return as array all matches with status 200', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(mockInProgressMatch as unknown as MatchModel[]);

    const response = await chai.request(app).get('/matches?inProgress=true')

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.an('array').and.equal(mockInProgressMatch);
    expect(response.body).to.have.length(3);
  });
});
