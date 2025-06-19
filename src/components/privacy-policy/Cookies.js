'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Typography, Link as MUILink } from '@mui/material'
import NextLink from 'next/link'

export default function CookiePolicy() {
  const router = useRouter()

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', textAlign: 'left' }}>
      <Typography variant="h4" gutterBottom>🍪 One Tech & AI Cookie Policy</Typography>
      <Typography variant="subtitle2" gutterBottom>Last updated: June 19, 2025</Typography>

      <Typography variant="h6" gutterBottom>1. What are Cookies?</Typography>
      <Typography paragraph>
        Cookies are small text files stored on your device by websites, used to remember preferences, maintain sessions, and collect analytics data.
      </Typography>

      <Typography variant="h6" gutterBottom>2. Types of Cookies We Use</Typography>
      <Box component="div" paragraph>
        <ul>
          <li><strong>Strictly Necessary:</strong> Required for core functionality like forms and login—no consent needed .</li>
          <li><strong>Preference Cookies:</strong> Save your language, region, or other custom settings.</li>
          <li><strong>Performance/Analytics Cookies:</strong> Collect anonymized data to improve our website.</li>
          <li><strong>Marketing Cookies:</strong> (If used) Help tailor advertisements and track engagement—only with your consent.</li>
        </ul>
      </Box>

      <Typography variant="h6" gutterBottom>3. Consent</Typography>
      <Typography paragraph>
        We only set non-essential cookies after you provide clear, affirmative consent (e.g., clicking "Accept"). Pre-ticked boxes or implied consent are invalid under GDPR/ePrivacy.
      </Typography>

      <Typography variant="h6" gutterBottom>4. Manage Your Cookie Preferences</Typography>
      <Typography paragraph>
        You can control or delete cookies via your browser settings. Disabling some may limit site features.
      </Typography>

      <Typography variant="h6" gutterBottom>5. Third‑Party Cookies</Typography>
      <Typography paragraph>
        We may use third-party services (e.g., analytics providers). Their cookies follow their own policies—review them for details.
      </Typography>

      <Typography variant="h6" gutterBottom>6. Cookie Duration</Typography>
      <Typography paragraph>
        Session cookies expire once you close your browser. Persistent cookies remain until they expire (e.g., 30 days).
      </Typography>

      <Typography variant="h6" gutterBottom>7. Why We Use Cookies</Typography>
      <Box component="div" paragraph>
        <ul>
          <li>Ensure site functionality and secure access</li>
          <li>Remember your preferences</li>
          <li>Analyze performance and improve user experience</li>
          <li>Provide relevant marketing (with your consent)</li>
        </ul>
      </Box>

      <Typography variant="h6" gutterBottom>8. Updates to This Policy</Typography>
      <Typography paragraph>
        We'll update this policy occasionally. Major changes will be shown via revision date above. Continued use indicates acceptance.
      </Typography>

      <Typography variant="h6" gutterBottom>9. Contact Us</Typography>
      <Typography paragraph>
        For cookie policy questions, contact:<br />
        <strong>One Tech & AI (UK) Ltd.</strong><br />
        85 Great Portland Street, First Floor, London W1W 7LT, UK<br />
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
