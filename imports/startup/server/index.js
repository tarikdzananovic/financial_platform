import './accounts/email-templates';
import './accounts/profile';
import './browser-policy';
import './fixtures';
import './api';

process.env.MAIL_URL = "smtps://postmaster%40sandbox10cbc2ad755c4c01bdcd7b89ed2e25a3.mailgun.org:e69c3bb89fe138260f221d6dfb81010a@smtp.mailgun.org:465";

//-- Application name
Accounts.emailTemplates.siteName = 'Financial Platform';

Accounts.config({
    sendVerificationEmail: true
});