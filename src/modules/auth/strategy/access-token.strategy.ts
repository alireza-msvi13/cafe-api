import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from '../../user/user.service';
import { JwtPayload } from "src/common/types/jwt-payload-type";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userService: UserService
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let data = request?.headers["access-token"] ?
                    request?.headers["access-token"] :
                    request?.cookies["access-token"]
                return data ? data : null;
            }])
        })
    }
    async validate(
        payload: JwtPayload
    ): Promise<{ phone: string }> {
        if (!payload || payload == null || !payload?.phone?.startsWith("09")) {
            throw new HttpException(
                "Token Is Not Valid",
                HttpStatus.UNAUTHORIZED
            );
        }
        const {
            phone,
        } = await this.userService.findUser(
            payload.phone
        )
        return {
            phone
        };
    }
}