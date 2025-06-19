'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Typography } from '@mui/material'

export default function Privacy() {
  const router = useRouter()

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto', textAlign: 'left' }}>
      <Typography variant="h4" gutterBottom>
        🛡️ One Tech & AI Privacy Policy
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: June 19, 2025
      </Typography>

      <Typography variant="h6" gutterBottom>1. Introduction & Identity</Typography>
      <Typography paragraph>
        This Privacy Policy explains how <strong>One Tech & AI (UK) Ltd.</strong>, located at 85 Great Portland Street, First Floor, London W1W 7LT, UK, collects, uses, and safeguards your personal data in compliance with GDPR/UK‑GDPR. For questions or rights requests, contact us at <strong>info@onetechandai.com</strong> or <strong>+44 07772 198009</strong>. Privacy notices must clearly include organization identity and contact info :contentReference[oaicite:3].
      </Typography>

      <Typography variant="h6" gutterBottom>2. What Data We Collect</Typography>
      <Typography paragraph>
        <strong>Directly from you:</strong> name, email, phone, company, and message (via forms).<br />
        <strong>Automatically:</strong> IP address, browser/device info, page visits, cookies, and analytics data, collected via website and third‑party services :contentReference[oaicite:4].
      </Typography>

      <Typography variant="h6" gutterBottom>3. How We Collect Your Data</Typography>
      <Typography paragraph>
        We collect data via contact forms, emails, calls, automated tools like cookies and analytics, and from public or third‑party sources :contentReference[oaicite:5].
      </Typography>

      <Typography variant="h6" gutterBottom>4. Purposes & Legal Basis</Typography>
      <Typography paragraph component="div">
        We process your data for:
        <ul>
          <li><strong>Responding to inquiries & support</strong> – contact data – Consent/Contract</li>
          <li><strong>Delivering services & billing</strong> – contact & transaction data – Contract</li>
          <li><strong>Improving UX, services, content</strong> – analytics data – Legitimate interest</li>
          <li><strong>Sending updates/newsletters</strong> – contact data – Consent (opt‑in)</li>
          <li><strong>Security & fraud prevention</strong> – technical & usage data – Legitimate interest / Legal obligation</li>
        </ul>
        GDPR requires clear links between purposes and lawful bases :contentReference[oaicite:6].
      </Typography>

      {/* … include sections 5–13 here, formatted similarly … */}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" onClick={() => router.push('/')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}
