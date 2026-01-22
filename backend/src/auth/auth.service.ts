import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }

    async register(userData: any) {
        // Check if user exists
        const existing = await this.usersService.findOneByEmail(userData.email);
        if (existing) {
            throw new ConflictException('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create user
        const newUser = await this.usersService.create({
            ...userData,
            password: hashedPassword,
        });

        console.log(`[AuthService] User registered successfully: ${newUser.email}`);

        // Return token directly for auto-login
        return this.login(newUser);
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            console.log(`[AuthService] Forgot password requested for non-existent email: ${email}`);
            return { message: 'If this email exists, a reset link has been sent.' };
        }

        // Generate a mock token
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = expiryDate;

        // We use the create method which calls save()
        await this.usersService.create(user);

        console.log(`[AuthService] Reset token generated for ${email}: ${resetToken}`);

        return { message: 'Reset link sent' };
    }
}
