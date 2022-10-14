import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import validation, { validateLogin, validateMatch, validateScore } from '../helpers/joiValidation';
import { ILogin } from '../interfaces/User';
import IMatch, { IScore } from '../interfaces/Match';

class InputValidation {
  constructor(
    private userModel: typeof UserModel = UserModel,
    private teamModel: typeof TeamModel = TeamModel,
    private matchModel: typeof MatchModel = MatchModel,
  ) {}

  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body as ILogin;
    const result = validation(validateLogin, { email, password });
    if (result.message) return res.status(400).json(result);
    next();
  }

  async tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    const loginInvalid = { message: 'Invalid token' };
    const matchInvalid = { message: 'Token must be a valid token' };
    const tokenInvalid = req.url.includes('login') ? loginInvalid : matchInvalid;

    try {
      const secretJWT = process.env.JWT_SECRET || 'suaSenhaSecreta';
      const { iat, ...decoded } = verify(token, secretJWT) as JwtPayload;

      const user = await this.userModel.findOne({
        where: { email: decoded.email, id: decoded.id },
        attributes: { exclude: ['password'] },
      });

      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(401).json(tokenInvalid);
    }
  }

  async matchValidation(req: Request, res: Response, next: NextFunction) {
    const dataMatch = req.body as IMatch;

    const result = validation(validateMatch, dataMatch);
    if (result.message) return res.status(400).json(result);

    if (dataMatch.homeTeam === dataMatch.awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const home = await this.teamModel.findByPk(dataMatch.homeTeam);
    const away = await this.teamModel.findByPk(dataMatch.awayTeam);
    if (!home || !away) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }

  static async scoreValidation(req: Request, res: Response, next: NextFunction) {
    const updatedScore = req.body as IScore;
    const result = validation(validateScore, updatedScore);
    if (result.message) return res.status(400).json(result);
    next();
  }
}

export default InputValidation;
