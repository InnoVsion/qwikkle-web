import type { Metadata } from 'next';
import { PrivacyHero } from '@/components/privacy/PrivacyHero';
import { PrivacyTOC } from '@/components/privacy/PrivacyTOC';
import { PrivacyPromiseCard } from '@/components/privacy/PrivacyPromiseCard';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Qwikkle's privacy policy. We don't read your messages, sell your data, or show you ads — ever.",
};

function SectionHeading({
  id,
  number,
  children,
}: {
  id: string;
  number: number;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <h2
      id={id}
      className="mb-4 flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-[#263238] md:text-3xl"
      style={{ scrollMarginTop: '120px' }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ background: '#E91E63' }}
        aria-hidden="true"
      >
        {number}
      </span>
      {children}
    </h2>
  );
}

export default function PrivacyPage(): React.ReactElement {
  return (
    <>
      <PrivacyHero />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="md:flex md:gap-16">
          <PrivacyTOC />

          <article className="min-w-0 flex-1 divide-y divide-[#E4E8EC]">
            {/* 1. What We Collect */}
            <section className="py-10 first:pt-0">
              <SectionHeading id="collect" number={1}>
                What We Collect
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  We collect only the minimum data needed to run the service. This includes your
                  phone number (used as your account identifier), a display name you choose, and a
                  profile photo if you upload one.
                </p>
                <p>
                  We also collect standard technical metadata: device type, app version, and
                  timestamps of connections — the same information every server on the internet
                  receives when you connect to it. This helps us diagnose bugs and keep the service
                  running.
                </p>
                <p>
                  We do <strong className="font-semibold text-[#263238]">not</strong> collect your
                  contacts, location, browsing history, or any behavioral data.
                </p>
              </div>
            </section>

            {/* 2. How We Use It */}
            <section className="py-10">
              <SectionHeading id="use" number={2}>
                How We Use It
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  Your phone number lets other Qwikkle users find you if they already have your
                  number. Your display name and photo are shown to people you communicate with.
                  Nothing more.
                </p>
                <p>
                  Technical metadata is used exclusively for operating and improving Qwikkle — for
                  example, detecting crashes or understanding which features are unreliable on
                  certain devices.
                </p>
                <p>
                  We never use your data to build a profile of you, target you with content, or make
                  inferences about your behavior or preferences.
                </p>
              </div>
            </section>

            {/* 3. What We Don't Do */}
            <section className="py-10">
              <SectionHeading id="dont-do" number={3}>
                What We Don&apos;t Do
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  We do not read your messages. We cannot read your messages. Every conversation on
                  Qwikkle is protected by end-to-end encryption — messages are encrypted on your
                  device before they leave it, and can only be decrypted by the intended recipient.
                  Our servers relay ciphertext we cannot decipher.
                </p>
                <PrivacyPromiseCard />
                <p>
                  We do not sell, rent, or trade your personal data to any third party — ever, for
                  any price, under any circumstances.
                </p>
                <p>
                  There are no ads in Qwikkle. No ad network has ever received data from us about
                  you. Our business model is a subscription, not your attention.
                </p>
              </div>
            </section>

            {/* 4. Data Storage */}
            <section className="py-10">
              <SectionHeading id="storage" number={4}>
                Data Storage
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  Messages are stored encrypted on our servers only for delivery purposes. Once a
                  message is delivered to all recipients, it is deleted from our servers within 24
                  hours. If a message is never delivered (e.g., the recipient is offline for an
                  extended period), it is automatically purged after 30 days.
                </p>
                <p>
                  Disappearing messages follow the timer you set — we enforce deletion on our end as
                  well, not just on devices.
                </p>
                <p>
                  Account data (phone number, display name, profile photo) is stored for as long as
                  your account exists. When you delete your account, all associated data is
                  permanently removed within 30 days.
                </p>
              </div>
            </section>

            {/* 5. Your Rights */}
            <section className="py-10">
              <SectionHeading id="rights" number={5}>
                Your Rights
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  You have the right to access, correct, or delete the personal data we hold about
                  you. You can update your display name and profile photo at any time within the
                  app.
                </p>
                <p>
                  To request a full export of your data or permanent deletion of your account and
                  all associated data, contact us at{' '}
                  <a
                    href="mailto:privacy@qwikkle.com"
                    className="font-medium text-[#E91E63] underline-offset-2 hover:underline"
                  >
                    privacy@qwikkle.com
                  </a>
                  . We will respond within 30 days.
                </p>
                <p>
                  If you are located in the European Economic Area, you also have the right to lodge
                  a complaint with your local data protection authority.
                </p>
              </div>
            </section>

            {/* 6. Cookies */}
            <section className="py-10">
              <SectionHeading id="cookies" number={6}>
                Cookies
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  This website uses only strictly necessary cookies — a single session cookie to
                  keep you logged into the web app if you choose to use it, and a preference cookie
                  to remember your theme setting.
                </p>
                <p>
                  We do not use analytics cookies, advertising cookies, or any third-party tracking
                  scripts on this website. There is no Google Analytics, no Facebook Pixel, no
                  HotJar.
                </p>
              </div>
            </section>

            {/* 7. Policy Changes */}
            <section className="py-10">
              <SectionHeading id="changes" number={7}>
                Policy Changes
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  If we make material changes to this policy — changes that affect your rights or
                  how we handle your data in a meaningful way — we will notify you via the app at
                  least 30 days before the changes take effect.
                </p>
                <p>
                  Minor clarifications or wording changes may be made without notice, but the
                  &ldquo;Last updated&rdquo; date at the top of this page will always reflect the
                  most recent revision.
                </p>
              </div>
            </section>

            {/* 8. Contact Us */}
            <section className="py-10">
              <SectionHeading id="contact" number={8}>
                Contact Us
              </SectionHeading>
              <div className="space-y-4 text-[#546E7A] leading-relaxed">
                <p>
                  For privacy-related questions or requests, email us at{' '}
                  <a
                    href="mailto:privacy@qwikkle.com"
                    className="font-medium text-[#E91E63] underline-offset-2 hover:underline"
                  >
                    privacy@qwikkle.com
                  </a>
                  . We aim to respond within 5 business days.
                </p>
                <p>
                  For general support, visit our help center or email{' '}
                  <a
                    href="mailto:support@qwikkle.com"
                    className="font-medium text-[#E91E63] underline-offset-2 hover:underline"
                  >
                    support@qwikkle.com
                  </a>
                  .
                </p>
                <div
                  className="mt-6 rounded-xl p-4"
                  style={{
                    background: '#F5F7F9',
                    border: '1px solid #E4E8EC',
                  }}
                >
                  <p className="text-sm font-semibold text-[#263238]">Qwikkle, Inc.</p>
                  <p className="mt-1 text-sm text-[#9E9E9E]">
                    340 Pine Street, Suite 800
                    <br />
                    San Francisco, CA 94104
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
