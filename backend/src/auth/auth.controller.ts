import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() signInDto: Record<string, any>) {
        const user = await this.authService.validateUser(signInDto.email, signInDto.password);
        if (!user) {
            throw new Promise((resolve, reject) => reject(new ReferenceError('Invalid credentials'))); // Simple error for now, better handled by exception filters
        }
        return this.authService.login(user); // JWT generation
    }

    @Post('register')
    async register(@Body() signUpDto: Record<string, any>) {
        return this.authService.register(signUpDto);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string }) {
        return this.authService.forgotPassword(body.email);
    }
}
