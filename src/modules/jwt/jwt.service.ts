import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '../notification/interfaces';
import { JwtPayload } from './types';

@Injectable()
export class JwtService {
  public generateToken<T extends JwtPayload>(payload: T): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return token;
  }

  public verifyToken(token: string): ITokenPayload {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as ITokenPayload;
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
