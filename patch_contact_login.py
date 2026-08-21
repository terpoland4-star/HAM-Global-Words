#!/usr/bin/env python3
"""
1. Branche le formulaire de contact sur POST /ham-api/quotes (au lieu de mailto force)
2. Corrige la redirection login : admin -> admin.html, client -> dashboard.html
Lance depuis la racine du depot :
    python3 patch_contact_login.py
"""

path = "assetes/js/app.js"

with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

# ---------- 1. Formulaire de contact ----------
start_idx = None
end_idx = None
for i, line in enumerate(lines):
    if "contactForm.addEventListener('submit', async (e) => {" in line:
        start_idx = i
    if start_idx is not None and "analytics.track('contact_form_submit'" in line:
        end_idx = i + 1  # la ligne suivante est "});"
        break

if start_idx is None or end_idx is None:
    print("ERREUR: bloc contactForm introuvable. Section ignoree.")
else:
    print(f"Bloc contactForm localise: lignes {start_idx+1} a {end_idx+1}")
    new_contact_block = '''      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('[name="name"]')?.value.trim();
        const email = contactForm.querySelector('[name="email"]')?.value.trim();
        const service = contactForm.querySelector('[name="service"]')?.value;
        const message = contactForm.querySelector('[name="message"]')?.value.trim();

        if (!name || !email || !service || !message) {
          toast.error('Veuillez remplir tous les champs obligatoires.', 3000);
          return;
        }

        if (!email.includes('@')) {
          toast.error('Email invalide.', 3000);
          return;
        }

        const serviceToUniverse = {
          'Traduction Professionnelle': 'linguistique',
          'Interpr\u00e9tation Strat\u00e9gique': 'linguistique',
          'Annotation IA & NLP': 'linguistique',
          'D\u00e9veloppement Web & Apps': 'tech',
          'Formation & Accompagnement': 'tech'
        };
        const universe = serviceToUniverse[service] || 'tech';
        const authToken = storage.get('authToken', null);

        try {
          const response = await fetch(`${CONFIG.apiBaseUrl}/quotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
            },
            body: JSON.stringify({ name, email, universe, service, message })
          });

          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            toast.error(data.error || "Erreur lors de l'envoi de la demande.", 3000);
            return;
          }

          await storage.add('contacts', { name, email, service, message, timestamp: Date.now() });

          const waText = `Bonjour, je viens d'envoyer une demande (${service}) sur le site. Nom: ${name}`;

          toast.success('\u2705 Votre demande a \u00e9t\u00e9 envoy\u00e9e avec succ\u00e8s !', 4000, [
            {
              label: '\ud83d\udcf1 Confirmer via WhatsApp',
              handler: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank')
            }
          ]);

          contactForm.reset();
          analytics.track('contact_form_submit', { service });
        } catch (err) {
          toast.error('Impossible de contacter le serveur. R\u00e9essayez ou contactez-nous directement.', 4000);
        }
      });
'''
    lines = lines[:start_idx] + [new_contact_block] + lines[end_idx+1:]
    print("OK - formulaire de contact branche sur /quotes")

# ---------- 2. Redirection login selon le role ----------
content = "".join(lines)

old_redirect = '''          storage.set('authToken', data.token);
          storage.setJSON('user', data.user);
          toast.success('\u2705 Connexion r\u00e9ussie !', 2000);
          setTimeout(() => window.location.href = "dashboard.html", 1000);
          analytics.track('login');'''

new_redirect = '''          storage.set('authToken', data.token);
          storage.setJSON('user', data.user);
          toast.success('\u2705 Connexion r\u00e9ussie !', 2000);
          const redirectTo = data.user.role === 'admin' ? 'admin.html' : 'dashboard.html';
          setTimeout(() => window.location.href = redirectTo, 1000);
          analytics.track('login');'''

if old_redirect in content:
    content = content.replace(old_redirect, new_redirect)
    print("OK - redirection login selon le role corrigee")
else:
    print("ATTENTION - bloc de redirection login non trouve, section ignoree")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fichier sauvegarde.")
