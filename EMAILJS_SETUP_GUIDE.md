# EmailJS Setup Guide for CV Contact Form

Follow these steps to set up EmailJS so your contact form actually sends emails to ahmad.nabi.ismail@gmail.com

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Gmail Service

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"** and sign in with **ahmad.nabi.ismail@gmail.com**
5. Give it a Service ID like: `service_cv_contact`
6. Click **"Create Service"**

## Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set Template ID to: `template_cv_form`
4. Configure the template:

### Email Subject:
```
New Contact Form Submission from {{from_name}}
```

### Email Content (HTML):
```html
<p>You have received a new message from your CV website contact form:</p>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>

<hr>
<p><em>This message was sent from the CV website contact form.</em></p>
```

### Settings:
- **To Email:** `ahmad.nabi.ismail@gmail.com`
- **From Name:** `{{from_name}}`
- **Reply To:** `{{reply_to}}`

5. Click **"Save"**

## Step 4: Get Your Public Key

1. Go to **"Account"** in the EmailJS dashboard
2. Find your **"Public Key"** 
3. Copy this key

## Step 5: Update Your Website Code

Replace the placeholder in your code with your actual public key:

1. Open `scripts/auth.js`
2. Find this line:
   ```javascript
   emailjs.init("KGFxE8vQFtGCE_123");
   ```
3. Replace `"KGFxE8vQFtGCE_123"` with your actual public key

## Step 6: Test the Contact Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check ahmad.nabi.ismail@gmail.com for the email

## Important Notes:

- **Free Plan Limits:** EmailJS free plan allows 200 emails per month
- **Service ID:** Make sure it matches `service_cv_contact` in your code
- **Template ID:** Make sure it matches `template_cv_form` in your code
- **Gmail Security:** You may need to enable "Less secure app access" in Gmail settings

## Troubleshooting:

If emails aren't working:

1. Check browser console for errors (F12 → Console)
2. Verify your public key is correct
3. Make sure service and template IDs match exactly
4. Check your EmailJS dashboard for delivery status
5. Verify Gmail account settings

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)