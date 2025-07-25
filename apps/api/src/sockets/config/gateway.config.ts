export const createGatewayConfig = (namespace: string) => ({
  namespace,
  cors: {
    origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  },
  cookie: true,
  transports: ['websocket'],
});
