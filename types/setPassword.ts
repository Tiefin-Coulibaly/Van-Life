import { z } from 'zod';
import { passwordSchema } from '@/app/lib/utils/zod';

export type SetPasswordFormValues = z.infer<typeof passwordSchema>;