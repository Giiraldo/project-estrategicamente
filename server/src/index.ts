import app from './app'
import { config } from './config'
import { connectDatabase } from './db'

async function startServer() {
  try {
    await connectDatabase()

    app.listen(config.port, () => {
      console.log(`API de ESTRATEGICAMENTE en http://localhost:${config.port}`)
    })
  } catch (error) {
    console.error(
      'No se pudo iniciar la API:',
      error instanceof Error ? error.message : error,
    )
    process.exit(1)
  }
}

void startServer()
