"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AnimationWrapper from "@/components/animationWrapper/AnimationWrapper";
import { useRouter } from "next/navigation";

const TermsOfService = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
      <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="absolute -bottom-16 -z-1 h-full w-full">
          <Image
            fill
            src="/images/shape/shape-dotted-light.svg"
            alt="Dotted Shape"
            className="dark:hidden"
          />
          <Image
            fill
            src="/images/shape/shape-dotted-dark.svg"
            alt="Dotted Shape"
            className="hidden dark:block"
          />
        </div>

        {/* Main Content */}
        <div className="rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:p-15">
          <AnimationWrapper className="mb-15 flex flex-col gap-5" delay={0.1}>
            <h2 className="text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Terms of Service
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Last Updated: May 9, 2024
            </p>
          </AnimationWrapper>

          <AnimationWrapper delay={0.2}>
            {/* Introduction */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                1. Introduction
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                Welcome to Van Life, a platform that connects van owners with
                individuals looking to rent vans for their adventures. These
                Terms of Service govern your use of our website, mobile
                application, and services.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                By accessing or using Van Life, you agree to be bound by these
                Terms. If you disagree with any part of the terms, you may not
                access our services.
              </p>
            </div>

            {/* Definitions */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                2. Definitions
              </h3>
              <ul className="text-body-color list-inside list-disc space-y-2 text-base leading-relaxed">
                <li>
                  <span className="font-medium">Van Life, We, Us, Our:</span>{" "}
                  Refers to the Van Life platform, its operators, owners, and
                  employees.
                </li>
                <li>
                  <span className="font-medium">Services:</span> Refers to the
                  van rental platform, website, mobile application, and all
                  related services provided by Van Life.
                </li>
                <li>
                  <span className="font-medium">User, You, Your:</span> Refers
                  to individuals who access or use Van Life, whether as a guest
                  or registered user.
                </li>
                <li>
                  <span className="font-medium">Renter:</span> Refers to users
                  who rent vans through our platform.
                </li>
                <li>
                  <span className="font-medium">Owner:</span> Refers to users
                  who list their vans for rent on our platform.
                </li>
              </ul>
            </div>

            {/* Account Registration */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                3. Account Registration
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                To use certain features of our service, you must register for an
                account. When you register, you agree to provide accurate,
                current, and complete information.
              </p>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                You are responsible for safeguarding the password for your
                account and for any activities or actions under your account. We
                encourage you to use "strong" passwords (passwords that use a
                combination of upper and lowercase letters, numbers, and
                symbols) with your account.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                You agree not to disclose your password to any third party. You
                must notify us immediately of any breach of security or
                unauthorized use of your account.
              </p>
            </div>

            {/* Rental Terms */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                4. Rental Terms
              </h3>
              <h4 className="mb-2 text-lg font-medium text-black dark:text-white">
                4.1 For Renters
              </h4>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                As a renter, you agree to:
              </p>
              <ul className="text-body-color mb-6 list-inside list-disc space-y-2 text-base leading-relaxed">
                <li>
                  Provide valid identification and driver's license information
                  upon request
                </li>
                <li>Be at least 25 years old to rent a van</li>
                <li>Return the van in the same condition as when received</li>
                <li>Pay for any damages caused during your rental period</li>
                <li>Adhere to all local traffic laws and regulations</li>
                <li>
                  Not use the van for illegal purposes or off-road unless
                  explicitly permitted
                </li>
                <li>
                  Not smoke in the van unless explicitly permitted by the owner
                </li>
              </ul>

              <h4 className="mb-2 text-lg font-medium text-black dark:text-white">
                4.2 For Owners
              </h4>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                As an owner, you agree to:
              </p>
              <ul className="text-body-color list-inside list-disc space-y-2 text-base leading-relaxed">
                <li>Provide accurate information about your van</li>
                <li>
                  Ensure your van is legally registered, insured, and safe to
                  operate
                </li>
                <li>Maintain your van in good working condition</li>
                <li>Provide clean vans to renters</li>
                <li>Honor all confirmed bookings</li>
                <li>Provide necessary instructions for van operation</li>
              </ul>
            </div>

            {/* Payments and Fees */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                5. Payments and Fees
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                Van Life charges service fees for using our platform. Renters
                pay the rental amount plus applicable fees. Owners receive the
                rental amount minus applicable fees.
              </p>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                Payment processing is handled by secure third-party payment
                processors. By using our Services, you agree to the terms and
                conditions of these payment processors.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                Cancellation policies vary and are clearly displayed before
                booking. Please review these policies before confirming your
                reservation.
              </p>
            </div>

            {/* Insurance and Liability */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                6. Insurance and Liability
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                Van Life provides insurance coverage options for rentals made
                through our platform. Coverage details are provided during the
                booking process.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                You acknowledge that outdoor activities and travel involve
                inherent risks. Van Life is not liable for any injuries,
                accidents, or damages that occur during your rental period,
                except as expressly provided in our insurance policy.
              </p>
            </div>

            {/* Privacy */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                7. Privacy
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                Your privacy is important to us. Our Privacy Policy explains how
                we collect, use, and safeguard your information when you use our
                Services. By using Van Life, you agree to our Privacy Policy.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                We may use your contact information to send you information
                about our Services, updates, and promotions. You can opt out of
                these communications at any time.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                8. Intellectual Property
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                The Van Life service and its original content, features, and
                functionality are owned by Van Life and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                You may not use our logo or other proprietary graphic or
                trademark without our express written permission.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                9. Termination
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                We may terminate or suspend your account and access to our
                Services immediately, without prior notice or liability, for any
                reason, including but not limited to a breach of these Terms.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                If you wish to terminate your account, you may discontinue using
                our Services and contact us to request account deletion.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                10. Changes to Terms
              </h3>
              <p className="text-body-color mb-4 text-base leading-relaxed">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days' notice prior to any new terms taking effect.
              </p>
              <p className="text-body-color text-base leading-relaxed">
                By continuing to access or use our Services after any revisions
                become effective, you agree to be bound by the revised terms.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-10">
              <h3 className="mb-4 text-xl font-medium text-black dark:text-white">
                11. Contact Us
              </h3>
              <p className="text-body-color text-base leading-relaxed">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:legal@vanlife.com"
                  className="text-primary hover:underline"
                >
                  legal@vanlife.com
                </a>
                .
              </p>
            </div>

            {/* Acceptance */}
            <div className="mt-15 border-t border-stroke pt-10 dark:border-strokedark">
              <p className="text-body-color text-center text-base italic leading-relaxed">
                By using the Van Life service, you acknowledge that you have
                read and understand these Terms of Service and agree to be bound
                by them.
              </p>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
