import { AUTH_PASS, AUTH_USER } from "../config/constants";
import { ItemsType } from "../../src/types/facturas";

const nodemailer = require("nodemailer");

export const sendPaySuccess = async (prefer_id: string, email: string, items: ItemsType[], pdf: string) => {

  const content = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <h2 style="color: #07524B;">🎉 ¡Gracias por tu compra! 🎉</h2>
    <p>Tu pedido con el ID <strong>${prefer_id}</strong> se ha procesado correctamente.</p>

    <h3 style="margin-top: 30px; color: #333;">🛒 Detalle de productos:</h3>
    <ul style="padding-left: 20px;">
      ${items.map(item => `
        <li style="margin-bottom: 5px;">
          <strong>${item.producto}</strong> — ${item.cantidad} x S/ ${parseInt(item.precio_base).toFixed(2)}
        </li>
      `).join('')}
    </ul>

    <p style="margin-top: 30px;">
      Puedes ver tu comprobante aquí:
      <a href="${pdf}" style="color: #07524B; font-weight: bold;" target="_blank">📄 Ver PDF</a>
    </p>

    <div style="margin: 30px 0;">
      <a href="https://wa.me/51918698741?text=Hola%21%20Quiero%20consultar%20sobre%20mi%20pedido%20*${prefer_id}*" style="
        text-decoration: none;
        color: white;
        background: #07524B;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        display: inline-block;
      ">Consultar mi pedido por WhatsApp</a>
    </div>

    <hr style="border: none; border-top: 1px solid #ccc;" />

    <p style="font-size: 12px; color: #888;">
      Comercial Rafael Norte S.A.C. — Av. Sanchez Cerro Mz P Lt 05, Piura, Perú<br/>
      Esta es una confirmación automática de tu compra.
    </p>
  </div>
`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: AUTH_USER,
      pass: AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify(function (error) {
    if (error) {
      console.error(error);
    } else {
      console.log("📩 Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: `"Comercial Rafael Norte S.A.C" <${AUTH_USER}>`,
    to: email,
    subject: `Pago satisfactorio <${prefer_id}>`,
    html: content,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error(error);
      return error;
    } else {
      console.log(`Facturada Success a => ${email}`);
      return `Facturada Success a => ${email}`;
    }
  });
};
