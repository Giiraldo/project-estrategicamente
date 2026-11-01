import {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
} from 'mongoose'

const savedArticleSchema = new Schema(
  {
    articleId: {
      type: Number,
      required: [true, 'El identificador del artículo es obligatorio.'],
    },
    title: {
      type: String,
      required: [true, 'El título es obligatorio.'],
      trim: true,
      maxlength: [300, 'El título no puede superar los 300 caracteres.'],
    },
    url: {
      type: String,
      required: [true, 'La URL es obligatoria.'],
      trim: true,
    },
    coverImage: {
      type: String,
      default: null,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: [1000, 'La descripción no puede superar los 1000 caracteres.'],
    },
    author: {
      type: String,
      required: [true, 'El autor es obligatorio.'],
      trim: true,
      maxlength: [100, 'El autor no puede superar los 100 caracteres.'],
    },
    tags: {
      type: [String],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
)

savedArticleSchema.index({ owner: 1, articleId: 1 }, { unique: true })

export type SavedArticleDocument = HydratedDocument<
  InferSchemaType<typeof savedArticleSchema>
>

export const SavedArticle = model('SavedArticle', savedArticleSchema)
