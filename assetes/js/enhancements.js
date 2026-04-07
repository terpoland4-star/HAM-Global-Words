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
  // TOAST NOTIFICATIONS (amélioré)
  // ========================================
  window.showToast = function(message, type = 'success', duration = 3000) {
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
    
    toast.innerHTML = `<span class="toast-icon">${icons[type] || '✅'}</span><span class="toast-message">${escapeHtml(message)}</span>`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(toast);
    
    // Animation d'entrée
    setTimeout(() => toast.classList.add('toast-show'), 10);
    
    setTimeout(() => {
      toast.classList.remove('toast-show');
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // ========================================
  // SAUVEGARDE DES DEMANDES
  // ========================================
  window.saveRequestToHistory = function(request) {
    if (!request || (!request.service && !request.message)) {
      console.warn('Tentative de sauvegarde d\'une requête invalide');
      return false;
    }
    
    const history = storage.getJSON('requestsHistory', []);
    const newRequest = {
      ...request,
      id: Date.now(),
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString(),
      status: request.status || 'envoyé'
    };
    
    history.unshift(newRequest);
    
    // Limiter l'historique à 100 éléments
    while (history.length > 100) history.pop();
    
    storage.setJSON('requestsHistory', history);
    updateNotificationBadge();
    checkAndAwardBadges();
    
    return true;
  };

  // ========================================
  // HISTORIQUE DES DEMANDES
  // ========================================
  window.getRequestHistory = function(filter = null) {
    const history = storage.getJSON('requestsHistory', []);
    if (!filter) return history;
    
    const { startDate, endDate, service, status } = filter;
    return history.filter(item => {
      if (startDate && new Date(item.timestamp) < new Date(startDate)) return false;
      if (endDate && new Date(item.timestamp) > new Date(endDate)) return false;
      if (service && item.service !== service) return false;
      if (status && item.status !== status) return false;
      return true;
    });
  };
  
  window.displayRequestHistory = function(containerId, limit = 10) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const history = getRequestHistory();
    const displayHistory = history.slice(0, limit);
    
    if (displayHistory.length === 0) {
      container.innerHTML = '<p class="text-center text-muted">Aucune demande pour le moment</p>';
      return;
    }
    
    const html = `
      <div class="history-container">
        <div class="history-header">
          <span>Dernières demandes (${history.length} total)</span>
          ${history.length > limit ? `<button onclick="displayRequestHistory('${containerId}', ${history.length})" class="text-btn">Voir tout</button>` : ''}
        </div>
        <ul class="history-list">
          ${displayHistory.map(item => `
            <li class="history-item" data-id="${item.id}">
              <div class="history-info">
                <strong class="history-service">${escapeHtml(item.service || 'Demande')}</strong>
                <div class="history-date">${item.date}</div>
                ${item.message ? `<div class="history-message">${escapeHtml(item.message.substring(0, 100))}${item.message.length > 100 ? '...' : ''}</div>` : ''}
              </div>
              <span class="history-status status-${item.status}">${getStatusText(item.status)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    container.innerHTML = html;
  };

  // ========================================
  // COMPTEUR DE NOTIFICATIONS
  // ========================================
  window.updateNotificationBadge = function() {
    const history = getRequestHistory();
    const pendingCount = history.filter(h => h.status === 'pending' || h.status === 'en_attente').length;
    
    const badge = document.getElementById('notificationBadge');
    if (badge) {
      if (pendingCount > 0) {
        badge.textContent = pendingCount > 9 ? '9+' : pendingCount;
        badge.classList.add('show');
        badge.setAttribute('aria-label', `${pendingCount} notification${pendingCount > 1 ? 's' : ''}`);
      } else {
        badge.classList.remove('show');
      }
    }
    
    // Mettre à jour le titre de la page
    if (pendingCount > 0 && document.title && !document.title.startsWith('(')) {
      document.title = `(${pendingCount}) ${document.title}`;
    } else if (pendingCount === 0 && document.title.startsWith('(')) {
      document.title = document.title.replace(/^\(\d+\)\s/, '');
    }
  };

  // ========================================
  // EXPORT DES DONNÉES
  // ========================================
  window.exportUserData = function(format = 'json') {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      user: storage.getJSON('user', null),
      requests: getRequestHistory(),
      earnedBadges: storage.getJSON('earnedBadges', []),
      notes: storage.getJSON('userNotes', []),
      todos: storage.getJSON('userTodos', []),
      settings: {
        theme: storage.get('theme', 'dark'),
        lang: storage.get('lang', 'fr'),
        focusMode: storage.get('focusMode', 'false')
      }
    };
    
    let blob, filename;
    
    if (format === 'csv') {
      const csvRows = [
        ['Date', 'Service', 'Message', 'Statut'].join(','),
        ...data.requests.map(r => [
          `"${r.date}"`,
          `"${r.service || ''}"`,
          `"${(r.message || '').replace(/"/g, '""')}"`,
          `"${r.status}"`
        ].join(','))
      ];
      const csvContent = csvRows.join('\n');
      blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      filename = `ham-data-${new Date().toISOString().slice(0,19)}.csv`;
    } else {
      blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      filename = `ham-data-${new Date().toISOString().slice(0,19)}.json`;
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    // Détecter l'export pour les badges
    const earnedBadges = storage.getJSON('earnedBadges', []);
    if (!earnedBadges.includes('exportUser')) {
      const newBadges = [...earnedBadges, 'exportUser'];
      storage.setJSON('earnedBadges', newBadges);
      showToast('🏆 Badge débloqué : Sauvegarde !', 'success');
    }
    
    showToast(`Données exportées (${format.toUpperCase()})`, 'success');
  };

  // ========================================
  // IMPORT DES DONNÉES
  // ========================================
  window.importUserData = function(file) {
    if (!file) {
      showToast('Veuillez sélectionner un fichier', 'warning');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validation basique
        if (!data || typeof data !== 'object') {
          throw new Error('Format invalide');
        }
        
        let importedCount = 0;
        
        if (data.user && data.user.name && data.user.email) {
          storage.setJSON('user', { ...data.user, isImported: true });
          importedCount++;
        }
        
        if (Array.isArray(data.requests)) {
          const existingHistory = getRequestHistory();
          const newHistory = [...data.requests, ...existingHistory];
          // Éviter les doublons basés sur l'ID ou le timestamp
          const uniqueHistory = newHistory.filter((item, index, self) => 
            index === self.findIndex(i => i.id === item.id || (i.timestamp === item.timestamp && i.message === item.message))
          );
          storage.setJSON('requestsHistory', uniqueHistory.slice(0, 100));
          importedCount++;
        }
        
        if (Array.isArray(data.notes)) storage.setJSON('userNotes', data.notes.slice(0, 50));
        if (Array.isArray(data.todos)) storage.setJSON('userTodos', data.todos);
        if (Array.isArray(data.earnedBadges)) storage.setJSON('earnedBadges', data.earnedBadges);
        
        if (data.settings?.theme) storage.set('theme', data.settings.theme);
        if (data.settings?.lang) storage.set('lang', data.settings.lang);
        if (data.settings?.focusMode) storage.set('focusMode', data.settings.focusMode);
        
        showToast(`Importé avec succès (${importedCount} catégories)`, 'success');
        setTimeout(() => location.reload(), 1500);
      } catch (error) {
        console.error('Erreur import:', error);
        showToast('Erreur lors de l\'import : fichier invalide', 'error');
      }
    };
    reader.onerror = () => showToast('Erreur de lecture du fichier', 'error');
    reader.readAsText(file);
  };

  // ========================================
  // MODE DÉMONSTRATION
  // ========================================
  window.enableDemoMode = function() {
    if (confirm('⚠️ Le mode démo effacera vos données actuelles. Continuer ?')) {
      // Sauvegarde avant effacement
      const currentData = storage.getJSON('user', null);
      if (currentData && !currentData.isDemo) {
        storage.setJSON('userBackup', currentData);
      }
      
      const demoUser = { 
        name: "Client Démo", 
        email: "demo@hamglobalwords.com", 
        password: "demo123",
        isDemo: true,
        createdAt: new Date().toISOString()
      };
      storage.setJSON('user', demoUser);
      storage.set('isLogged', 'true');
      storage.set('demoMode', 'true');
      
      const today = new Date();
      const getDate = (daysAgo) => {
        const d = new Date(today);
        d.setDate(d.getDate() - daysAgo);
        return d.toLocaleString();
      };
      
      const demoRequests = [
        { id: 1001, service: "Traduction", date: getDate(30), timestamp: new Date(Date.now() - 30*86400000).toISOString(), status: "envoyé", message: "Bonjour, j'ai un document à traduire du français vers l'anglais" },
        { id: 1002, service: "Formation", date: getDate(25), timestamp: new Date(Date.now() - 25*86400000).toISOString(), status: "pending", message: "Je souhaite m'inscrire à la formation en intelligence artificielle" },
        { id: 1003, service: "Interprétation", date: getDate(20), timestamp: new Date(Date.now() - 20*86400000).toISOString(), status: "envoyé", message: "Interprète pour conférence internationale" },
        { id: 1004, service: "Annotation IA", date: getDate(15), timestamp: new Date(Date.now() - 15*86400000).toISOString(), status: "envoyé", message: "Dataset pour projet NLP en langues africaines" },
        { id: 1005, service: "Localisation", date: getDate(10), timestamp: new Date(Date.now() - 10*86400000).toISOString(), status: "pending", message: "Localisation d'application mobile" }
      ];
      storage.setJSON('requestsHistory', demoRequests);
      
      const demoBadges = ['firstRequest', 'fiveRequests'];
      storage.setJSON('earnedBadges', demoBadges);
      
      showToast('🎬 Mode démo activé ! Redirection...', 'success');
      setTimeout(() => window.location.href = "dashboard.html", 1500);
    }
  };
  
  window.exitDemoMode = function() {
    if (confirm('Quitter le mode démo ? Vos données de démo seront perdues.')) {
      const backupUser = storage.getJSON('userBackup', null);
      if (backupUser) {
        storage.setJSON('user', backupUser);
        storage.remove('userBackup');
      } else {
        storage.remove('user');
      }
      storage.remove('isLogged');
      storage.remove('demoMode');
      storage.remove('requestsHistory');
      storage.remove('earnedBadges');
      showToast('Mode démo désactivé', 'info');
      setTimeout(() => window.location.href = "index.html", 1000);
    }
  };

  // ========================================
  // MODE FOCUS
  // ========================================
  window.toggleFocusMode = function() {
    document.body.classList.toggle('focus-mode');
    const isFocus = document.body.classList.contains('focus-mode');
    showToast(isFocus ? '🎯 Mode focus activé' : 'Mode focus désactivé', 'info');
    storage.set('focusMode', isFocus ? 'true' : 'false');
    
    // Masquer/afficher certains éléments en mode focus
    const nonEssentialElements = document.querySelectorAll('.sidebar, .footer, .ads, .social-share');
    nonEssentialElements.forEach(el => {
      if (el) el.style.display = isFocus ? 'none' : '';
    });
  };

  // ========================================
  // STATISTIQUES (améliorées)
  // ========================================
  window.getStats = function() {
    const history = getRequestHistory();
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const thisMonth = history.filter(r => new Date(r.timestamp) >= startOfMonth);
    const thisWeek = history.filter(r => new Date(r.timestamp) >= startOfWeek);
    
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
    
    const last30Days = history.filter(r => {
      const daysDiff = (now - new Date(r.timestamp)) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30;
    }).length;
    
    return {
      total: history.length,
      thisMonth: thisMonth.length,
      thisWeek: thisWeek.length,
      last30Days: last30Days,
      lastRequest: history[0]?.date || 'Aucune',
      mostUsedService: mostUsedService,
      completionRate: history.length > 0 ? Math.round((history.filter(r => r.status === 'envoyé').length / history.length) * 100) : 0
    };
  };
  
  window.displayStats = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const stats = getStats();
    
    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">Total demandes</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.thisMonth}</div>
          <div class="stat-label">Ce mois</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.thisWeek}</div>
          <div class="stat-label">Cette semaine</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.completionRate}%</div>
          <div class="stat-label">Taux d'envoi</div>
        </div>
      </div>
      <div class="stats-detail">
        <p>📊 Service le plus utilisé : <strong>${escapeHtml(stats.mostUsedService)}</strong></p>
        <p>📅 Dernière demande : ${stats.lastRequest}</p>
        <p>📈 Activité 30 jours : ${stats.last30Days} demande${stats.last30Days > 1 ? 's' : ''}</p>
      </div>
    `;
  };

  // ========================================
  // NOTES PERSONNELLES (améliorées)
  // ========================================
  window.saveNote = function(note, category = 'general') {
    if (!note || !note.trim()) {
      showToast('Veuillez écrire une note', 'warning');
      return false;
    }
    
    const notes = storage.getJSON('userNotes', []);
    const newNote = {
      id: Date.now(),
      content: note.trim(),
      category: category,
      date: new Date().toLocaleString(),
      timestamp: new Date().toISOString()
    };
    
    notes.unshift(newNote);
    while (notes.length > 50) notes.pop();
    storage.setJSON('userNotes', notes);
    showToast('📝 Note sauvegardée', 'success');
    return notes;
  };

  window.getNotes = function(category = null) {
    const notes = storage.getJSON('userNotes', []);
    if (!category) return notes;
    return notes.filter(n => n.category === category);
  };

  window.deleteNote = function(id) {
    let notes = storage.getJSON('userNotes', []);
    const newNotes = notes.filter(n => n.id !== id);
    if (newNotes.length === notes.length) {
      showToast('Note non trouvée', 'warning');
      return false;
    }
    storage.setJSON('userNotes', newNotes);
    showToast('Note supprimée', 'info');
    return newNotes;
  };
  
  window.updateNote = function(id, newContent) {
    let notes = storage.getJSON('userNotes', []);
    const noteIndex = notes.findIndex(n => n.id === id);
    if (noteIndex === -1) return false;
    
    notes[noteIndex].content = newContent;
    notes[noteIndex].updatedAt = new Date().toISOString();
    storage.setJSON('userNotes', notes);
    showToast('Note mise à jour', 'success');
    return notes;
  };

  window.displayNotes = function(containerId, category = null) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const notes = getNotes(category);
    if (notes.length === 0) {
      container.innerHTML = '<p class="text-center text-muted">Aucune note</p>';
      return;
    }
    
    container.innerHTML = notes.map(note => `
      <div class="note-card" data-id="${note.id}">
        <div class="note-content">${escapeHtml(note.content)}</div>
        <div class="note-meta">
          <small class="note-date">📅 ${note.date}</small>
          ${note.category !== 'general' ? `<span class="note-category">${escapeHtml(note.category)}</span>` : ''}
          <button onclick="deleteNote(${note.id}); setTimeout(() => displayNotes('${containerId}', ${category ? `'${category}'` : null}), 100);" class="note-delete" aria-label="Supprimer">🗑️</button>
        </div>
      </div>
    `).join('');
  };

  // ========================================
  // TODO LIST (améliorée)
  // ========================================
  window.addTodo = function(task, dueDate, priority = 'medium') {
    if (!task || !task.trim()) {
      showToast('Veuillez décrire la tâche', 'warning');
      return false;
    }
    
    const todos = storage.getJSON('userTodos', []);
    const newTodo = {
      id: Date.now(),
      task: task.trim(),
      dueDate: dueDate || '',
      priority: priority,
      completed: false,
      created: new Date().toISOString(),
      order: todos.length
    };
    
    todos.push(newTodo);
    storage.setJSON('userTodos', todos);
    showToast('✅ Tâche ajoutée', 'success');
    return todos;
  };

  window.toggleTodo = function(id) {
    const todos = storage.getJSON('userTodos', []);
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.completedAt = todo.completed ? new Date().toISOString() : null;
      storage.setJSON('userTodos', todos);
      showToast(todo.completed ? '🎉 Tâche terminée !' : 'Tâche réactivée', 'info');
    }
    return todos;
  };
  
  window.deleteTodo = function(id) {
    let todos = storage.getJSON('userTodos', []);
    const newTodos = todos.filter(t => t.id !== id);
    storage.setJSON('userTodos', newTodos);
    showToast('Tâche supprimée', 'info');
    return newTodos;
  };

  window.getTodos = function(showCompleted = true) {
    let todos = storage.getJSON('userTodos', []);
    if (!showCompleted) {
      todos = todos.filter(t => !t.completed);
    }
    return todos.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (a.priority !== b.priority) {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return (a.dueDate || '9999') - (b.dueDate || '9999');
    });
  };

  window.displayTodos = function(containerId, showCompleted = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const todos = getTodos(showCompleted);
    const activeCount = todos.filter(t => !t.completed).length;
    const completedCount = todos.filter(t => t.completed).length;
    
    if (todos.length === 0) {
      container.innerHTML = '<p class="text-center text-muted">Aucune tâche</p>';
      return;
    }
    
    const priorityIcons = { high: '🔴', medium: '🟡', low: '🟢' };
    
    container.innerHTML = `
      <div class="todo-stats">
        <span>📋 ${activeCount} active${activeCount > 1 ? 's' : ''}</span>
        <span>✅ ${completedCount} terminée${completedCount > 1 ? 's' : ''}</span>
      </div>
      <div class="todo-list">
        ${todos.map(todo => `
          <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id}); setTimeout(() => displayTodos('${containerId}', ${showCompleted}), 100);" id="todo-${todo.id}">
            <label for="todo-${todo.id}" class="todo-label">
              <span class="todo-priority">${priorityIcons[todo.priority] || '⚪'}</span>
              <span class="todo-task">${escapeHtml(todo.task)}</span>
              ${todo.dueDate ? `<span class="todo-due">📅 ${todo.dueDate}</span>` : ''}
            </label>
            <button onclick="deleteTodo(${todo.id}); setTimeout(() => displayTodos('${containerId}', ${showCompleted}), 100);" class="todo-delete" aria-label="Supprimer">🗑️</button>
          </div>
        `).join('')}
      </div>
    `;
  };

  // ========================================
  // SYSTÈME DE BADGES (étendu)
  // ========================================
  const badges = {
    firstRequest: { name: "🌟 Premier pas", desc: "Première demande envoyée", icon: "🌟", requirement: (data) => data.totalRequests >= 1 },
    fiveRequests: { name: "📚 Assidu", desc: "5 demandes envoyées", icon: "📚", requirement: (data) => data.totalRequests >= 5 },
    tenRequests: { name: "🎯 Expert", desc: "10 demandes envoyées", icon: "🎯", requirement: (data) => data.totalRequests >= 10 },
    twentyRequests: { name: "🏆 Pro", desc: "20 demandes envoyées", icon: "🏆", requirement: (data) => data.totalRequests >= 20 },
    demoUser: { name: "🎬 Testeur", desc: "Mode démo activé", icon: "🎬", requirement: (data) => data.demoUsed === true },
    exportUser: { name: "💾 Sauvegarde", desc: "Données exportées", icon: "💾", requirement: (data) => data.exported === true },
    noteTaker: { name: "📝 Scribouillard", desc: "5 notes sauvegardées", icon: "📝", requirement: (data) => data.notesCount >= 5 },
    taskMaster: { name: "✅ Productif", desc: "10 tâches complétées", icon: "✅", requirement: (data) => data.completedTodos >= 10 },
    earlyBird: { name: "🌅 Matinal", desc: "Connexion avant 8h", icon: "🌅", requirement: (data) => data.earlyLogin === true },
    nightOwl: { name: "🦉 Noctambule", desc: "Connexion après 23h", icon: "🦉", requirement: (data) => data.nightLogin === true }
  };

  window.checkAndAwardBadges = function() {
    const history = getRequestHistory();
    const notes = storage.getJSON('userNotes', []);
    const todos = storage.getJSON('userTodos', []);
    const completedTodos = todos.filter(t => t.completed).length;
    const demoUsed = storage.get('demoMode', 'false') === 'true';
    const exported = storage.getJSON('earnedBadges', []).includes('exportUser');
    
    const userData = {
      totalRequests: history.length,
      notesCount: notes.length,
      completedTodos: completedTodos,
      demoUsed: demoUsed,
      exported: exported
    };
    
    const earned = storage.getJSON('earnedBadges', []);
    const newBadges = [];
    
    for (const [badgeId, badgeInfo] of Object.entries(badges)) {
      if (!earned.includes(badgeId) && badgeInfo.requirement(userData)) {
        newBadges.push(badgeId);
      }
    }
    
    if (newBadges.length) {
      newBadges.forEach(b => {
        showToast(`🏆 Nouveau badge : ${badges[b].name} !`, 'success');
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
      container.innerHTML = '<p class="text-center text-muted">Aucun badge pour le moment. Continuez à utiliser la plateforme !</p>';
      return;
    }
    
    container.innerHTML = `
      <div class="badges-grid">
        ${earned.map(badgeId => {
          const badge = badges[badgeId];
          if (!badge) return '';
          return `
            <div class="badge-card" title="${badge.desc}">
              <div class="badge-icon">${badge.icon}</div>
              <div class="badge-name">${badge.name}</div>
              <div class="badge-desc">${badge.desc}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  };

  // ========================================
  // CALENDRIER D'ACTIVITÉ
  // ========================================
  window.getCalendarData = function() {
    const history = getRequestHistory();
    const calendar = {};
    history.forEach(item => {
      const date = item.timestamp ? item.timestamp.split('T')[0] : '';
      if (date) {
        calendar[date] = (calendar[date] || 0) + 1;
      }
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
    
    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    let html = '<div class="mini-calendar">';
    html += `<div class="calendar-month">${new Date(year, month).toLocaleString('fr', { month: 'long', year: 'numeric' })}</div>`;
    html += `<div class="calendar-header">${dayNames.map(d => `<span>${d}</span>`).join('')}</div>`;
    html += '<div class="calendar-grid">';
    
    for (let i = 0; i < firstDay; i++) html += '<span></span>';
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const activityCount = calendar[dateStr];
      const isToday = d === now.getDate();
      html += `<span class="calendar-day ${isToday ? 'today' : ''} ${activityCount ? 'has-activity' : ''}" title="${activityCount ? activityCount + ' demande(s)' : ''}">
        ${d}${activityCount ? `<span class="activity-dot"></span>` : ''}
      </span>`;
    }
    
    html += '</div></div>';
    container.innerHTML = html;
  };

  // ========================================
  // RECHERCHE (améliorée)
  // ========================================
  window.searchHistory = function(query, fields = ['service', 'message', 'name']) {
    const history = getRequestHistory();
    if (!query || query.trim() === '') return history;
    
    const lowerQuery = query.toLowerCase().trim();
    return history.filter(item => {
      return fields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(lowerQuery);
      });
    });
  };

  window.displaySearchResults = function(query, containerId) {
    const results = searchHistory(query);
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (results.length === 0) {
      container.innerHTML = '<p class="text-center text-muted">Aucun résultat pour cette recherche</p>';
      return;
    }
    
    container.innerHTML = `
      <div class="search-results">
        <div class="search-summary">${results.length} résultat${results.length > 1 ? 's' : ''} pour "${escapeHtml(query)}"</div>
        <ul class="history-list">
          ${results.map(item => `
            <li class="history-item">
              <div class="history-info">
                <strong class="history-service">${escapeHtml(item.service || 'Demande')}</strong>
                <div class="history-date">${item.date}</div>
                ${item.message ? `<div class="history-message">${escapeHtml(item.message.substring(0, 150))}${item.message.length > 150 ? '...' : ''}</div>` : ''}
              </div>
              <span class="history-status status-${item.status}">${getStatusText(item.status)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  };

  // ========================================
  // EXPORT PDF (amélioré)
  // ========================================
  window.exportToPDF = function() {
    const history = getRequestHistory();
    const stats = getStats();
    const user = storage.getJSON('user', {});
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>HAM Global Words - Rapport</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 1200px; margin: 0 auto; }
          h1 { color: #6366F1; border-bottom: 2px solid #6366F1; padding-bottom: 10px; }
          h2 { color: #4B5563; margin-top: 30px; }
          .header { text-align: center; margin-bottom: 30px; }
          .stats { display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; }
          .stat-box { background: #F3F4F6; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
          .stat-value { font-size: 28px; font-weight: bold; color: #6366F1; }
          .stat-label { color: #6B7280; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #E5E7EB; padding: 10px; text-align: left; }
          th { background: #6366F1; color: white; }
          tr:nth-child(even) { background: #F9FAFB; }
          .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #9CA3AF; border-top: 1px solid #E5E7EB; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>HAM Global Words</h1>
          <p>Rapport d'activité - ${new Date().toLocaleString()}</p>
        </div>
        
        <div class="stats">
          <div class="stat-box">
            <div class="stat-value">${stats.total}</div>
            <div class="stat-label">Total demandes</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${stats.thisMonth}</div>
            <div class="stat-label">Ce mois-ci</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${stats.completionRate}%</div>
            <div class="stat-label">Taux d'envoi</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${stats.last30Days}</div>
            <div class="stat-label">30 derniers jours</div>
          </div>
        </div>
        
        <h2>📊 Statistiques détaillées</h2>
        <ul>
          <li>Service le plus utilisé : <strong>${escapeHtml(stats.mostUsedService)}</strong></li>
          <li>Dernière demande : ${stats.lastRequest}</li>
          <li>Demandes cette semaine : ${stats.thisWeek}</li>
        </ul>
        
        <h2>📋 Historique des demandes</h2>
        ${history.length === 0 ? '<p>Aucune demande enregistrée</p>' : `
          <table>
            <thead>
              <tr><th>Date</th><th>Service</th><th>Message</th><th>Statut</th></tr>
            </thead>
            <tbody>
              ${history.slice(0, 50).map(item => `
                <tr>
                  <td>${item.date}</td>
                  <td>${escapeHtml(item.service || '-')}</td>
                  <td>${escapeHtml((item.message || '-').substring(0, 100))}${item.message && item.message.length > 100 ? '...' : ''}</td>
                  <td>${getStatusText(item.status)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ${history.length > 50 ? '<p><em>Seules les 50 dernières demandes sont affichées</em></p>' : ''}
        `}
        
        <div class="footer">
          <p>HAM Global Words - Linguistique, IA & Innovation pour l'Afrique</p>
          <p>Généré le ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.focus();
    } else {
      showToast('Veuillez autoriser les popups pour générer le PDF', 'warning');
    }
    showToast('📄 Rapport généré', 'success');
  };

  // ========================================
  // RAPPELS PROGRAMMÉS (améliorés)
  // ========================================
  window.scheduleReminder = function(message, days, priority = 'normal') {
    if (!message || !message.trim()) {
      showToast('Veuillez entrer un message', 'warning');
      return false;
    }
    
    if (days <= 0 || days > 365) {
      showToast('Les jours doivent être entre 1 et 365', 'warning');
      return false;
    }
    
    const reminders = storage.getJSON('reminders', []);
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + days);
    
    const newReminder = {
      id: Date.now(),
      message: message.trim(),
      date: reminderDate.toISOString(),
      dateDisplay: reminderDate.toLocaleDateString(),
      priority: priority,
      days: days,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    reminders.push(newReminder);
    storage.setJSON('reminders', reminders);
    showToast(`⏰ Rappel programmé dans ${days} jour${days > 1 ? 's' : ''}`, 'success');
    return reminders;
  };
  
  window.getReminders = function() {
    return storage.getJSON('reminders', []);
  };
  
  window.deleteReminder = function(id) {
    let reminders = storage.getJSON('reminders', []);
    const newReminders = reminders.filter(r => r.id !== id);
    storage.setJSON('reminders', newReminders);
    showToast('Rappel supprimé', 'info');
    return newReminders;
  };

  window.checkReminders = function() {
    const reminders = storage.getJSON('reminders', []);
    const now = new Date();
    let changed = false;
    
    reminders.forEach(reminder => {
      if (!reminder.completed && new Date(reminder.date) <= now) {
        const priorityIcon = reminder.priority === 'high' ? '🔴 URGENT' : reminder.priority === 'medium' ? '🟡' : '🟢';
        showToast(`${priorityIcon} RAPPEL : ${reminder.message}`, 'warning', 8000);
        reminder.completed = true;
        changed = true;
      }
    });
    
    if (changed) storage.setJSON('reminders', reminders);
  };
  
  window.displayReminders = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const reminders = getReminders();
    const activeReminders = reminders.filter(r => !r.completed);
    const completedReminders = reminders.filter(r => r.completed);
    
    if (reminders.length === 0) {
      container.innerHTML = '<p class="text-center text-muted">Aucun rappel programmé</p>';
      return;
    }
    
    const priorityIcons = { high: '🔴', medium: '🟡', low: '🟢', normal: '🔵' };
    
    container.innerHTML = `
      <div class="reminders-container">
        ${activeReminders.length > 0 ? `
          <div class="reminders-section">
            <h4>⏰ Rappels actifs (${activeReminders.length})</h4>
            ${activeReminders.map(r => `
              <div class="reminder-item priority-${r.priority}">
                <span class="reminder-icon">${priorityIcons[r.priority] || '⏰'}</span>
                <div class="reminder-content">
                  <div class="reminder-message">${escapeHtml(r.message)}</div>
                  <div class="reminder-date">📅 ${r.dateDisplay}</div>
                </div>
                <button onclick="deleteReminder(${r.id}); setTimeout(() => displayReminders('${containerId}'), 100);" class="reminder-delete">🗑️</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${completedReminders.length > 0 ? `
          <div class="reminders-section completed">
            <h4>✅ Rappels terminés (${completedReminders.length})</h4>
            ${completedReminders.slice(0, 5).map(r => `
              <div class="reminder-item completed">
                <span>✅</span>
                <div class="reminder-content">
                  <div class="reminder-message">${escapeHtml(r.message)}</div>
                  <div class="reminder-date">${r.dateDisplay}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  };

  // ========================================
  // TEMPLATES DE MESSAGES (étendus)
  // ========================================
  const messageTemplates = {
    devis: "Bonjour, je souhaite obtenir un devis pour un projet de traduction. Pouvez-vous me contacter pour en discuter ?",
    formation: "Bonjour, je souhaite m'inscrire à la formation Programme Starter Tech. Je suis débutant et très motivé !",
    traduction: "Bonjour, j'ai un document à traduire du français vers l'anglais. Pouvez-vous me faire un devis ?",
    interpretation: "Bonjour, j'ai besoin d'un interprète pour une réunion professionnelle. Merci de me contacter.",
    annotation: "Bonjour, je cherche une équipe pour annoter des données pour un projet IA. Quels sont vos tarifs ?",
    transcription: "Bonjour, j'ai besoin d'une transcription de fichiers audio. Pouvez-vous me renseigner sur vos services ?",
    localisation: "Bonjour, je souhaite localiser mon application en plusieurs langues africaines. Pouvez-vous m'accompagner ?",
    consultation: "Bonjour, j'aimerais une consultation gratuite pour discuter de mes besoins linguistiques."
  };
  
  window.applyTemplate = function(templateKey, textareaId = '#contactForm textarea, #formationForm textarea, .message-textarea') {
    const textarea = document.querySelector(textareaId);
    if (textarea && messageTemplates[templateKey]) {
      textarea.value = messageTemplates[templateKey];
      textarea.focus();
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      showToast('📝 Template appliqué !', 'success');
    } else if (!textarea) {
      showToast('Champ de texte non trouvé', 'warning');
    } else if (!messageTemplates[templateKey]) {
      showToast('Template non trouvé', 'error');
    }
  };
  
  window.getTemplates = function() {
    return messageTemplates;
  };
  
  window.displayTemplateButtons = function(containerId, textareaId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const templateList = [
      { key: 'devis', label: '💰 Demander un devis' },
      { key: 'traduction', label: '📝 Traduction' },
      { key: 'interpretation', label: '🎤 Interprétation' },
      { key: 'annotation', label: '🤖 Annotation IA' },
      { key: 'formation', label: '📚 Formation' }
    ];
    
    container.innerHTML = `
      <div class="template-buttons">
        <span class="template-label">Modèles rapides :</span>
        ${templateList.map(t => `
          <button type="button" onclick="applyTemplate('${t.key}', '${textareaId}')" class="template-btn">${t.label}</button>
        `).join('')}
      </div>
    `;
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
        <div class="qr-header">
          <h3>📱 Partagez HAM Global Words</h3>
          <button onclick="this.closest('.qr-modal').remove()" class="qr-close">&times;</button>
        </div>
        <div id="qrCode" class="qr-code-container"></div>
        <p class="qr-text">Scannez pour accéder au site</p>
        <p class="qr-url">${escapeHtml(url)}</p>
        <button onclick="this.closest('.qr-modal').remove()" class="qr-close-btn">Fermer</button>
      </div>
    `;
    
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    qrDiv.querySelector('#qrCode').innerHTML = `<img src="${qrUrl}" alt="QR Code" width="200" height="200">`;
    
    document.body.appendChild(qrDiv);
    
    // Fermer en cliquant à l'extérieur
    qrDiv.addEventListener('click', (e) => {
      if (e.target === qrDiv) qrDiv.remove();
    });
  };

  // ========================================
  // THÈMES PERSONNALISÉS (étendus)
  // ========================================
  const themes = {
    dark: { name: "Sombre", bg: "#0B0F14", text: "#E5E7EB", accent: "#6366F1", card: "#1F2937" },
    light: { name: "Clair", bg: "#F9FAFB", text: "#111827", accent: "#6366F1", card: "#FFFFFF" },
    blue: { name: "Bleu nuit", bg: "#0F172A", text: "#E2E8F0", accent: "#3B82F6", card: "#1E293B" },
    purple: { name: "Violet", bg: "#1E1B4B", text: "#E0E7FF", accent: "#8B5CF6", card: "#2E1065" },
    green: { name: "Forêt", bg: "#064E3B", text: "#D1FAE5", accent: "#10B981", card: "#065F46" },
    rose: { name: "Rose", bg: "#4C0519", text: "#FCE7F3", accent: "#EC4899", card: "#9F1239" },
    ocean: { name: "Océan", bg: "#0C4A6E", text: "#E0F2FE", accent: "#0EA5E9", card: "#075985" }
  };

  window.applyTheme = function(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', theme.bg);
    root.style.setProperty('--text-primary', theme.text);
    root.style.setProperty('--accent-primary', theme.accent);
    root.style.setProperty('--card-bg', theme.card);
    
    storage.set('customTheme', themeName);
    showToast(`🎨 Thème ${theme.name} activé`, 'success');
  };
  
  window.getThemeList = function() {
    return themes;
  };
  
  window.displayThemeButtons = function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div class="theme-buttons">
        ${Object.entries(themes).map(([key, theme]) => `
          <button onclick="applyTheme('${key}')" class="theme-btn" style="background: ${theme.accent}; color: ${theme.text}">
            ${theme.name}
          </button>
        `).join('')}
      </div>
    `;
  };

  // ========================================
  // SIMULATION UPLOAD (améliorée)
  // ========================================
  window.simulateFileUpload = function(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('Aucun fichier sélectionné'));
        return;
      }
      
      const progressContainer = document.createElement('div');
      progressContainer.className = 'upload-progress';
      progressContainer.innerHTML = `
        <div class="upload-progress-bar">
          <div class="upload-progress-fill" style="width: 0%"></div>
        </div>
        <div class="upload-progress-text">Upload 0%</div>
      `;
      document.body.appendChild(progressContainer);
      
      let width = 0;
      const interval = setInterval(() => {
        width += Math.random() * 15 + 5;
        if (width >= 100) width = 100;
        
        const fill = progressContainer.querySelector('.upload-progress-fill');
        const text = progressContainer.querySelector('.upload-progress-text');
        if (fill) fill.style.width = width + '%';
        if (text) text.textContent = `Upload ${Math.round(width)}%`;
        
        if (width >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            progressContainer.remove();
            showToast(`✅ ${file.name} téléchargé avec succès`, 'success');
            resolve(file);
          }, 300);
        }
      }, 50);
    });
  };

  // ========================================
  // UTILITAIRES
  // ========================================
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  
  function getStatusText(status) {
    const statusMap = {
      'envoyé': 'Envoyé',
      'sent': 'Envoyé',
      'pending': 'En attente',
      'en_attente': 'En attente',
      'completed': 'Complété',
      'cancelled': 'Annulé'
    };
    return statusMap[status] || status || 'Envoyé';
  }
  
  // ========================================
  // SAUVEGARDE AUTOMATIQUE (optionnelle)
  // ========================================
  let autoSaveInterval = null;
  
  window.enableAutoSave = function(intervalMinutes = 5) {
    if (autoSaveInterval) clearInterval(autoSaveInterval);
    
    autoSaveInterval = setInterval(() => {
      exportUserData('json');
      console.log('✅ Sauvegarde automatique effectuée');
    }, intervalMinutes * 60 * 1000);
    
    showToast(`Sauvegarde auto activée (toutes les ${intervalMinutes} min)`, 'info');
  };
  
  window.disableAutoSave = function() {
    if (autoSaveInterval) {
      clearInterval(autoSaveInterval);
      autoSaveInterval = null;
      showToast('Sauvegarde auto désactivée', 'info');
    }
  };

  // ========================================
  // INITIALISATION
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    // Restaurer le mode focus
    const focusMode = storage.get('focusMode', 'false');
    if (focusMode === 'true') document.body.classList.add('focus-mode');
    
    // Restaurer le thème personnalisé
    const customTheme = storage.get('customTheme');
    if (customTheme && customTheme !== 'dark' && customTheme !== 'light') {
      applyTheme(customTheme);
    }
    
    // Mettre à jour les badges
    updateNotificationBadge();
    checkAndAwardBadges();
    
    // Vérifier les rappels
    checkReminders();
    setInterval(checkReminders, 60000);
    
    // Badge mode démo
    const demoMode = storage.get('demoMode', 'false');
    if (demoMode === 'true' && !document.querySelector('.demo-badge')) {
      const badge = document.createElement('div');
      badge.className = 'demo-badge';
      badge.innerHTML = '🎬 MODE DÉMO';
      badge.setAttribute('title', 'Cliquez pour quitter');
      badge.addEventListener('click', () => exitDemoMode());
      document.body.appendChild(badge);
    }
    
    // Détection des connexions matinales/nocturnes pour badges
    const hour = new Date().getHours();
    const earnedBadges = storage.getJSON('earnedBadges', []);
    
    if (hour < 8 && !earnedBadges.includes('earlyBird')) {
      storage.setJSON('earnedBadges', [...earnedBadges, 'earlyBird']);
      showToast('🏆 Badge débloqué : Matinal !', 'success');
    }
    
    if (hour >= 23 && !earnedBadges.includes('nightOwl')) {
      storage.setJSON('earnedBadges', [...earnedBadges, 'nightOwl']);
      showToast('🏆 Badge débloqué : Noctambule !', 'success');
    }
    
    console.log('HAM Global Words - Améliorations chargées ✅');
  });

})();
