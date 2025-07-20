// ===================================
//              RENDERER
// Bienvenue sur le script de
// renderer du logiciel.
// Le script est encore en test,
// une pull request est la bienvenue !
// :D
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Gestion des notifications
    const notificationBadge = document.querySelector('.notification-badge');
    const notifications = document.querySelector('.notifications');
    
    notifications.addEventListener('click', function() {
        notificationBadge.textContent = '0';
        notificationBadge.style.display = 'none';
        alert('Notifications marquées comme lues');
    });
    
    // Simulation des actions d'urgence
    const emergencyBtns = document.querySelectorAll('.emergency-btn');
    emergencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            // Confirmation pour les actions critiques
            if(action === 'Arrêt d\'urgence' || action === 'Évacuation') {
                if(confirm(`Êtes-vous sûr de vouloir déclencher : ${action}?`)) {
                    window.electronAPI.emergencyAction(action)
                        .then(result => {
                            alert(result.message);
                            // Ajouter un log dans la console de débogage
                            const debugConsole = document.getElementById('debug-console');
                            debugConsole.innerHTML += `[URGENCE] ${result.message}<br>`;
                            debugConsole.scrollTop = debugConsole.scrollHeight;
                        });
                }
            } else {
                window.electronAPI.emergencyAction(action)
                    .then(result => {
                        alert(result.message);
                    });
            }
        });
    });
    
    // Simulation de la connexion à une caméra
    const connectBtn = document.querySelector('.camera-controls .btn-primary');
    connectBtn.addEventListener('click', function() {
        const cameraPlaceholder = document.querySelector('.camera-placeholder');
        cameraPlaceholder.innerHTML = `
            <div style="background: #333; padding: 10px; border-radius: 5px; color: white;">
                <i class="fas fa-sync fa-spin"></i> Connexion à la caméra...
            </div>
        `;
        
        window.electronAPI.connectCamera('192.168.1.101')
            .then(result => {
                cameraPlaceholder.innerHTML = `
                    <div style="text-align: center; color: #4CAF50;">
                        <i class="fas fa-check-circle" style="font-size: 3rem;"></i>
                        <p>${result.message}</p>
                        <small>Flux vidéo en cours de chargement...</small>
                    </div>
                `;
                
                // Ajouter un log
                const debugConsole = document.getElementById('debug-console');
                debugConsole.innerHTML += `[CAMERA] ${result.message}<br>`;
                debugConsole.scrollTop = debugConsole.scrollHeight;
            });
    });
    
    // Simulation du contrôle d'attraction
    const attractionBtns = document.querySelectorAll('.attraction-actions .btn');
    attractionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const attraction = this.closest('.attraction-card');
            const attractionName = attraction.querySelector('.attraction-header h3').textContent;
            
            if (this.classList.contains('btn-danger')) {
                window.electronAPI.emergencyAction(`Urgence sur ${attractionName}`)
                    .then(() => {
                        alert(`Signal d'urgence envoyé pour : ${attractionName}`);
                        
                        // Ajouter un log
                        const debugConsole = document.getElementById('debug-console');
                        debugConsole.innerHTML += `[URGENCE] Signal envoyé pour: ${attractionName}<br>`;
                        debugConsole.scrollTop = debugConsole.scrollHeight;
                    });
            } else if (this.querySelector('.fa-cog')) {
                alert(`Menu de maintenance ouvert pour : ${attractionName}`);
            } else if (this.querySelector('.fa-check')) {
                window.electronAPI.updateAttractionStatus(attractionName, 'open')
                    .then(result => {
                        const statusBadge = attraction.querySelector('.status-badge');
                        statusBadge.textContent = 'Ouvert';
                        statusBadge.className = 'status-badge status-open';
                        alert(`Maintenance terminée pour : ${attractionName}`);
                        
                        // Mettre à jour le statut
                        const metricValue = attraction.querySelectorAll('.metric-value')[1];
                        metricValue.textContent = '0/30';
                        
                        // Mettre à jour la barre de progression
                        const progressBar = attraction.querySelector('.progress-bar');
                        progressBar.className = 'progress-bar queue-low';
                        progressBar.style.width = '30%';
                        
                        // Mettre à jour la date de maintenance
                        const lastMaintenance = attraction.querySelectorAll('.metric-value')[2];
                        const now = new Date();
                        lastMaintenance.textContent = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
                    });
            }
        });
    });
    
    // Navigation dans la sidebar
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Gestion du tutoriel
            if(this.id === 'tutorial-btn') {
                document.getElementById('tutorial-modal').style.display = 'flex';
                return;
            }
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Afficher la section correspondante
            const sectionId = this.getAttribute('data-section');
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            if(sectionId === 'dashboard') {
                document.getElementById('dashboard').style.display = 'block';
            } else if(sectionId === 'settings') {
                document.getElementById('settings').style.display = 'block';
            } else if(sectionId === 'debug') {
                document.getElementById('debug').style.display = 'block';
            } else if(sectionId === 'update') {
                document.getElementById('update').style.display = 'block';
            } else {
                // Pour les autres sections, afficher un message
                document.getElementById('dashboard').style.display = 'block';
                const sectionTitle = document.querySelector('.section-title h2');
                sectionTitle.textContent = this.textContent.trim();
                
                // Ajouter un message
                const statsContainer = document.querySelector('.stats-container');
                statsContainer.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                        <i class="fas fa-cogs" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
                        <h3>Section en développement</h3>
                        <p>La section "${this.textContent.trim()}" est actuellement en cours de développement et sera disponible dans une prochaine mise à jour.</p>
                    </div>
                `;
            }
        });
    });
    
    // Gestion du tutoriel
    const tutorialModal = document.getElementById('tutorial-modal');
    const closeModal = document.querySelector('.modal-close');
    const finishTutorial = document.getElementById('finish-tutorial');
    
    closeModal.addEventListener('click', function() {
        tutorialModal.style.display = 'none';
    });
    
    finishTutorial.addEventListener('click', function() {
        tutorialModal.style.display = 'none';
        alert('Tutoriel terminé! Vous êtes maintenant prêt à utiliser ParkOps.');
    });
    
    // Simulation de téléchargement de mise à jour
    const downloadUpdate = document.getElementById('download-update');
    const progressFill = document.querySelector('.progress-fill');
    
    downloadUpdate.addEventListener('click', function() {
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-sync fa-spin"></i> Téléchargement...';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressFill.style.width = `${progress}%`;
            
            if(progress >= 100) {
                clearInterval(interval);
                this.innerHTML = '<i class="fas fa-check"></i> Téléchargement terminé';
                
                // Ajouter un log
                const debugConsole = document.getElementById('debug-console');
                debugConsole.innerHTML += `[UPDATE] Mise à jour téléchargée avec succès<br>`;
                debugConsole.scrollTop = debugConsole.scrollHeight;
            }
        }, 200);
    });
    
    // Simulation de diagnostic
    const diagnosticBtn = document.querySelector('.debug-controls .btn-danger');
    diagnosticBtn.addEventListener('click', function() {
        const debugConsole = document.getElementById('debug-console');
        debugConsole.innerHTML += '> Démarrage du diagnostic système...<br>';
        
        const messages = [
            '[DIAG] Vérification des modules... OK',
            '[DIAG] Test de la base de données... OK',
            '[DIAG] Vérification des connexions réseau... OK',
            '[DIAG] Test des périphériques... 3/3 OK',
            '[DIAG] Analyse de la sécurité... Aucune menace détectée',
            '[DIAG] Diagnostic terminé - Aucun problème détecté'
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if(i < messages.length) {
                debugConsole.innerHTML += messages[i] + '<br>';
                debugConsole.scrollTop = debugConsole.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
    });
});
