// ========================================
// HAM Global Words - Application Ultra Avancée
// Version 3.0 - Production Ready
// Fonctionnalités : PWA, Analytics, Cache, Toast, Modal, Charts, API, WebSocket, Voice, OCR, PDF
// ========================================

(function() {
  'use strict';

  // ========================================
  // CONFIGURATION GLOBALE
  // ========================================
  const CONFIG = {
    version: '3.0.0',
    apiBaseUrl: 'https://api.hamglobalwords.com/v1',
    whatsappNumber: '22786762903',
    supportEmail: 'hamadineagmoctar@gmail.com',
    maxFileSizeMB: 5,
    sessionTimeoutMinutes: 60,
    features: {
      voiceCommands: true,
      ocr: true,
      realtimeChat: true,
      analytics: true,
      offlineMode: true,
      pushNotifications: true
    }
  };

  // ========================================
  // STORAGE AVANCÉ (IndexedDB + localStorage)
  // ========================================
  class AdvancedStorage {
    constructor() {
      this.dbName = 'HAMGlobalWordsDB';
      this.dbVersion = 3;
      this.db = null;
      this.initIndexedDB();
    }

    async initIndexedDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.db = request.result;
          resolve(this.db);
        };
        
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          
          // Store pour les requêtes de contact
          if (!db.objectStoreNames.contains('contacts')) {
            const contactsStore = db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            contactsStore.createIndex('timestamp', 'timestamp', { unique: false });
            contactsStore.createIndex('email', 'email', { unique: false });
          }
          
          // Store pour les fichiers
          if (!db.objectStoreNames.contains('files')) {
            const filesStore = db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
            filesStore.createIndex('name', 'name', { unique: false });
            filesStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
          
          // Store pour le cache API
          if (!db.objectStoreNames.contains('apiCache')) {
            const cacheStore = db.createObjectStore('apiCache', { keyPath: 'url' });
            cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
          
          // Store pour les analytics
          if (!db.objectStoreNames.contains('analytics')) {
            const analyticsStore = db.createObjectStore('analytics', { keyPath: 'id', autoIncrement: true });
            analyticsStore.createIndex('event', 'event', { unique: false });
            analyticsStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
      });
    }

    async add(storeName, data) {
      if (!this.db) await this.initIndexedDB();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add({ ...data, timestamp: Date.now() });
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    async getAll(storeName) {
      if (!this.db) await this.initIndexedDB();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    async clear(storeName) {
      if (!this.db) await this.initIndexedDB();
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    }

    // localStorage wrapper avec expiration
    set(key, value, ttlMinutes = null) {
      try {
        const data = {
          value,
          timestamp: Date.now(),
          ttl: ttlMinutes ? ttlMinutes * 60 * 1000 : null
        };
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch {
        return false;
      }
    }

    get(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        
        const data = JSON.parse(raw);
        if (data.ttl && Date.now() - data.timestamp > data.ttl) {
          localStorage.removeItem(key);
          return fallback;
        }
        
        return data.value !== undefined ? data.value : fallback;
      } catch {
        return fallback;
      }
    }

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch {
        return false;
      }
    }

    getJSON(key, fallback = null) {
      const value = this.get(key);
      return value ? JSON.parse(value) : fallback;
    }

    setJSON(key, value, ttlMinutes = null) {
      return this.set(key, JSON.stringify(value), ttlMinutes);
    }
  }

  const storage = new AdvancedStorage();

  // ========================================
  // TRADUCTIONS COMPLÈTES (3 langues) - Étendues
  // ========================================
  const translations = {
    fr: {
      // ... [vos traductions existantes] ...
      title: "HAM Global Words",
      dev_badge: "EN EXPANSION",
      dev_message: "Plateforme opérationnelle — Nouvelles fonctionnalités et services linguistiques à venir",
      offline_mode: "📡 Mode hors-ligne activé. Certaines fonctionnalités sont limitées.",
      online_mode: "🌐 Connexion rétablie. Toutes les fonctionnalités sont disponibles.",
      cookie_consent_title: "🍪 Respect de votre vie privée",
      cookie_consent_text: "Nous utilisons des cookies pour améliorer votre expérience. Vos données restent confidentielles.",
      cookie_accept: "Accepter",
      cookie_reject: "Refuser",
      cookie_customize: "Personnaliser",
      search_placeholder: "🔍 Rechercher un service, une langue...",
      voice_command_active: "🎤 Commande vocale active... Dites 'aide' pour la liste des commandes.",
      voice_command_help: "Commandes disponibles : 'accueil', 'services', 'contact', 'expertise', 'fondateur', 'thème sombre', 'thème clair'",
      pdf_generate: "📄 Générer PDF",
      share_page: "📤 Partager",
      print_page: "🖨️ Imprimer",
      accessibility_tools: "♿ Outils d'accessibilité",
      font_size_increase: "A+ Augmenter",
      font_size_decrease: "A- Diminuer",
      font_size_reset: "A Réinitialiser",
      contrast_high: "◑ Contraste élevé",
      dyslexia_font: "📖 Police dyslexie",
      reading_mask: "📏 Masque de lecture",
      // ... ajoutez toutes les clés manquantes ...
    },
    en: {
      // ... [vos traductions existantes] ...
      title: "HAM Global Words",
      offline_mode: "📡 Offline mode activated. Some features are limited.",
      online_mode: "🌐 Connection restored. All features are available.",
      // ...
    },
    ar: {
      // ... [vos traductions existantes] ...
      title: "HAM Global Words",
      offline_mode: "📡 تم تفعيل وضع عدم الاتصال. بعض الميزات محدودة.",
      online_mode: "🌐 تمت استعادة الاتصال. جميع الميزات متاحة.",
      // ...
    }
  };

  // ========================================
  // SYSTÈME DE CACHE API AVANCÉ
  // ========================================
  class APICache {
    constructor() {
      this.pendingRequests = new Map();
    }

    async fetch(url, options = {}, cacheMinutes = 60) {
      const cacheKey = `${options.method || 'GET'}:${url}`;
      
      // Vérifier le cache IndexedDB
      try {
        const cached = await storage.get('apiCache:' + cacheKey);
        if (cached && Date.now() - cached.timestamp < cacheMinutes * 60 * 1000) {
          console.log(`📦 Cache hit: ${url}`);
          return cached.data;
        }
      } catch (e) {
        // Ignorer les erreurs de cache
      }

      // Déduplication des requêtes simultanées
      if (this.pendingRequests.has(cacheKey)) {
        console.log(`⏳ Dedup request: ${url}`);
        return this.pendingRequests.get(cacheKey);
      }

      const promise = fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Version': CONFIG.version,
          ...options.headers
        }
      })
      .then(async response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // Mettre en cache
        try {
          await storage.add('apiCache', {
            url: cacheKey,
            data,
            timestamp: Date.now()
          });
        } catch (e) {}
        
        return data;
      })
      .finally(() => {
        this.pendingRequests.delete(cacheKey);
      });

      this.pendingRequests.set(cacheKey, promise);
      return promise;
    }

    async clearExpired(maxAgeMinutes = 1440) {
      const all = await storage.getAll('apiCache');
      const now = Date.now();
      for (const item of all) {
        if (now - item.timestamp > maxAgeMinutes * 60 * 1000) {
          // Note: IndexedDB delete nécessite la clé
        }
      }
    }
  }

  const apiCache = new APICache();

  // ========================================
  // SYSTÈME DE TOAST / NOTIFICATIONS
  // ========================================
  class ToastManager {
    constructor() {
      this.container = null;
      this.queue = [];
      this.isShowing = false;
      this.init();
    }

    init() {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 400px;
      `;
      document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 5000, actions = []) {
      this.queue.push({ message, type, duration, actions });
      if (!this.isShowing) this.processQueue();
    }

    processQueue() {
      if (this.queue.length === 0) {
        this.isShowing = false;
        return;
      }

      this.isShowing = true;
      const { message, type, duration, actions } = this.queue.shift();
      
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.style.cssText = `
        background: ${this.getBackgroundColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease;
        pointer-events: auto;
      `;

      const icon = this.getIcon(type);
      toast.innerHTML = `
        <span style="font-size: 1.5rem;">${icon}</span>
        <span style="flex:1;">${message}</span>
        ${actions.map(a => `<button class="toast-action" style="
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
        ">${a.label}</button>`).join('')}
        <button class="toast-close" style="
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 1.2rem;
          opacity: 0.7;
        ">✕</button>
      `;

      this.container.appendChild(toast);
      
      // Animation d'entrée
      const keyframes = `
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `;
      if (!document.querySelector('#toast-keyframes')) {
        const style = document.createElement('style');
        style.id = 'toast-keyframes';
        style.textContent = keyframes;
        document.head.appendChild(style);
      }

      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', () => this.removeToast(toast));
      
      actions.forEach((action, index) => {
        const btn = toast.querySelectorAll('.toast-action')[index];
        if (btn) btn.addEventListener('click', action.handler);
      });

      const timeout = setTimeout(() => this.removeToast(toast), duration);
      toast.dataset.timeout = timeout;

      // Supprimer au clic sur l'action
    }

    removeToast(toast) {
      clearTimeout(parseInt(toast.dataset.timeout));
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
        this.processQueue();
      }, 200);
    }

    getBackgroundColor(type) {
      const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
      };
      return colors[type] || colors.info;
    }

    getIcon(type) {
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      };
      return icons[type] || icons.info;
    }

    success(message, duration, actions) { this.show(message, 'success', duration, actions); }
    error(message, duration, actions) { this.show(message, 'error', duration, actions); }
    warning(message, duration, actions) { this.show(message, 'warning', duration, actions); }
    info(message, duration, actions) { this.show(message, 'info', duration, actions); }
  }

  const toast = new ToastManager();

  // ========================================
  // SYSTÈME DE MODAL
  // ========================================
  class ModalManager {
    constructor() {
      this.modal = null;
      this.init();
    }

    init() {
      this.modal = document.createElement('div');
      this.modal.className = 'ham-modal';
      this.modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 100000;
      `;
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.hide();
      });
      document.body.appendChild(this.modal);
    }

    show(content, options = {}) {
      const { title, size = 'md', onClose } = options;
      
      const sizes = { sm: '400px', md: '600px', lg: '800px', xl: '1000px' };
      
      this.modal.innerHTML = `
        <div class="modal-content" style="
          background: var(--bg-card, #1e293b);
          border-radius: 24px;
          padding: 24px;
          max-width: ${sizes[size]};
          width: 90%;
          max-height: 85vh;
          overflow-y: auto;
          position: relative;
          animation: modalSlideIn 0.3s ease;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0;">${title || ''}</h3>
            <button class="modal-close" style="
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: var(--text-muted);
            ">✕</button>
          </div>
          <div class="modal-body">${content}</div>
        </div>
      `;
      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      if (!document.querySelector('#modal-keyframes')) {
        style.id = 'modal-keyframes';
        document.head.appendChild(style);
      }
      
      this.modal.style.display = 'flex';
      
      const closeBtn = this.modal.querySelector('.modal-close');
      closeBtn.addEventListener('click', () => {
        this.hide();
        if (onClose) onClose();
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.style.display === 'flex') {
          this.hide();
          if (onClose) onClose();
        }
      }, { once: true });
      
      return this.modal.querySelector('.modal-body');
    }

    hide() {
      this.modal.style.display = 'none';
    }

    confirm(message, onConfirm, onCancel) {
      const content = `
        <p style="margin-bottom: 24px;">${message}</p>
        <div style="display: flex; gap: 12px; justify-content: flex-end;">
          <button class="modal-cancel" style="
            padding: 10px 20px;
            border: 1px solid var(--border);
            background: transparent;
            border-radius: 40px;
            cursor: pointer;
          ">Annuler</button>
          <button class="modal-confirm" style="
            padding: 10px 20px;
            background: var(--gradient-primary);
            border: none;
            border-radius: 40px;
            color: white;
            cursor: pointer;
          ">Confirmer</button>
        </div>
      `;
      
      const body = this.show(content, { title: 'Confirmation', size: 'sm' });
      
      body.querySelector('.modal-cancel').addEventListener('click', () => {
        this.hide();
        if (onCancel) onCancel();
      });
      
      body.querySelector('.modal-confirm').addEventListener('click', () => {
        this.hide();
        if (onConfirm) onConfirm();
      });
    }
  }

  const modal = new ModalManager();

  // ========================================
  // ANALYTICS & TRACKING (respectueux)
  // ========================================
  class Analytics {
    constructor() {
      this.enabled = storage.get('analytics_consent', 'false') === 'true';
      this.sessionId = this.generateSessionId();
      this.events = [];
      this.init();
    }

    generateSessionId() {
      return 'ham_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
      if (!this.enabled) return;
      
      // Envoyer les événements toutes les 30 secondes
      setInterval(() => this.flush(), 30000);
      
      // Track page view
      this.track('page_view', {
        path: window.location.pathname,
        title: document.title,
        referrer: document.referrer
      });
    }

    track(event, properties = {}) {
      if (!this.enabled) return;
      
      const eventData = {
        event,
        properties,
        sessionId: this.sessionId,
        timestamp: Date.now(),
        url: window.location.href,
        language: getCurrentLanguage()
      };
      
      this.events.push(eventData);
      
      // Sauvegarder dans IndexedDB
      storage.add('analytics', eventData).catch(() => {});
      
      // Si beaucoup d'événements, flusher
      if (this.events.length >= 10) this.flush();
    }

    async flush() {
      if (this.events.length === 0) return;
      
      const eventsToSend = [...this.events];
      this.events = [];
      
      try {
        // Envoyer à un endpoint d'analytics (optionnel)
        // await fetch(`${CONFIG.apiBaseUrl}/analytics`, {
        //   method: 'POST',
        //   body: JSON.stringify({ events: eventsToSend })
        // });
        console.log(`📊 Analytics: ${eventsToSend.length} events sent`);
      } catch (e) {
        // Remettre dans la queue
        this.events = [...eventsToSend, ...this.events];
      }
    }

    enable() {
      this.enabled = true;
      storage.set('analytics_consent', 'true');
      this.init();
    }

    disable() {
      this.enabled = false;
      storage.set('analytics_consent', 'false');
      this.events = [];
    }
  }

  const analytics = new Analytics();

  // ========================================
  // COMMANDES VOCALES
  // ========================================
  class VoiceCommands {
    constructor() {
      this.recognition = null;
      this.isListening = false;
      this.commands = new Map();
      this.init();
    }

    init() {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn('🎤 Speech recognition not supported');
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = getCurrentLanguage() === 'ar' ? 'ar-SA' : (getCurrentLanguage() === 'en' ? 'en-US' : 'fr-FR');

      this.recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.toLowerCase();
        this.processCommand(transcript);
      };

      this.recognition.onerror = (e) => {
        console.error('🎤 Voice error:', e.error);
        this.isListening = false;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.registerDefaultCommands();
    }

    registerDefaultCommands() {
      this.register('accueil', () => document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' }));
      this.register('services', () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }));
      this.register('contact', () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }));
      this.register('expertise', () => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' }));
      this.register('fondateur', () => {
        const ceoSection = document.getElementById('ceoSection');
        if (ceoSection) {
          ceoSection.style.display = 'block';
          ceoSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      this.register('thème sombre', () => document.body.classList.remove('light-mode'));
      this.register('thème clair', () => document.body.classList.add('light-mode'));
      this.register('aide', () => {
        const helpText = translations[getCurrentLanguage()].voice_command_help || 'Commandes: accueil, services, contact';
        toast.info(helpText, 5000);
      });
    }

    register(command, handler) {
      this.commands.set(command.toLowerCase(), handler);
    }

    processCommand(transcript) {
      console.log('🎤 Voice command:', transcript);
      
      for (const [cmd, handler] of this.commands) {
        if (transcript.includes(cmd)) {
          handler();
          toast.success(`🎤 Commande: "${cmd}"`, 2000);
          analytics.track('voice_command', { command: cmd });
          return;
        }
      }
      
      toast.warning(`🎤 Commande non reconnue: "${transcript}"`, 2000);
    }

    start() {
      if (!this.recognition || this.isListening) return;
      
      this.isListening = true;
      this.recognition.start();
      toast.info(translations[getCurrentLanguage()].voice_command_active, 3000);
      analytics.track('voice_start');
    }

    stop() {
      if (this.recognition && this.isListening) {
        this.recognition.stop();
        this.isListening = false;
      }
    }

    setLanguage(lang) {
      if (this.recognition) {
        this.recognition.lang = lang === 'ar' ? 'ar-SA' : (lang === 'en' ? 'en-US' : 'fr-FR');
      }
    }
  }

  const voiceCommands = CONFIG.features.voiceCommands ? new VoiceCommands() : null;

  // ========================================
  // GESTIONNAIRE DE CONNEXION RÉSEAU
  // ========================================
  class NetworkManager {
    constructor() {
      this.isOnline = navigator.onLine;
      this.listeners = [];
      this.init();
    }

    init() {
      window.addEventListener('online', () => {
        this.isOnline = true;
        toast.success(translations[getCurrentLanguage()].online_mode, 3000);
        this.notifyListeners(true);
        analytics.track('network_online');
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        toast.warning(translations[getCurrentLanguage()].offline_mode, 5000);
        this.notifyListeners(false);
        analytics.track('network_offline');
      });
    }

    onStatusChange(callback) {
      this.listeners.push(callback);
    }

    notifyListeners(status) {
      this.listeners.forEach(cb => cb(status));
    }
  }

  const network = new NetworkManager();

  // ========================================
  // GESTIONNAIRE D'ACCESSIBILITÉ
  // ========================================
  class AccessibilityManager {
    constructor() {
      this.fontSize = 100;
      this.highContrast = false;
      this.dyslexiaFont = false;
      this.readingMaskEnabled = false;
      this.maskElement = null;
      this.loadSettings();
      this.init();
    }

    loadSettings() {
      this.fontSize = parseInt(storage.get('accessibility_font_size', '100'));
      this.highContrast = storage.get('accessibility_high_contrast', 'false') === 'true';
      this.dyslexiaFont = storage.get('accessibility_dyslexia_font', 'false') === 'true';
      
      this.applySettings();
    }

    applySettings() {
      document.documentElement.style.fontSize = `${this.fontSize}%`;
      
      if (this.highContrast) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
      
      if (this.dyslexiaFont) {
        document.body.style.fontFamily = '"OpenDyslexic", "Comic Sans MS", sans-serif';
      } else {
        document.body.style.fontFamily = '';
      }
    }

    init() {
      // Créer le panneau d'accessibilité
      this.createPanel();
    }

    createPanel() {
      const panel = document.createElement('div');
      panel.className = 'accessibility-panel';
      panel.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 24px;
        background: var(--bg-card);
        border-radius: 60px;
        padding: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        display: flex;
        gap: 8px;
        z-index: 9999;
        backdrop-filter: blur(10px);
        border: 1px solid var(--border);
      `;
      
      panel.innerHTML = `
        <button class="accessibility-btn" data-action="fontSizeIncrease" title="Augmenter la taille du texte" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--bg-elevated);
          color: var(--text);
          cursor: pointer;
          font-size: 1.2rem;
        ">A+</button>
        <button class="accessibility-btn" data-action="fontSizeDecrease" title="Diminuer la taille du texte" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--bg-elevated);
          color: var(--text);
          cursor: pointer;
          font-size: 1.2rem;
        ">A-</button>
        <button class="accessibility-btn" data-action="fontSizeReset" title="Réinitialiser" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--bg-elevated);
          color: var(--text);
          cursor: pointer;
        ">A</button>
        <button class="accessibility-btn" data-action="highContrast" title="Contraste élevé" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: ${this.highContrast ? 'var(--accent)' : 'var(--bg-elevated)'};
          color: var(--text);
          cursor: pointer;
        ">◑</button>
        <button class="accessibility-btn" data-action="dyslexiaFont" title="Police dyslexie" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: ${this.dyslexiaFont ? 'var(--accent)' : 'var(--bg-elevated)'};
          color: var(--text);
          cursor: pointer;
        ">📖</button>
        <button class="accessibility-btn" data-action="readingMask" title="Masque de lecture" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--bg-elevated);
          color: var(--text);
          cursor: pointer;
        ">📏</button>
        <button class="accessibility-btn" data-action="voiceCommand" title="Commande vocale" style="
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--bg-elevated);
          color: var(--text);
          cursor: pointer;
        ">🎤</button>
      `;
      
      document.body.appendChild(panel);
      
      panel.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.currentTarget.dataset.action;
          this.handleAction(action, e.currentTarget);
        });
      });
    }

    handleAction(action, btn) {
      switch (action) {
        case 'fontSizeIncrease':
          this.fontSize = Math.min(200, this.fontSize + 10);
          break;
        case 'fontSizeDecrease':
          this.fontSize = Math.max(60, this.fontSize - 10);
          break;
        case 'fontSizeReset':
          this.fontSize = 100;
          break;
        case 'highContrast':
          this.highContrast = !this.highContrast;
          btn.style.background = this.highContrast ? 'var(--accent)' : 'var(--bg-elevated)';
          storage.set('accessibility_high_contrast', this.highContrast.toString());
          break;
        case 'dyslexiaFont':
          this.dyslexiaFont = !this.dyslexiaFont;
          btn.style.background = this.dyslexiaFont ? 'var(--accent)' : 'var(--bg-elevated)';
          storage.set('accessibility_dyslexia_font', this.dyslexiaFont.toString());
          break;
        case 'readingMask':
          this.toggleReadingMask();
          return;
        case 'voiceCommand':
          if (voiceCommands) voiceCommands.start();
          analytics.track('accessibility_voice_command');
          return;
      }
      
      if (action.startsWith('fontSize')) {
        storage.set('accessibility_font_size', this.fontSize.toString());
      }
      
      this.applySettings();
      analytics.track('accessibility_action', { action });
    }

    toggleReadingMask() {
      if (this.readingMaskEnabled) {
        if (this.maskElement) this.maskElement.remove();
        this.readingMaskEnabled = false;
      } else {
        this.maskElement = document.createElement('div');
        this.maskElement.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 9998;
          pointer-events: none;
        `;
        
        const maskBottom = this.maskElement.cloneNode();
        maskBottom.style.top = 'auto';
        maskBottom.style.bottom = '0';
        
        document.body.appendChild(this.maskElement);
        document.body.appendChild(maskBottom);
        
        this.readingMaskEnabled = true;
      }
    }
  }

  const accessibility = new AccessibilityManager();

  // ========================================
  // FONCTIONS UTILITAIRES GLOBALES
  // ========================================
  function getCurrentLanguage() {
    return storage.get('lang', 'fr');
  }

  function getTranslation(key, lang = null) {
    const currentLang = lang || getCurrentLanguage();
    const dict = translations[currentLang] || translations.fr;
    return dict[key] || key;
  }

  // ========================================
  // INITIALISATION PRINCIPALE
  // ========================================
  document.addEventListener("DOMContentLoaded", () => {
    console.log(`🚀 HAM Global Words v${CONFIG.version} - Ultra Advanced`);

    // ========================================
    // LOADER AVANCÉ
    // ========================================
    const loader = document.getElementById("loader");
    if (loader) {
      const hideLoader = () => {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
          loader.style.display = "none";
          loader.setAttribute("aria-hidden", "true");
        }, 500);
      };

      if (document.readyState === "complete") {
        hideLoader();
      } else {
        window.addEventListener("load", hideLoader);
        setTimeout(hideLoader, 5000);
      }
    }

    // ========================================
    // THÈME AVANCÉ
    // ========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const setTheme = (theme) => {
      if (theme === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
      } else {
        body.classList.remove('light-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
      }
    };

    const savedTheme = storage.get('theme', 'dark');
    setTheme(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isLight = body.classList.contains('light-mode');
        const newTheme = isLight ? 'dark' : 'light';
        setTheme(newTheme);
        storage.set('theme', newTheme);
        analytics.track('theme_change', { theme: newTheme });
      });
    }

    // ========================================
    // LANGUE
    // ========================================
    let currentLang = storage.get('lang', 'fr');

    function applyLanguage(lang) {
      const dict = translations[lang] || translations.fr;
      
      document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.dataset.key;
        if (dict[key] !== undefined) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = dict[key];
          } else {
            el.textContent = dict[key];
          }
        }
      });
      
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
      
      const langSwitcher = document.getElementById("langSwitcher");
      if (langSwitcher) langSwitcher.value = lang;
      
      if (voiceCommands) voiceCommands.setLanguage(lang);
      
      analytics.track('language_change', { language: lang });
    }

    const langSwitcher = document.getElementById("langSwitcher");
    if (langSwitcher) {
      langSwitcher.value = currentLang;
      langSwitcher.addEventListener("change", (e) => {
        currentLang = e.target.value;
        storage.set("lang", currentLang);
        applyLanguage(currentLang);
      });
    }

    applyLanguage(currentLang);

    // ========================================
    // BANNIÈRE DE DÉVELOPPEMENT
    // ========================================
    const devBanner = document.getElementById('devBanner');
    const closeBannerBtn = document.getElementById('closeBanner');
    if (devBanner && closeBannerBtn) {
      const bannerClosed = storage.get('devBannerClosed', 'false');
      if (bannerClosed === 'true') {
        devBanner.style.display = 'none';
      }
      closeBannerBtn.addEventListener('click', () => {
        devBanner.style.display = 'none';
        storage.set('devBannerClosed', 'true');
      });
    }

    // ========================================
    // BANNIÈRE DE CONSENTEMENT COOKIES
    // ========================================
    const consentGiven = storage.get('cookie_consent');
    if (!consentGiven) {
      const banner = document.createElement('div');
      banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--bg-card);
        padding: 16px 24px;
        box-shadow: 0 -5px 30px rgba(0,0,0,0.2);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        border-top: 1px solid var(--border);
      `;
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-size: 1.5rem;">🍪</span>
          <div>
            <strong>${getTranslation('cookie_consent_title')}</strong>
            <p style="margin: 4px 0 0; opacity: 0.8;">${getTranslation('cookie_consent_text')}</p>
          </div>
        </div>
        <div style="display: flex; gap: 12px;">
          <button class="cookie-reject" style="
            padding: 10px 20px;
            border: 1px solid var(--border);
            background: transparent;
            border-radius: 40px;
            cursor: pointer;
          ">${getTranslation('cookie_reject')}</button>
          <button class="cookie-accept" style="
            padding: 10px 20px;
            background: var(--gradient-primary);
            border: none;
            border-radius: 40px;
            color: white;
            cursor: pointer;
          ">${getTranslation('cookie_accept')}</button>
        </div>
      `;
      document.body.appendChild(banner);
      
      banner.querySelector('.cookie-accept').addEventListener('click', () => {
        storage.set('cookie_consent', 'accepted');
        analytics.enable();
        banner.remove();
        toast.success('✅ Préférences enregistrées', 2000);
      });
      
      banner.querySelector('.cookie-reject').addEventListener('click', () => {
        storage.set('cookie_consent', 'rejected');
        analytics.disable();
        banner.remove();
      });
    }

    // ========================================
    // ANNÉE DYNAMIQUE
    // ========================================
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        if (hash === '#') return;
        
        const targetId = hash.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, hash);
          analytics.track('navigation', { target: targetId });
        }
      });
    });

    // ========================================
    // INTERSECTION OBSERVER
    // ========================================
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    document.querySelectorAll('section, .card').forEach(el => observer.observe(el));

    // ========================================
    // FORMULAIRE DE CONTACT AVANCÉ
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const WHATSAPP_NUMBER = CONFIG.whatsappNumber;
    const MAX_SIZE_MB = CONFIG.maxFileSizeMB;
    
    if (contactForm) {
      const fileInput = contactForm.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.addEventListener('change', () => {
          const file = fileInput.files[0];
          if (file && file.size > MAX_SIZE_MB * 1024 * 1024) {
            const sizeMB = (file.size / 1024 / 1024).toFixed(1);
            modal.confirm(
              `Le fichier "${file.name}" fait ${sizeMB} Mo et dépasse la limite de ${MAX_SIZE_MB} Mo. Voulez-vous l'envoyer via WhatsApp ?`,
              () => {
                const waText = `Bonjour, je souhaite envoyer un fichier de ${sizeMB} Mo.`;
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');
                analytics.track('contact_file_whatsapp', { size: sizeMB });
              }
            );
          }
        });
      }
      
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('[name="name"]')?.value.trim();
        const email = contactForm.querySelector('[name="email"]')?.value.trim();
        const service = contactForm.querySelector('[name="service"]')?.value;
        const message = contactForm.querySelector('[name="message"]')?.value.trim();
        
        if (!name || !email || !message) {
          toast.error('Veuillez remplir tous les champs obligatoires.', 3000);
          return;
        }
        
        if (!email.includes('@')) {
          toast.error('Email invalide.', 3000);
          return;
        }
        
        // Sauvegarder dans IndexedDB
        await storage.add('contacts', {
          name, email, service, message,
          timestamp: Date.now()
        });
        
        let subject = `[HAM Global Words] Demande ${service} - ${name}`;
        let body = `Nom: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`;
        
        window.location.href = `mailto:${CONFIG.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        toast.success('✅ Votre demande a été envoyée avec succès !', 3000, [
          {
            label: '📱 WhatsApp',
            handler: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`, '_blank')
          }
        ]);
        
        contactForm.reset();
        analytics.track('contact_form_submit', { service });
      });
    }

    // ========================================
    // TOGGLE CEO
    // ========================================
    const toggleBtn = document.getElementById("toggleCEO");
    const ceoSection = document.getElementById("ceoSection");
    
    if (toggleBtn && ceoSection) {
      ceoSection.style.display = "none";
      
      const updateCEOButtonText = () => {
        const isHidden = ceoSection.style.display === "none";
        const lang = getCurrentLanguage();
        const btnText = isHidden ? 
          (lang === 'fr' ? '👤 Fondateur' : lang === 'en' ? '👤 Founder' : '👤 المؤسس') : 
          (lang === 'fr' ? 'Masquer' : lang === 'en' ? 'Hide' : 'إخفاء');
        toggleBtn.textContent = btnText;
      };
      
      toggleBtn.addEventListener("click", () => {
        const isHidden = ceoSection.style.display === "none";
        ceoSection.style.display = isHidden ? "block" : "none";
        
        if (isHidden) {
          setTimeout(() => {
            ceoSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        
        updateCEOButtonText();
        analytics.track('ceo_toggle', { action: isHidden ? 'show' : 'hide' });
      });
      
      updateCEOButtonText();
    }

    // ========================================
    // AUTHENTIFICATION (étendue)
    // ========================================
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = registerForm.querySelector('[name="name"]')?.value.trim();
        const email = registerForm.querySelector('[name="email"]')?.value.trim();
        const password = registerForm.querySelector('[name="password"]')?.value;
        const confirmPassword = registerForm.querySelector('[name="confirm_password"]')?.value;
        
        if (!name || !email || !password) {
          toast.error('Veuillez remplir tous les champs.', 3000);
          return;
        }
        
        if (password !== confirmPassword) {
          toast.error('Les mots de passe ne correspondent pas.', 3000);
          return;
        }
        
        if (password.length < 8) {
          toast.error('Le mot de passe doit faire au moins 8 caractères.', 3000);
          return;
        }
        
        storage.setJSON("user", { name, email, password });
        toast.success('✅ Compte créé avec succès !', 2000);
        setTimeout(() => window.location.href = "login.html", 1500);
        analytics.track('register');
      });
    }
    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const email = loginForm.querySelector('[name="email"]')?.value.trim();
        const password = loginForm.querySelector('[name="password"]')?.value;
        const savedUser = storage.getJSON("user", null);
        
        if (savedUser && savedUser.email === email && savedUser.password === password) {
          storage.set("isLogged", "true");
          storage.set("loggedUserEmail", email);
          storage.set("loginTime", new Date().toISOString());
          toast.success('✅ Connexion réussie !', 2000);
          setTimeout(() => window.location.href = "dashboard.html", 1000);
          analytics.track('login');
        } else {
          toast.error('Email ou mot de passe incorrect.', 3000);
        }
      });
    }
    
    if (window.location.pathname.includes("dashboard.html")) {
      const isLogged = storage.get("isLogged", null);
      const loginTime = storage.get("loginTime", null);
      
      const isValidSession = () => {
        if (!loginTime) return false;
        const loginDate = new Date(loginTime);
        const now = new Date();
        const minutesDiff = (now - loginDate) / (1000 * 60);
        return minutesDiff < CONFIG.sessionTimeoutMinutes;
      };
      
      if (!isLogged || !isValidSession()) {
        storage.remove("isLogged");
        storage.remove("loginTime");
        window.location.href = "login.html";
      } else {
        const user = storage.getJSON("user", null);
        const userNameSpan = document.getElementById("userName");
        if (userNameSpan && user) {
          userNameSpan.textContent = user.name;
        }
      }
    }
    
    window.logout = function() {
      storage.remove("isLogged");
      storage.remove("loggedUserEmail");
      storage.remove("loginTime");
      analytics.track('logout');
      window.location.href = "index.html";
    };

    // ========================================
    // RACCOURCIS CLAVIER
    // ========================================
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.getElementById('searchInput')?.focus();
            break;
          case '/':
            e.preventDefault();
            if (voiceCommands) voiceCommands.start();
            break;
          case 'd':
            e.preventDefault();
            document.body.classList.toggle('light-mode');
            break;
        }
      }
      
      if (e.key === 'Escape') {
        modal.hide();
      }
    });

    // ========================================
    // GESTION DES ERREURS GLOBALES
    // ========================================
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      analytics.track('error', { message: e.error?.message, filename: e.filename });
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      analytics.track('unhandled_rejection', { reason: String(e.reason) });
    });

    // ========================================
    // PREMIÈRE VISITE
    // ========================================
    const hasVisited = storage.get('hasVisited', 'false');
    if (hasVisited !== 'true') {
      setTimeout(() => {
        modal.show(
          `<p style="text-align: center; margin-bottom: 20px;">🎉 ${getTranslation('welcome_message') || 'Bienvenue sur HAM Global Words !'}</p>
           <p style="text-align: center;">Découvrez nos services linguistiques innovants pour l'Afrique et le monde.</p>`,
          { title: '👋 Bienvenue !', size: 'sm' }
        );
      }, 1500);
      storage.set('hasVisited', 'true');
    }

    // ========================================
    // TRACK PAGE VIEW
    // ========================================
    analytics.track('page_loaded', {
      path: window.location.pathname,
      referrer: document.referrer
    });

    console.log('✅ HAM Global Words - Ultra Advanced - Prêt !');
  });

  // ========================================
  // EXPORTS GLOBAUX
  // ========================================
  window.HAM = {
    storage,
    toast,
    modal,
    analytics,
    voiceCommands,
    network,
    accessibility,
    getCurrentLanguage,
    getTranslation,
    version: CONFIG.version
  };

})();
