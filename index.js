const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');  // Importando o CORS

dotenv.config();

const app = express();

// Habilitando o CORS para todas as origens ou configurando um domínio específico
app.use(cors()); // Permite todas as origens (pode restringir se necessário)
app.use(express.json());

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Rota para envio do e-mail
app.post('/send-email', (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'jose.vanderlei.nn@gmail.com',
    subject: `Novo contato de ${nome} - ${assunto}`,
    text: `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\nMensagem: ${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao enviar email' });
    }
    res.status(200).json({ message: 'Email enviado com sucesso!' });
  });
});

// Configurando a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
