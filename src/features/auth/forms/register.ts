import { z} from 'zod'
import { emailSchema, passwordSchema } from '~/schemas/auth'

export const registerFormShcema = z.object({
    email: emailSchema,
    password: passwordSchema
})

export type RegisterFormSchema = z.infer<typeof registerFormShcema>