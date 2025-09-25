import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { UserSchema } from '@generated/zod';

export const userSchema = UserSchema.extend({
  // !NOTE: date generated is not compatible for JsonSchema parsing
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export class UserEntity extends createZodDto(userSchema) {}

export class UserQueryDto extends createZodDto(
  z.object({
    page: z.number().int().min(1).optional(),
    size: z.number().int().min(1).max(100).optional(),
    search: z.string().max(100).optional(),
  }),
) {}

export class UserIdParamDto extends createZodDto(
  z.object({ id: z.number().int().positive() }),
) {}

export class UserCreateDto extends createZodDto(
  userSchema.omit({ id: true }).extend({ name: z.string().min(1).max(100) }),
) {}

export class UserUpdateDto extends createZodDto(
  userSchema.partial().omit({ id: true }),
) {}
