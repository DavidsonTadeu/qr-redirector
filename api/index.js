const links = require('../links.json');

module.exports = (req, res) => {
  // Captura o ID da URL removendo barras e espaços (ex: /001 -> 001)
  const rawId = req.url.split('?')[0].replace('/', '').trim();
  
  // Normaliza IDs numéricos curtos (ex: se o usuário acessar /1, converte para 001)
  const id = rawId.padStart(3, '0');

  const targetUrl = links[id] || links[rawId];

  // Se o link existir e for válido, redireciona em HTTP 302
  if (targetUrl && targetUrl.startsWith('http')) {
    return res.redirect(302, targetUrl);
  }

  // Página exibida quando a placa ainda não foi vendida/configurada
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Placa #${id || 'Inválida'}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f8f9fa; }
        .card { background: white; padding: 40px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; max-width: 400px; }
        h1 { color: #202124; font-size: 24px; margin-bottom: 12px; }
        p { color: #5f6368; font-size: 15px; line-height: 1.5; }
        .badge { background: #e8f0fe; color: #1a73e8; font-weight: bold; padding: 6px 12px; border-radius: 20px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="badge">Placa #${id}</span>
        <h1>Aguardando Ativação</h1>
        <p>Esta placa já está pronta, mas ainda não foi vinculada a nenhum estabelecimento.</p>
      </div>
    </body>
    </html>
  `);
};