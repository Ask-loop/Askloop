import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Tailwind, Text } from '@react-email/components';
import * as React from 'react';

type PasswordResetTemplateProps = {
  domain: string;
  token: string;
};

export const PasswordResetTemplate = ({ domain, token }: PasswordResetTemplateProps) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg shadow-sm mx-auto mt-10 px-6 py-10 max-w-xl">
            <Heading className="text-2xl font-bold text-gray-900 text-center mb-8">Password Reset Request</Heading>

            <Text className="text-gray-700 mb-6">We received a request to reset your password. Click the button below to set a new password:</Text>

            <Section className="text-center mb-8">
              <Button className="bg-blue-600 rounded-lg text-white px-6 py-3 font-medium text-sm hover:bg-blue-700 transition-colors" href={resetLink}>
                Reset Password
              </Button>
            </Section>

            <Text className="text-gray-500 text-sm mb-6">If you didn't request this, please ignore this email our </Text>

            <Text className="text-gray-500 text-xs mb-2">This link will expire in 1 hours.</Text>

            <Hr className="border-gray-200 my-6" />

            <Text className="text-gray-500 text-xs">You're receiving this email because a password reset was requested for your account.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
