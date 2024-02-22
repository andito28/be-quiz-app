const generateEmailBody = (username, otp) => {
  return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Body with OTP</title>
        </head>

        <body style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">

            <div style="background-color: #fafafa; padding: 20px; text-align: center;">
                <h2 style="color: #333333;">Hello, ${username}</h2>
                <p style="color: #333333;">We have received a request to verify your email. Please enter the OTP below to complete the verification.</p>

                <div style="border: 2px dashed #cccccc; padding: 20px; border-radius: 5px; margin-top: 20px;">
                    <h3 style="color: #333333; font-weight: bold; margin-bottom: 20px;">Your OTP Code</h3>
                    <p style="color: #333333; font-size: 36px; font-weight: bold; margin: 0;">${otp}</p>
                </div>

                <p style="color: #333333; margin-top: 20px;">If you did not make this request, you can safely ignore this email.</p>
            </div>

        </body>

        </html>
    `;
};

module.exports = { generateEmailBody };
