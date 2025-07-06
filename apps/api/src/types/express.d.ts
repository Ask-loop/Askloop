declare namespace Express {
  interface Request {
    user: { id: number };
  }
}

declare namespace Express {
  interface Response {
    access_token: string;
    refresh_token: string;
  }
}
