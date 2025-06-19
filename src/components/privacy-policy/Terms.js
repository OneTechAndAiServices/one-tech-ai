'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Typography, Link as MUILink } from '@mui/material'

export default function Terms() {
  const router = useRouter()

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', textAlign: 'left' }}>
      <Typography variant="h4" gutterBottom>
        📜 One Tech & AI Terms & Conditions
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: June 19, 2025
      </Typography>

      <Typography variant="h6" gutterBottom>1. Agreement to Terms</Typography>
      <Typography paragraph>
        By accessing or using our website, services, or products provided by <strong>One Tech & AI (UK) Ltd.</strong> (“we,” “us,” “our”), located at 85 Great Portland Street, First Floor, London W1W 7LT, UK, you agree to be bound by these Terms & Conditions and our Privacy Policy.
      </Typography>

      <Typography variant="h6" gutterBottom>2. Use of Content</Typography>
      <Typography component="div" paragraph>
        <ul>
          <li>All content (text, images, logos) on this site is our property or properly licensed.</li>
          <li>You may view and download content for personal, non-commercial use only.</li>
          <li>Any reproduction, modification, or distribution without permission is prohibited.</li>
        </ul>
      </Typography>

      <Typography variant="h6" gutterBottom>3. User Conduct</Typography>
      <Typography component="div" paragraph>
        <ul>
          <li>You agree not to misuse our site or services for illegal activity.</li>
          <li>No harmful actions—including hacking, exploiting vulnerabilities, or distributing malware.</li>
          <li>You’ll follow acceptable use policies and maintain security practices.</li>
        </ul>
      </Typography>

      <Typography variant="h6" gutterBottom>4. Intellectual Property</Typography>
      <Typography paragraph>
        All trademarks, software, content, and code are owned by or licensed to us. You agree not to copy, adapt, or use this material without written permission.
      </Typography>

      <Typography variant="h6" gutterBottom>5. Service Provision & Limitation of Liability</Typography>
      <Typography paragraph>
        We aim to provide reliable services—including software development, AI/ML solutions, web development, UX/UI, cybersecurity, and automation—but offer no guarantee of uninterrupted or error-free service. To the fullest extent permitted by law, we disclaim liability for losses arising from use of our site or services.
      </Typography>

      <Typography variant="h6" gutterBottom>6. Links to Third‑Party Sites</Typography>
      <Typography paragraph>
        Our services may include links to third-party websites. We do not endorse or take responsibility for their content or policies. Visiting third-party sites is at your own risk.
      </Typography>

      <Typography variant="h6" gutterBottom>7. Termination</Typography>
      <Typography paragraph>
        We may suspend or terminate your access at our discretion, without notice, for violations of these terms or legal reasons. You may stop using our services at any time.
      </Typography>

      <Typography variant="h6" gutterBottom>8. Governing Law & Dispute Resolution</Typography>
      <Typography paragraph>
        These Terms are governed by the laws of England and Wales. Any disputes will be subject to exclusive jurisdiction of UK courts.
      </Typography>

      <Typography variant="h6" gutterBottom>9. Changes to Terms</Typography>
      <Typography paragraph>
        We may update these terms periodically. The “Last updated” date at the top indicates important updates. Continued use implies acceptance of updated terms.
      </Typography>

      <Typography variant="h6" gutterBottom>10. Contact Us</Typography>
      <Typography paragraph>
        For questions about these Terms, contact us at:<br />
        <strong>One Tech & AI (UK) Ltd.</strong><br />
        Address: 85 Great Portland Street, First Floor, London W1W 7LT, UK<br />
        Email: <MUILink href="mailto:info@onetechandai.com">info@onetechandai.com</MUILink><br />
        Phone: <MUILink href="tel:+447772198009">+44 07772 198009</MUILink>
      </Typography>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}
