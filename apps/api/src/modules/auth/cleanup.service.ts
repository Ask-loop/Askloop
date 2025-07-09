import { MailService } from '@modules/mail/mail.service';
import { RedisService } from '@modules/redis/redis.service';
import { UsersService } from '@modules/users/services';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { differenceInHours } from 'date-fns';

@Injectable()
export class CleanupService {
  private readonly logger = new Logger(CleanupService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async deleteUnverifiedUsers() {
    const unverifiedUsers = await this.usersService.findMany({
      where: { emailVerified: false },
    });

    if (!unverifiedUsers.length) return;

    const now = new Date();

    for (const user of unverifiedUsers) {
      const hoursSinceCreated = differenceInHours(now, new Date(user.createdAt));

      const reminderKey = `reminder:email:${user.id}`;

      if (hoursSinceCreated >= 12 && hoursSinceCreated < 24) {
        const alreadySent = await this.redisService.get(reminderKey);
        if (!alreadySent) {
          const verificationKeys = await this.redisService.keys('verification:email:*');
          let verificationToken: string | null = null;

          for (const key of verificationKeys) {
            const email = await this.redisService.get(key);
            if (email === user.email) {
              verificationToken = key.replace('verification:email:', '');
              break;
            }
          }

          if (verificationToken) {
            await this.mailService.sendUnverifiedReminderEmail(user.email, verificationToken);
            await this.redisService.set(reminderKey, 'sent', 60 * 60 * 24); // expire in 1 day
            this.logger.log(`Sent reminder to ${user.email}`);
          } else {
            this.logger.warn(`No verification token found for user ${user.email}`);
          }
        }
      }

      await this.usersService.delete(user.id);

      const keys = await this.redisService.keys(`verification:email:${user.email}`);

      for (const key of keys) {
        await this.redisService.del(key);
      }

      this.logger.log(`Deleted unverified user ${user.email} and associated verification tokens`);
    }

    this.logger.log(`Cleanup complete. Deleted ${unverifiedUsers.length} unverified users.`);
  }
}
