import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
  ){}
  use(req: Request, res: Response, next: NextFunction) {
    try{
    const token = req.headers.authorization.split(' ')[1];
    }
    catch (error) {

      return res.status(401).json({ message: 'Token manquant' });
    }

    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = this.jwtService.decode(token);
      req['user'] = decodedToken;

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
}
