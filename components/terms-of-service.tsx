import { Button } from "@/components/ui/button"
import Link from "next/link"

export function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
      <div className="max-w-3xl mx-auto">
        <p className="mb-4">
          Welcome to Protectly. By using our website and services, you agree to comply with and be bound by the
          following terms and conditions of use. Please review these terms carefully before using our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using the Protectly website and services, you agree to be bound by these Terms of Service and
          all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our
          services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
        <p className="mb-4">
          Protectly provides trademark registration and protection services. We assist in the process of searching,
          filing, and maintaining trademarks. Our services are subject to change or termination at our discretion
          without notice.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
        <p className="mb-4">
          You are responsible for providing accurate and complete information when using our services. You agree to use
          the services only for lawful purposes and in accordance with these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          The Services and their entire contents, features, and functionality (including but not limited to all
          information, software, text, displays, images, video, and audio, and the design, selection, and arrangement
          thereof) are owned by Protectly, its licensors, or other providers of such material and are protected by
          United States and international copyright, trademark, patent, trade secret, and other intellectual property or
          proprietary rights laws.
        </p>
        <p className="mb-4">
          These Terms of Service permit you to use the Services for your personal, non-commercial use only. You must not
          reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish,
          download, store, or transmit any of the material on our Services, except as follows:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-4 mb-4">
          <li>
            Your computer may temporarily store copies of such materials incidental to your accessing and viewing those
            materials.
          </li>
          <li>
            You may store files that are automatically cached by your Web browser for display enhancement purposes.
          </li>
          <li>
            You may print or download one copy of a reasonable number of pages of the Services for your own personal,
            non-commercial use and not for further reproduction, publication, or distribution.
          </li>
        </ul>
        {/* Old Intellectual Property Section */}
        {/* <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          The content, organization, graphics, design, and other matters related to the Protectly website are protected under applicable copyrights and other proprietary laws. The copying, redistribution, use, or publication by you of any such content is strictly prohibited.
        </p> */}

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">
          Protectly shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages
          resulting from your use of our services or any other matter relating to the website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Governing Law and Jurisdiction</h2>
        <p className="mb-4">
          These Terms of Service shall be governed by and construed in accordance with the laws of [State/Country],
          without regard to its conflict of law provisions. You agree to submit to the personal and exclusive
          jurisdiction of the courts located within [City, State/Country] for the resolution of any disputes arising
          from these Terms of Service or your use of the Services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these Terms of Service at any time. We will notify users of any changes by
          posting the new Terms of Service on this page. Your continued use of the service after any changes constitutes
          your acceptance of the new Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer of Warranties</h2>
        <p className="mb-4">
          THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, PROTECTLY DISCLAIMS ALL WARRANTIES, EXPRESS
          OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
        <p className="mb-4">
          TO THE FULLEST EXTENT PERMITTED BY LAW, PROTECTLY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR
          INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO
          OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE
          SERVICES; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Indemnification</h2>
        <p className="mb-4">
          You agree to defend, indemnify, and hold harmless Protectly, its officers, directors, employees, and agents,
          from and against any claims, liabilities, damages, losses, and expenses, including, without limitation,
          reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the
          Services or your violation of these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Dispute Resolution</h2>
        <p className="mb-4">
          Any dispute arising from these Terms of Service or your use of the Services shall be resolved through binding
          arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be
          conducted in [City, State/Country]. The decision of the arbitrator shall be final and binding, and judgment on
          the award rendered by the arbitrator may be entered in any court having jurisdiction thereof.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">12. Severability</h2>
        <p className="mb-4">
          If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be
          limited or eliminated to the minimum extent necessary so that these Terms of Service shall otherwise remain in
          full force and effect and enforceable.
        </p>

        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

