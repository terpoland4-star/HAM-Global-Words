// ========================================
// HAM Global Words - Améliorations front-end
// Toast, historique, export, mode démo, etc.
// ========================================

(function() {
  'use strict';

  // ========================================
  // STORAGE (raccourci)
  // ========================================
  const storage = {
    get: (key, fallback = null) => {
      try {
        const value = localStorage.getItem(key);
        return value !== null ? value : fallback;
      } catch { return fallback; }
    },
    set: (key, value) => {
      try { localStorage.setItem(key, value); return true; } catch { return false; }
    },
    getJSON: (key, fallback = null) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch { return fallback; }
    },
    setJSON: (key, value) => {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
    },
    remove: (key) => {
      try { localStorage.removeItem(key); return true; } catch { return false; }
    }
  };

  // ========================================
  // TOAST NOTIFICATIONS
  // ========================================
  window.showToast = function(message, type = 'success') {
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    
    toast.innerHTML = `<span>${icons[type] || '✅'}</span><span>${message}</span>`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ========================================
  // SAUVEGARDE DES DEMANDES
  // ========================================
  window.saveRequestToHistory = function(request) {
    const history = storage.getJSON('requestsHistory', []);
    history.unshift({
      ...request,
      id: Date.now(),
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString(),
      status: 'envoyé'
    });
    
    if (history.length > 50) history.pop();
    storage.setJSON('requestsHistory', history);
    updateNotificationBadge();
    checkAndAwardBadges();
    
    return true;
  };

  // ========================================
  // HISTORIQUE DES DEMANDES
  // ========================================
  window.getRequestHistory = function() {
    return storage.getJSON('requestsHistory', []);
  };
  
  window.displayRequestHistory = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const history = getRequestHistory();
    
    if (history.length === 0) {
      container.innerHTML = '<p class="text-center">Aucune demande pour le moment</p>';
      return;
    }
    
    const html = `
      <ul class="history-list">
        ${history.map(item => `
          <li>
            <div>
              <strong>${escapeHtml(item.service || 'Demande')}</strong>
              <div class="history-date">${item.date}</div>
            </div>
            <span class="history-status status-${item.status}">${item.status === 'envoyé' ? 'Envoyé' : item.status}</span>
          </li>
        `).join('')}
      </ul>
    `;
    
    container.innerHTML = html;
  };

  // ========================================
  // COMPTEUR DE NOTIFICATIONS
  // ========================================
  window.updateNotificationBadge = function() {
    const history = getRequestHistory();
    const pendingQuotes = storage.getJSON('pendingQuotes', []);
    const count = history.filter(h => h.status === 'pending').length + pendingQuotes.length;
    
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      if (count > 0) {
        badge.textContent = count > 9 ? '9+' : count;
        badge.classList.add('show');
      } else {
        badge.classList.remove('show');
      }
    }
  };

  // ========================================
  // EXPORT DES DONNÉES
  // ========================================
  window.exportUserData = function() {
    const data = {
      exportDate: new Date().toISOString(),
      user: storage.getJSON('user', null),
      requests: getRequestHistory(),
      quotes: storage.getJSON('pendingQuotes', []),
      notes: storage.getJSON('userNotes', []),
      todos: storage.getJSON('userTodos', []),
      settings: {
        theme: storage.get('theme', 'dark'),
        lang: storage.get('lang', 'fr')
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ham-data-${new Date().toISOString().slice(0,19)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Données exportées avec succès !', 'success');
  };

  // ========================================
  // IMPORT DES DONNÉES
  // ========================================
  window.importUserData = function(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.user) storage.setJSON('user', data.user);
        if (data.requests) storage.setJSON('requestsHistory', data.requests);
        if (data.quotes) storage.setJSON('pendingQuotes', data.quotes);
        if (data.notes) storage.setJSON('userNotes', data.notes);
        if (data.todos) storage.setJSON('userTodos', data.todos);
        if (data.settings?.theme) storage.set('theme', data.settings.theme);
        if (data.settings?.lang) storage.set('lang', data.settings.lang);
        
        showToast('Données importées avec succès !', 'success');
        setTimeout(() => location.reload(), 1500);
      } catch (error) {
        showToast('Erreur lors de l\'import', 'error');
      }
    };
    reader.readAsText(file);
  };

  // ========================================
  // MODE DÉMONSTRATION
  // ========================================
  window.enableDemoMode = function() {
    const demoUser = { 
      name: "Client Démo", 
      email: "demo@hamglobalwords.com", 
      password: "demo123",
      isDemo: true 
    };
    storage.setJSON('user', demoUser);
    storage.set('isLogged', 'true');
    storage.set('demoMode', 'true');
    
    const demoRequests = [
      { id: 1, service: "Traduction", date: "2024-01-15", status: "envoyé", message: "Bonjour, j'ai un document à traduire" },
      { id: 2, service: "Formation", date: "2024-01-20", status: "pending", message: "Je souhaite m'inscrire à la formation" },
      { id: 3, service: "Annotation IA", date: "2024-01-25", status: "envoyé", message: "Besoin d'un dataset pour projet NLP" }
    ];
    storage.setJSON('requestsHistory', demoRequests);
    
    showToast('Mode démo activé ! Redirection...', 'success');
    setTimeout(() => window.location.href = "dashboard.html", 1500);
  };

  // ========================================
  // MODE FOCUS
  // ========================================
  window.toggleFocusMode = function() {
    document.body.classList.toggle('focus-mode');
    const isFocus = document.body.classList.contains('focus-mode');
    showToast(isFocus ? 'Mode focus activé' : 'Mode focus désactivé', 'info');
    storage.set('focusMode', isFocus ? 'true' : 'false');
  };

  // ========================================
  // STATISTIQUES
  // ========================================
  window.getStats = function() {
    const history = getRequestHistory();
    const now = new Date();
    const thisMonth = history.filter(r => {
      const rDate = new Date(r.timestamp || r.date);
      return rDate.getMonth() === now.getMonth() && rDate.getFullYear() === now.getFullYear();
    });
    
    const serviceCount = {};
    history.forEach(r => {
      const service = r.service || 'Autre';
      serviceCount[service] = (serviceCount[service] || 0) + 1;
    });
    
    let mostUsedService = 'Aucun';
    let maxCount = 0;
    for (const [service, count] of Object.entries(serviceCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedService = service;
      }
    }
    
    return {
      total: history.length,
      thisMonth: thisMonth.length,
      lastRequest: history[0]?.date || 'Aucune',
      mostUsedService: mostUsedService,
      completionRate: history.length > 0 ? Math.round((history.filter(r => r.status === 'envoyé').length / history.length) * 100) : 0
    };
  };

  // ========================================
  // NOTES PERSONNELLES
  // ========================================
  window.saveNote = function(note) {
    if (!note.trim()) {
      showToast('Veuillez écrire une note', 'warning');
      return false;
    }
    const notes = storage.getJSON('userNotes', []);
    notes.unshift({
      id: Date.now(),
      content: note,
      date: new Date().toLocaleString()
    });
    if (notes.length > 20) notes.pop();
    storage.setJSON('userNotes', notes);
    showToast('Note sauvegardée', 'success');
    return notes;
  };

  window.getNotes = function() {
    return storage.getJSON('userNotes', []);
  };

  window.deleteNote = function(id) {
    let notes = storage.getJSON('userNotes', []);
    notes = notes.filter(n => n.id !== id);
    storage.setJSON('userNotes', notes);
    showToast('Note supprimée', 'info');
    return notes;
  };

  window.displayNotes = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const notes = getNotes();
    if (notes.length === 0) {
      container.innerHTML = '<p class="text-center">Aucune note</p>';
      return;
    }
    
    container.innerHTML = notes.map(note => `
      <div class="card" style="margin-bottom: 0.5rem; padding: 1rem;">
        <p>${escapeHtml(note.content)}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
          <small class="history-date">${note.date}</small>
          <button onclick="deleteNote(${note.id}); location.reload();" class="close-banner" style="background: #ef4444;">🗑️</button>
        </div>
      </div>
    `).join('');
  };

  // ========================================
  // TODO LIST
  // ========================================
  window.addTodo = function(task, dueDate) {
    if (!task.trim()) {
      showToast('Veuillez décrire la tâche', 'warning');
      return false;
    }
    const todos = storage.getJSON('userTodos', []);
    todos.push({
      id: Date.now(),
      task: task,
      dueDate: dueDate || '',
      completed: false,
      created: new Date().toISOString()
    });
    storage.setJSON('userTodos', todos);
    showToast('Tâche ajoutée', 'success');
    return todos;
  };

  window.toggleTodo = function(id) {
    const todos = storage.getJSON('userTodos', []);
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
    storage.setJSON('userTodos', todos);
    showToast(todo.completed ? 'Tâche terminée !' : 'Tâche réactivée', 'info');
    return todos;
  };

  window.getTodos = function() {
    return storage.getJSON('userTodos', []);
  };

  window.displayTodos = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const todos = getTodos();
    if (todos.length === 0) {
      container.innerHTML = '<p class="text-center">Aucune tâche</p>';
      return;
    }
    
    container.innerHTML = todos.map(todo => `
      <div class="card" style="margin-bottom: 0.5rem; padding: 1rem; ${todo.completed ? 'opacity: 0.6;' : ''}">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id}); location.reload();">
          <span style="flex: 1; ${todo.completed ? 'text-decoration: line-through;' : ''}">${escapeHtml(todo.task)}</span>
          ${todo.dueDate ? `<small class="history-date">📅 ${todo.dueDate}</small>` : ''}
        </div>
      </div>
    `).join('');
  };

  // ========================================
  // SYSTÈME DE BADGES
  // ========================================
  const badges = {
    firstRequest: { name: "🌟 Premier pas", desc: "Première demande envoyée", icon: "🌟" },
    fiveRequests: { name: "📚 Assidu", desc: "5 demandes envoyées", icon: "📚" },
    tenRequests: { name: "🎯 Expert", desc: "10 demandes envoyées", icon: "🎯" },
    demoUser: { name: "🎬 Testeur", desc: "Mode démo activé", icon: "🎬" },
    exportUser: { name: "💾 Sauvegarde", desc: "Données exportées", icon: "💾" }
  };

  window.checkAndAwardBadges = function() {
    const history = getRequestHistory();
    const count = history.length;
    const earned = storage.getJSON('earnedBadges', []);
    const newBadges = [];
    
    if (count >= 1 && !earned.includes('firstRequest')) newBadges.push('firstRequest');
    if (count >= 5 && !earned.includes('fiveRequests')) newBadges.push('fiveRequests');
    if (count >= 10 && !earned.includes('tenRequests')) newBadges.push('tenRequests');
    
    if (newBadges.length) {
      newBadges.forEach(b => {
        showToast(`🏆 Badge débloqué : ${badges[b].name} !`, 'success');
      });
      storage.setJSON('earnedBadges', [...earned, ...newBadges]);
    }
    
    return storage.getJSON('earnedBadges', []);
  };

  window.getBadges = function() {
    return storage.getJSON('earnedBadges', []);
  };

  window.displayBadges = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const earned = getBadges();
    if (earned.length === 0) {
      container.innerHTML = '<p class="text-center">Aucun badge pour le moment</p>';
      return;
    }
    
    container.innerHTML = `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        ${earned.map(b => `
          <div class="card" style="text-align: center; padding: 1rem; min-width: 120px;">
            <div style="font-size: 2rem;">${badges[b]?.icon || '🏆'}</div>
            <strong>${badges[b]?.name || b}</strong>
            <small>${badges[b]?.desc || ''}</small>
          </div>
        `).join('')}
      </div>
    `;
  };

  // ========================================
  // CALENDRIER
  // ========================================
  window.getCalendarData = function() {
    const history = getRequestHistory();
    const calendar = {};
    history.forEach(item => {
      const date = (item.timestamp || item.date).split('T')[0];
      calendar[date] = (calendar[date] || 0) + 1;
    });
    return calendar;
  };

  window.renderMiniCalendar = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar = getCalendarData();
    
    let html = '<div class="mini-calendar"><div class="calendar-header">';
    html += ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(d => `<span>${d}</span>`).join('');
    html += '</div><div class="calendar-grid">';
    
    for (let i = 0; i < firstDay; i++) html += '<span></span>';
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const hasActivity = calendar[dateStr];
      html += `<span class="${hasActivity ? 'has-activity' : ''}">${d}${hasActivity ? ` <small>📌</small>` : ''}</span>`;
    }
    
    html += '</div></div>';
    container.innerHTML = html;
  };

  // ========================================
  // RECHERCHE
  // ========================================
  window.searchHistory = function(query) {
    const history = getRequestHistory();
    if (!query) return history;
    const lowerQuery = query.toLowerCase();
    return history.filter(item => 
      (item.service && item.service.toLowerCase().includes(lowerQuery)) ||
      (item.message && item.message.toLowerCase().includes(lowerQuery)) ||
      (item.name && item.name.toLowerCase().includes(lowerQuery))
    );
  };

  window.displaySearchResults = function(query, containerId) {
    const results = searchHistory(query);
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (results.length === 0) {
      container.innerHTML = '<p class="text-center">Aucun résultat</p>';
      return;
    }
    
    container.innerHTML = `
      <ul class="history-list">
        ${results.map(item => `
          <li>
            <div>
              <strong>${escapeHtml(item.service || 'Demande')}</strong>
              <div class="history-date">${item.date}</div>
            </div>
            <span class="history-status status-${item.status}">${item.status === 'envoyé' ? 'Envoyé' : item.status}</span>
          </li>
        `).join('')}
      </ul>
    `;
  };

  // ========================================
  // EXPORT PDF
  // ========================================
  window.exportToPDF = function() {
    const history = getRequestHistory();
    const stats = getStats();
    
    let html = `
      <html>
      <head><title>HAM Global Words - Rapport</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #6366F1; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background: #6366F1; color: white; }
      </style>
      </head>
      <body>
        <h1>HAM Global Words - Rapport d'activité</h1>
        <p>Date: ${new Date().toLocaleString()}</p>
        <h2>Statistiques</h2>
        <ul>
          <li>Total demandes: ${stats.total}</li>
          <li>Ce mois-ci: ${stats.thisMonth}</li>
          <li>Taux d'envoi: ${stats.completionRate}%</li>
          <li>Service le plus utilisé: ${stats.mostUsedService}</li>
        </ul>
        <h2>Historique des demandes</h2>
        <table>
          <tr><th>Date</th><th>Service</th><th>Statut</th></tr>
          ${history.map(item => `
            <tr>
              <td>${item.date}</td>
              <td>${item.service || '-'}</td>
              <td>${item.status}</td>
            </tr>
          `).join('')}
        </table>
      </body>
      </html>
    `;
    
    const blob = new Blob([html], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
    showToast('Rapport généré', 'success');
  };

  // ========================================
  // RAPPELS PROGRAMMÉS
  // ========================================
  window.scheduleReminder = function(message, days) {
    if (!message.trim()) {
      showToast('Veuillez entrer un message', 'warning');
      return false;
    }
    const reminders = storage.getJSON('reminders', []);
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + days);
    
    reminders.push({
      id: Date.now(),
      message: message,
      date: reminderDate.toISOString(),
      completed: false
    });
    
    storage.setJSON('reminders', reminders);
    showToast(`Rappel programmé dans ${days} jours`, 'success');
    return reminders;
  };

  window.checkReminders = function() {
    const reminders = storage.getJSON('reminders', []);
    const now = new Date();
    let changed = false;
    
    reminders.forEach(reminder => {
      if (!reminder.completed && new Date(reminder.date) <= now) {
        showToast(`🔔 RAPPEL : ${reminder.message}`, 'warning');
        reminder.completed = true;
        changed = true;
      }
    });
    
    if (changed) storage.setJSON('reminders', reminders);
  };

  // ========================================
  // TEMPLATES DE MESSAGES
  // ========================================
  const messageTemplates = {
    devis: "Bonjour, je souhaite obtenir un devis pour un projet de traduction. Pouvez-vous me contacter pour en discuter ?",
    formation: "Bonjour, je souhaite m'inscrire à la formation Programme Starter Tech. Je suis débutant et très motivé !",
    traduction: "Bonjour, j'ai un document à traduire du français vers l'anglais. Pouvez-vous me faire un devis ?",
    interpretation: "Bonjour, j'ai besoin d'un interprète pour une réunion professionnelle. Merci de me contacter.",
    annotation: "Bonjour, je cherche une équipe pour annoter des données pour un projet IA. Quels sont vos tarifs ?"
  };
  
  window.applyTemplate = function(templateKey, textareaId = '#contactForm textarea, #formationForm textarea') {
    const textarea = document.querySelector(textareaId);
    if (textarea && messageTemplates[templateKey]) {
      textarea.value = messageTemplates[templateKey];
      textarea.focus();
      showToast('Template appliqué !', 'success');
    }
  };
  
  window.getTemplates = function() {
    return messageTemplates;
  };

  // ========================================
  // QR CODE
  // ========================================
  window.showQRCode = function() {
    const url = window.location.href;
    const qrDiv = document.createElement('div');
    qrDiv.className = 'qr-modal';
    qrDiv.innerHTML = `
      <div class="qr-content">
        <h3>📱 Partagez HAM Global Words</h3>
        <div id="qrCode"></div>
        <p>Scannez pour accéder au site</p>
        <button onclick="this.parentElement.parentElement.remove()" class="cta-btn">Fermer</button>
      </div>
    `;
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;
    qrDiv.querySelector('#qrCode').innerHTML = `<img src="${qrUrl}" alt="QR Code">`;
    
    document.body.appendChild(qrDiv);
  };

  // ========================================
  // THÈMES PERSONNALISÉS
  // ========================================
  const themes = {
    dark: { name: "Sombre", bg: "#0B0F14", text: "#E5E7EB" },
    light: { name: "Clair", bg: "#F9FAFB", text: "#111827" },
    blue: { name: "Bleu", bg: "#0F172A", text: "#E2E8F0", accent: "#3B82F6" },
    purple: { name: "Violet", bg: "#1E1B4B", text: "#E0E7FF", accent: "#8B5CF6" }
  };

  window.applyTheme = function(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    document.documentElement.style.setProperty('--bg-primary', theme.bg);
    document.documentElement.style.setProperty('--text-primary', theme.text);
    if (theme.accent) {
      document.documentElement.style.setProperty('--accent-primary', theme.accent);
    }
    
    storage.set('customTheme', themeName);
    showToast(`Thème ${theme.name} activé`, 'success');
  };

  // ========================================
  // SIMULATION UPLOAD
  // ========================================
  window.simulateFileUpload = function(file) {
    return new Promise((resolve) => {
      const progressContainer = document.createElement('div');
      progressContainer.className = 'upload-progress';
      progressContainer.innerHTML = `<div class="progress-bar" style="width: 0%"></div>`;
      document.body.appendChild(progressContainer);
      
      let width = 0;
      const interval = setInterval(() => {
        width += 10;
        const progressBar = progressContainer.querySelector('.progress-bar');
        if (progressBar) progressBar.style.width = width + '%';
        
        if (width >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            progressContainer.remove();
            resolve();
          }, 300);
        }
      }, 80);
    });
  };

  // ========================================
  // UTILITAIRES
  // ========================================
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // ========================================
  // INITIALISATION
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    const focusMode = storage.get('focusMode', 'false');
    if (focusMode === 'true') document.body.classList.add('focus-mode');
    
    updateNotificationBadge();
    checkReminders();
    setInterval(checkReminders, 60000);
    
    const demoMode = storage.get('demoMode', 'false');
    if (demoMode === 'true' && !document.querySelector('.demo-badge')) {
      const badge = document.createElement('div');
      badge.className = 'demo-badge';
      badge.innerHTML = '🎬 MODE DÉMO';
      document.body.appendChild(badge);
    }
    
    const customTheme = storage.get('customTheme');
    if (customTheme && customTheme !== 'dark' && customTheme !== 'light') {
      applyTheme(customTheme);
    }
  });

})();
