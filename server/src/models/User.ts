import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio.'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres.'],
      maxlength: [30, 'El nombre no puede superar los 30 caracteres.'],
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El correo electrónico no es válido.'],
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria.'],
      select: false,
    },
  },
  { timestamps: true },
)

export type UserDocument = HydratedDocument<InferSchemaType<typeof userSchema>>

export const User = model('User', userSchema)
