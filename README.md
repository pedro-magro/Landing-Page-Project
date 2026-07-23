# Landing Page - Teacher Sarah (Inglês Personalizado)

Uma landing page premium, moderna, responsiva e minimalista desenvolvida especialmente para captação de alunos para aulas de inglês. O projeto é focado em alta conversão de leads e conta com segurança avançada no lado do cliente.

## 🚀 Visualização Online (Servidor Local)
O projeto está atualmente rodando em um servidor local em sua máquina. Você pode acessá-lo abrindo o seguinte link no seu navegador:
👉 **[http://localhost:8080](http://localhost:8080)**

---

## ✨ Funcionalidades Principais

- **Design Premium Roxo**: Identidade visual moderna baseada em tons de roxo profundo, lavanda e acentos em rosa/ouro, ideal para transmitir sofisticação e profissionalismo.
- **Efeitos de Atenção**:
  - *Efeito de Digitação (Typewriter)* no título principal, destacando diferentes benefícios das aulas de inglês.
  - *Efeito Vidro (Glassmorphism)* nos cards e barra de navegação para um aspecto ultra moderno.
  - *Scroll Reveal*: Elementos surgem suavemente conforme o usuário rola a página.
  - *Blobs Animados*: Formas de fundo com gradientes que flutuam lentamente, dando dinamismo à interface.
- **Totalmente Responsivo**: Layout otimizado para celulares, tablets e desktops (Mobile-First).
- **Botões Sociais Integrados**: Botões elegantes com hover temático para o perfil do Instagram, conexão no LinkedIn e contato no WhatsApp.
- **Redirecionamento ao WhatsApp**: O formulário do site processa os dados e, opcionalmente, redireciona o aluno direto para o seu WhatsApp com uma mensagem personalizada contendo as informações que ele acabou de preencher.

---

## 🔒 Segurança Integrada (Client-Side)

1. **Proteção Anti-Spam (Honeypot)**: Implementação de um campo invisível para usuários normais, mas visível para robôs de spam. Se o campo for preenchido, a submissão é bloqueada silenciosamente, evitando spam na sua caixa de entrada ou no WhatsApp.
2. **Sanitização de Dados (Proteção XSS)**: Todas as entradas de dados no formulário de contato são limpas de caracteres especiais perigosos (como tags HTML/JavaScript) antes de qualquer manipulação, prevenindo scripts maliciosos.
3. **Links Externos Seguros**: Todos os links que abrem em novas abas utilizam `rel="noopener noreferrer"`, prevenindo vulnerabilidades de sequestro de guias (`tabnabbing`).
4. **Validação Robusta no Frontend**: Checagem de e-mail e telefone válidos antes da submissão para garantir leads de qualidade.

---

## 📂 Estrutura de Arquivos

- [index.html](index.html): Estrutura semântica HTML5 e otimização para motores de busca (SEO).
- [style.css](style.css): Estilos CSS customizados com animações e design responsivo.
- [script.js](script.js): Lógica de animação de digitação, scroll reveal, e segurança do formulário.
- [assets/teacher.png](assets/teacher.png): Imagem em alta definição da professora integrada ao tema.
- [.gitignore](.gitignore): Evita subir arquivos de configuração ou lixo eletrônico ao repositório.

---

## 🛠️ Como Executar Localmente
Se o servidor atual for fechado, você pode iniciar o site simplesmente:
1. Dando um clique duplo sobre o arquivo `index.html` para abri-lo diretamente no seu navegador.
2. Ou, usando o PowerShell dentro da pasta do projeto e rodando:
   ```powershell
   python -m http.server 8080
   ```
   e acessando `http://localhost:8080`.

---

## 💻 Comandos Úteis do Git (GitHub)
O repositório já está configurado e enviado para a branch `main` do seu GitHub:
[https://github.com/pedro-magro/Landing-Page-Project](https://github.com/pedro-magro/Landing-Page-Project)

Para fazer novas atualizações do código e enviar para o ar:
1. **Adicionar alterações**:
   ```bash
   git add .
   ```
2. **Criar commit**:
   ```bash
   git commit -m "sua mensagem descritiva"
   ```
3. **Enviar alterações**:
   ```bash
   git push origin main
   ```
