/**
 * Shift Ü — Leads tracker (Google Apps Script Web App)
 * ----------------------------------------------------
 * Receives every contact request + call booking from the website and appends a
 * row to a Google Sheet in your Google Workspace. Optionally emails you too.
 *
 * No Google Cloud project, no service account, no API keys to manage: the script
 * runs as you and writes to the sheet it's bound to.
 *
 * SETUP (one time, ~3 minutes):
 *  1. Create a Google Sheet in your Workspace (e.g. "Shift Ü — Leads").
 *  2. Extensions ▸ Apps Script. Delete the sample, paste this whole file.
 *  3. Set SECRET below to a long random string (keep it private).
 *  4. (Optional) Set NOTIFY_EMAIL to the inbox that should get a ping per lead.
 *  5. Deploy ▸ New deployment ▸ type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone   <-- required so Vercel (unauthenticated) can POST.
 *                                      The SECRET token below is what guards it.
 *  6. Copy the Web app URL (ends in /exec).
 *  7. In Vercel ▸ Project ▸ Settings ▸ Environment Variables, add:
 *       LEADS_WEBHOOK_URL   = the /exec URL from step 6
 *       LEADS_WEBHOOK_TOKEN = the same SECRET string from step 3
 *  8. Redeploy the site. Submit the contact form once to confirm a row appears.
 *
 * To change the columns, edit HEADERS + the row array in doPost together, and
 * keep them in sync with FIELDS in src/lib/leads.ts.
 */

const SECRET = 'CHANGE_ME_to_a_long_random_string'; // must match LEADS_WEBHOOK_TOKEN in Vercel
const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = ''; // e.g. 'you@yourdomain.com' — leave '' to skip the email ping

const HEADERS = [
  'Received', 'Kind', 'Name', 'Email', 'Business',
  'Phone', 'Need', 'Preferred time', 'Message', 'Source',
];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (SECRET && body.token !== SECRET) {
      return json_({ ok: false, error: 'forbidden' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      body.ts ? new Date(body.ts) : new Date(),
      body.kind || '',
      body.name || '',
      body.email || '',
      body.business || '',
      body.phone || '',
      body.need || '',
      body.preferred || '',
      body.message || '',
      body.source || '',
    ]);

    if (NOTIFY_EMAIL) {
      var subject = (body.kind === 'booking' ? 'New call booking — ' : 'New contact request — ') + (body.name || 'lead');
      var lines = [
        'Name: ' + (body.name || ''),
        'Email: ' + (body.email || ''),
        body.business ? 'Business: ' + body.business : '',
        body.phone ? 'Phone: ' + body.phone : '',
        body.need ? 'Need: ' + body.need : '',
        body.preferred ? 'Preferred time: ' + body.preferred : '',
        body.message ? 'Message: ' + body.message : '',
        'Source: ' + (body.source || 'shiftu.ca'),
      ].filter(String).join('\n');
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: subject,
        body: lines,
        replyTo: body.email || undefined,
      });
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Health check: opening the /exec URL in a browser returns this.
function doGet() {
  return json_({ ok: true, service: 'shiftu-leads-tracker' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
