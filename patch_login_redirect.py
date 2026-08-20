path = "assetes/js/app.js"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old_str = """          storage.set('authToken', data.token);
          storage.setJSON('user', data.user);
          toast.success('✅ Connexion réussie !', 2000);
          setTimeout(() => window.location.href = "dashboard.html", 1000);
          analytics.track('login');"""

new_str = """          storage.set('authToken', data.token);
          storage.setJSON('user', data.user);
          toast.success('✅ Connexion réussie !', 2000);
          const redirectTarget = data.user?.role === 'admin' ? "admin.html" : "dashboard.html";
          setTimeout(() => window.location.href = redirectTarget, 1000);
          analytics.track('login', { role: data.user?.role });"""

count = content.count(old_str)

if count == 0:
    print("ERREUR - bloc login non trouve, aucune modification.")
elif count > 1:
    print(f"ERREUR - bloc trouve {count} fois (non unique), aucune modification par securite.")
else:
    new_content = content.replace(old_str, new_str)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("OK - redirection admin ajoutee au handler login.")
    print(f"Fichier sauvegarde: {path}")
