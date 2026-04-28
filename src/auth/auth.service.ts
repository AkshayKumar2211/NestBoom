import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    /**
     * Logs in a user by validating email and password.
     * @param dto - Login data containing email and password.
     * @returns An object with the access token and refreshToken...
     */
    async login(dto: LoginDto): Promise<any> {
        const { email, password } = dto;

        if (!email || !password) {
            throw new BadRequestException('Both email and password are required');
        }

        let user;
        try {
            user = await this.findUserByEmail(email);
        } catch (error) {
            throw new BadRequestException('Error checking user existence');
        }

        if (!user) {
            throw new BadRequestException('User with this email does not exist');
        }

        const isPasswordMatch = await this.passwordMatching(user.password, password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Incorrect password');
        }

        const payload = {
            sub: user.email,
            id: user.id.toString(),
            type: 'accessToken'
        };

        const payloadRefreshToken={
             sub: user.email,
            id: user.id.toString(),
            type: 'refreshToken'
        }

        const accessToken = this.generateToken(payload);
        const refrehToken=this.generateToken(payloadRefreshToken);
        
        return { accessToken,
                  refrehToken
         };
    }

    /**
     * Checks if the provided password matches the hashed password.
     * @param hashedPassword - The hashed password from the database.
     * @param plainTextPassword - The plain text password to check.
     * @returns True if passwords match, false otherwise.
     */
    async passwordMatching(hashedPassword: string, plainTextPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }

    /**
     * Finds a user by email.
     * @param email - The email to search for.
     * @returns The user if found, null otherwise.
     */
    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userModel.findOne({ email });
    }

    /**
     * Generates a JWT token.
     * @param payload - The payload to sign.
     * @returns The generated token.
     */
    generateToken(payload: { sub: string; id: string; type: string }): string {
        return this.jwtService.sign(payload);
    }


    /**
     * Generate access token 
     * @param refrehToken-Refresh Token to generate access token
     * @return The Generated access Token
     */
    generateAccessToken(refrehToken:string):string
    {
         return 'accessToken'
    }

}
