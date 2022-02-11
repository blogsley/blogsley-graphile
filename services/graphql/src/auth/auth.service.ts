export class AuthService {
  private static instance: AuthService;
  constructor() {}
  /*
  async validate({ id }): Promise<User> {
    const user = await this.prisma.client.user({ id });
    if (!user) {
      throw Error('Authenticate validation error');
    }
    return user;
  }
  */
 async validate({ id }) {
   return null
 }
}
