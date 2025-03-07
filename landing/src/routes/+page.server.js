import { EMAIL } from "$env/static/private";
import transporter from "$lib/emailSetup.server.js";

export const actions = {
  create: async ({ request }) => {
    try {
      const formData = await request.formData()

      let name = formData.get('name');
      let company = formData.get('company');
      let email = formData.get('email');
      let message = formData.get('message');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      var emptyFields = []
      if (!name) {
        name = "non specificato"
        // emptyFields.push('name')
      }
      if (!company) {
        company = "non specificato"
        // emptyFields.push('company')
      }
      if (!email || !emailRegex.test(email)) {
        emptyFields.push('email')
      }
      if (!message) {
        emptyFields.push('message')
      }
      if (!email || !message) {
        return {
          success: false,
          empty: true,
          emptyFields: emptyFields,
        };
      }

      const body = `insidecontract.com | Nuovo messaggio da: ${name}, azienda: ${company}, email: ${email}, messaggio: ${message}`
      const html = `
      <p>Hai ricevuto un nuovo messaggio da: ${name}, azienda: ${company}, email: <a href="mailto:${email}">${email}</a></p>
      <p>${message}</p>
      `
      
      const mail = {
        from: EMAIL,
        to: "hello@lucabunino.com",
        subject: `insidecontract.com | Messaggio da ${email}`,
        text: body,
        html: html,
      };

      const sendEmail = async (mail) => {
        await new Promise((resolve, reject) => {
          transporter.sendMail(mail, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(info);
            }
          });
        });
      };

      await sendEmail(mail);
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
    } return {
      success: false,
    };
  },
};