import {
  IsEmail,
  IsNotEmpty,
  IsString,
  // IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Minimo 3 caracteres' })
  @MaxLength(50, { message: 'Maximo 50 caracteres' })
  @IsNotEmpty({ message: 'Nome obrigatório' })
  readonly name: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email obrigatório' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha obrigatória' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  // @IsStrongPassword({
  //   minLength: 6,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // })
  readonly password: string;
}
