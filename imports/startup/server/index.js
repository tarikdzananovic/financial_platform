import './accounts/email-templates';
import './accounts/profile';
import './browser-policy';
import './fixtures';
import './api';

process.env.MAIL_URL = "smtps://postmaster%40sandbox10cbc2ad755c4c01bdcd7b89ed2e25a3.mailgun.org:e69c3bb89fe138260f221d6dfb81010a@smtp.mailgun.org:465";

//-- Application name
Accounts.emailTemplates.siteName = 'Financial Platform';

//-- Set the from address
Accounts.emailTemplates.from = 'support@finplatform.org';

//-- Subject line of the email.
Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Verify Your Email Address for Financial Platform';
};

//-- Email text
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    //var newUrl = url.replace('/#','');
    return 'Thank you for registering.  Please click on the following link to verify your email address: \r\n' + url;
};

Accounts.emailTemplates.resetPassword.text = function(user, url) {
    //var newUrl = url.replace('/#','');
    return 'A password reset has been requested for the account related to this address. To reset the password, visit the following link: \r\n' + url;
};

var loginAttemptVerifier = function(parameters) {
    if (parameters.user && parameters.user.emails && (parameters.user.emails.length > 0)) {
        // return true if verified email, false otherwise.
        var found = _.find(
            parameters.user.emails,
            function(thisEmail) { return thisEmail.verified || !Meteor.settings.public.emailVerification }
        );

        if (!found) {
            throw new Meteor.Error(500, 'You need to verify your account first. We sent you an email.');
        }
        return found && parameters.allowed;
    } else {
        console.log("user has no registered emails.");
        return false;
    }
}
Accounts.validateLoginAttempt(loginAttemptVerifier);

Accounts.config({
    sendVerificationEmail: Meteor.settings.public.emailVerification,
    loginExpirationInDays: Meteor.settings.public.sessionExpirationTime,
    forbidClientAccountCreation: false
});