import { UserRepository } from '../../domain/repositories/UserRepository.js';
import { UserCreateRequest } from '../../domain/entities/User.js';
import bcrypt from 'bcryptjs';

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserCreateRequest): Promise<{ success: boolean; message: string }> {
    if (!request.username || !request.password) {
      return { success: false, message: 'Usuario y contraseña requeridos' };
    }

    const userCount = await this.userRepository.count();
    if (userCount > 0) {
      return { success: false, message: 'Ya existe un usuario registrado' };
    }

    const hashedPassword = bcrypt.hashSync(request.password, 10);
    await this.userRepository.create({
      username: request.username,
      password: hashedPassword
    });

    return { success: true, message: 'Usuario registrado correctamente' };
  }
}
