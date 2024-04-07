import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ITokenPayload } from '../notification/interfaces';

@Injectable()
export class JwtService {
  public generateToken(payload: ITokenPayload): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return token;
  }
}
