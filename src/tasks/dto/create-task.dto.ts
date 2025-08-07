import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 letras.' })
  @MaxLength(120, { message: 'O nome deve ter no maximo 120 caracteres.' })
  @IsNotEmpty({ message: 'Nome obrigatório' })
  readonly name: string;
  @IsString({ message: 'descrição deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 letras.' })
  @IsNotEmpty({ message: 'Descrição obrigatório' })
  readonly description: string;
  @IsNumber()
  @IsNotEmpty({ message: 'Id de usuário obrigatório' })
  readonly userId: number;
}
