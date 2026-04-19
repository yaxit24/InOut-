import jwt from 'jsonwebtoken';
import { ITokenService } from '../../domain/interfaces/ITokenService';
import { config } from '../../shared/config/env';

export class JwtTokenService implements ITokenService {
    sign(payload: Record<string, unknown>): string {
        return jwt.sign(payload, config.jwtSecret, {
            expiresIn: config.jwtExpiresIn as any,
        });
    }

    verify(token: string): Record<string, unknown> {
        return jwt.verify(token, config.jwtSecret) as Record<string, unknown>;
    }
}
