import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { UserLoginRequest } from '../../domain/entities/User.js';
import bcrypt from 'bcryptjs';

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserLoginRequest): Promise<{ success: boolean; message: string }> {
    if (!request.username || !request.password) {
      return { success: false, message: 'Usuario y contraseña requeridos' };
    }

    const user = await this.userRepository.findByUsername(request.username);
    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    const isValidPassword = bcrypt.compareSync(request.password, user.password);
    if (!isValidPassword) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    return { success: true, message: 'Login exitoso' };
  }
}
