import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ConfirmationTemplate } from './templates/confirmation.template';
import { render } from '@react-email/components';
import { PasswordResetTemplate } from './templates/reset-password.template';
import { UnverifiedReminderTemplate } from './templates/unverified-reminder.template';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'oyatilloabdushkurov120@gmail.com',
        pass: 'plkc jwjb ldci qybh',
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string, data: Record<string, any> = {}) {
    const info = await this.transporter.sendMail({
      from: 'oyatilloabdushkurov120@gmail.com',
      to,
      subject,
      html,
      ...data,
    });

    this.logger.log(`Email sent: ${info.messageId}`);
  }

  public async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(ConfirmationTemplate({ domain, token }));

    return this.sendEmail(email, 'Verify your email', html);
  }

  public async sendPasswordResetEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(PasswordResetTemplate({ domain, token }));

    return this.sendEmail(email, 'Reset your password', html);
  }

  public async sendUnverifiedReminderEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(UnverifiedReminderTemplate({ domain, token }));

    return this.sendEmail(email, 'Verify your account before it gets deleted', html);
  }
}
