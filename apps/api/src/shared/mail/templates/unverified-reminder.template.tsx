import { Body, Container, Heading, Link, Tailwind, Text } from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

type UnverifiedReminderTemplateProps = {
  domain: string;
  token: string;
};

export const UnverifiedReminderTemplate = ({ domain, token }: UnverifiedReminderTemplateProps) => {
  const confirmLink = `${domain}/verify-email?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10 max-w-xl">
            <Heading className="text-xl font-bold text-gray-800 mb-4">Unverified Account Reminder</Heading>

            <Text className="text-gray-700 mb-4">
              Your account has not been verified yet. If you do not verify within 24 hours, your account will be <span className="font-bold">deleted</span>.
            </Text>

            <div className="mb-6">
              <Link href={confirmLink} className="bg-blue-600 text-white px-4 py-2 rounded-md inline-block no-underline">
                Verify your account
              </Link>
            </div>

            <Text className="text-gray-600 mb-2">This link is valid for 24 hours. If you did not create an account, you can safely ignore this email.</Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
