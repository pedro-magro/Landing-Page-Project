export default async function handler(req, res) {
    // CORS headers para permitir requisições caso necessário
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido.' });
    }

    try {
        const { name, email, phone, message } = req.body;

        // Validação básica do lado do servidor (Segurança)
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
        }

        const projectId = process.env.FIREBASE_PROJECT_ID;
        const apiKey = process.env.FIREBASE_API_KEY;

        if (!projectId || !apiKey) {
            console.error('Configurações do Firebase ausentes no ambiente Vercel.');
            return res.status(500).json({ error: 'Configuração do servidor incompleta.' });
        }

        // Firestore REST API Endpoint (Sem necessidade de carregar bibliotecas npm pesadas)
        const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads?key=${apiKey}`;
        
        const payload = {
            fields: {
                name: { stringValue: name },
                email: { stringValue: email },
                phone: { stringValue: phone },
                message: { stringValue: message || "" },
                createdAt: { timestampValue: new Date().toISOString() }
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error('Erro no Firestore REST API:', errData);
            return res.status(500).json({ error: 'Erro ao salvar no banco de dados.' });
        }

        return res.status(200).json({ success: true, message: 'Lead salvo com sucesso!' });

    } catch (error) {
        console.error('Erro na rota API de contato:', error);
        return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
}
