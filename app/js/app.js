// Aplicação principal da Galeria de Imagens
class ImageGalleryApp {
    constructor() {
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.currentImages = [];
        this.currentImageIndex = 0;
        this.searchQuery = '';
        this.isLoading = false;

        this.initializeElements();
        this.bindEvents();
        this.loadInitialData();
    }

    initializeElements() {
        // Elementos de navegação
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.searchInput = document.getElementById('searchInput');
        this.viewButtons = document.querySelectorAll('.view-btn');
        
        // Elementos da galeria
        this.gallery = document.getElementById('gallery');
        this.categoryTitle = document.getElementById('categoryTitle');
        this.loading = document.getElementById('loading');
        this.noResults = document.getElementById('noResults');
        
        // Elementos de estatísticas
        this.totalImagesEl = document.getElementById('totalImages');
        this.viewCountEl = document.getElementById('viewCount');
        
        // Elementos do modal
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.modalCategory = document.getElementById('modalCategory');
        this.modalDate = document.getElementById('modalDate');
        this.modalClose = document.getElementById('modalClose');
        this.prevImageBtn = document.getElementById('prevImage');
        this.nextImageBtn = document.getElementById('nextImage');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
    }

    bindEvents() {
        // Navegação por categoria
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.setActiveCategory(category);
                this.loadImages(category);
            });
        });

        // Busca
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.debounceSearch();
        });

        // Visualização (grid/list)
        this.viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.setActiveView(view);
            });
        });

        // Modal
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Navegação no modal
        this.prevImageBtn.addEventListener('click', () => this.showPreviousImage());
        this.nextImageBtn.addEventListener('click', () => this.showNextImage());

        // Ações do modal
        this.downloadBtn.addEventListener('click', () => this.downloadImage());
        this.shareBtn.addEventListener('click', () => this.shareImage());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());

        // Teclas de atalho
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.showPreviousImage();
                        break;
                    case 'ArrowRight':
                        this.showNextImage();
                        break;
                }
            }
        });

        // Links do footer
        document.querySelectorAll('footer a[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.currentTarget.dataset.category;
                this.setActiveCategory(category);
                this.loadImages(category);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    async loadInitialData() {
        try {
            this.showLoading(true);
            
            // Conecta ao banco de dados
            await imageDB.connect();
            
            // Carrega estatísticas
            this.updateStats();
            
            // Carrega todas as imagens inicialmente
            await this.loadImages('all');
            
        } catch (error) {
            console.error('Erro ao carregar dados iniciais:', error);
            this.showError('Erro ao carregar a galeria. Tente recarregar a página.');
        }
    }

    async loadImages(category = 'all') {
        try {
            this.showLoading(true);
            this.currentCategory = category;
            
            let images;
            if (this.searchQuery) {
                images = await imageDB.searchImages(this.searchQuery);
                if (category !== 'all') {
                    images = images.filter(img => img.category === category);
                }
            } else if (category === 'all') {
                images = await imageDB.getAllImages();
            } else {
                images = await imageDB.getImagesByCategory(category);
            }
            
            this.currentImages = images;
            this.renderGallery(images);
            this.updateCategoryTitle(category, images.length);
            
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
            this.showError('Erro ao carregar imagens.');
        } finally {
            this.showLoading(false);
        }
    }

    renderGallery(images) {
        if (images.length === 0) {
            this.gallery.innerHTML = '';
            this.noResults.style.display = 'block';
            return;
        }

        this.noResults.style.display = 'none';
        
        const galleryHTML = images.map((image, index) => `
            <div class="gallery-item ${this.currentView === 'list' ? 'list-view' : ''}" 
                 data-image-id="${image.id}" 
                 data-index="${index}">
                <div class="image-container">
                    <img src="${image.path}" 
                         alt="${image.title}"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuZGlzcG9uw612ZWw8L3RleHQ+PC9zdmc+'">
                    <div class="image-overlay">
                        <div class="overlay-content">
                            <h4>${image.title}</h4>
                            <p>${this.truncateText(image.description, 60)}</p>
                        </div>
                    </div>
                </div>
                <div class="item-info">
                    <h4>${image.title}</h4>
                    <p>${this.truncateText(image.description, this.currentView === 'list' ? 120 : 80)}</p>
                    <div class="item-meta">
                        <span class="category-tag">${this.getCategoryDisplayName(image.category)}</span>
                        <span>${image.views.toLocaleString()} visualizações</span>
                    </div>
                </div>
            </div>
        `).join('');

        this.gallery.innerHTML = galleryHTML;

        // Adiciona event listeners para as imagens
        this.gallery.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const imageId = parseInt(item.dataset.imageId);
                const index = parseInt(item.dataset.index);
                this.openModal(imageId, index);
            });
        });

        // Anima a entrada das imagens
        this.animateGalleryItems();
    }

    animateGalleryItems() {
        const items = this.gallery.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    async openModal(imageId, index) {
        try {
            const image = await imageDB.getImageById(imageId);
            if (!image) return;

            // Incrementa visualizações
            imageDB.incrementViews(imageId);
            this.updateStats();

            this.currentImageIndex = index;
            
            // Atualiza conteúdo do modal
            this.modalImage.src = image.path;
            this.modalTitle.textContent = image.title;
            this.modalDescription.textContent = image.description;
            this.modalCategory.textContent = this.getCategoryDisplayName(image.category);
            this.modalDate.textContent = this.formatDate(image.uploadDate);
            
            // Atualiza botão de favorito
            this.updateFavoriteButton(imageId);
            
            // Mostra modal
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
        } catch (error) {
            console.error('Erro ao abrir modal:', error);
        }
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    showPreviousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            const image = this.currentImages[this.currentImageIndex];
            this.openModal(image.id, this.currentImageIndex);
        }
    }

    showNextImage() {
        if (this.currentImageIndex < this.currentImages.length - 1) {
            this.currentImageIndex++;
            const image = this.currentImages[this.currentImageIndex];
            this.openModal(image.id, this.currentImageIndex);
        }
    }

    async toggleFavorite() {
        const currentImage = this.currentImages[this.currentImageIndex];
        if (!currentImage) return;

        const isFavorite = imageDB.toggleFavorite(currentImage.id);
        this.updateFavoriteButton(currentImage.id);
        
        // Feedback visual
        this.showToast(isFavorite ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
    }

    updateFavoriteButton(imageId) {
        const isFavorite = imageDB.isFavorite(imageId);
        const icon = this.favoriteBtn.querySelector('i');
        
        if (isFavorite) {
            this.favoriteBtn.classList.add('active');
            icon.className = 'fas fa-heart';
        } else {
            this.favoriteBtn.classList.remove('active');
            icon.className = 'far fa-heart';
        }
    }

    downloadImage() {
        const currentImage = this.currentImages[this.currentImageIndex];
        if (!currentImage) return;

        // Simula download (em um ambiente real, seria um link direto)
        const link = document.createElement('a');
        link.href = currentImage.path;
        link.download = currentImage.filename;
        link.click();
        
        this.showToast('Download iniciado!');
    }

    shareImage() {
        const currentImage = this.currentImages[this.currentImageIndex];
        if (!currentImage) return;

        if (navigator.share) {
            navigator.share({
                title: currentImage.title,
                text: currentImage.description,
                url: window.location.href
            });
        } else {
            // Fallback para navegadores sem suporte ao Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('Link copiado para a área de transferência!');
            });
        }
    }

    setActiveCategory(category) {
        this.navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this.currentCategory = category;
    }

    setActiveView(view) {
        this.viewButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.currentView = view;
        this.gallery.classList.toggle('list-view', view === 'list');
        
        // Re-renderiza para aplicar classes corretas
        this.renderGallery(this.currentImages);
    }

    updateCategoryTitle(category, count) {
        const categoryNames = {
            'all': 'Todas as Imagens',
            'cidades': 'Cidades',
            'natureza': 'Natureza',
            'cachoeiras': 'Cachoeiras'
        };
        
        const title = categoryNames[category] || 'Imagens';
        this.categoryTitle.textContent = `${title} (${count})`;
    }

    updateStats() {
        const stats = imageDB.getStats();
        this.totalImagesEl.textContent = stats.totalImages;
        this.viewCountEl.textContent = stats.totalViews.toLocaleString();
    }

    showLoading(show) {
        this.isLoading = show;
        this.loading.style.display = show ? 'block' : 'none';
        this.gallery.style.display = show ? 'none' : 'grid';
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'success') {
        // Remove toast anterior se existir
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(toast);

        // Anima entrada
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove após 3 segundos
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Busca com debounce
    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.loadImages(this.currentCategory);
        }, 300);
    }

    // Utilitários
    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    getCategoryDisplayName(category) {
        const names = {
            'cidades': 'Cidades',
            'natureza': 'Natureza',
            'cachoeiras': 'Cachoeiras'
        };
        return names[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.galleryApp = new ImageGalleryApp();
    
    // Log de inicialização
    console.log('🎨 Galeria de Imagens inicializada!');
    console.log('🐳 Executando em container Docker');
    console.log('🗄️ Banco H2 simulado carregado');
});

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW falhou: ', registrationError);
            });
    });
}

