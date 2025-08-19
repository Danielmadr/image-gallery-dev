// Simulação do banco de dados
class ImageDatabase {
    constructor() {
        this.images = [
            // Cidades
            {
                id: 1,
                title: "Skyline de São Paulo",
                description: "Vista panorâmica do centro financeiro de São Paulo ao entardecer, mostrando a densidade urbana e a arquitetura moderna da maior metrópole brasileira.",
                category: "cidades",
                filename: "sao_paulo_skyline.jpg",
                path: "images/cidades/sao_paulo_skyline.jpg",
                uploadDate: "2024-01-15",
                views: 1250,
                favorites: 89,
                tags: ["são paulo", "skyline", "urbano", "brasil", "metrópole"]
            },
            {
                id: 2,
                title: "Rio de Janeiro - Pão de Açúcar",
                description: "O icônico Pão de Açúcar visto da Praia Vermelha, com a cidade do Rio de Janeiro se estendendo ao fundo em um dia ensolarado.",
                category: "cidades",
                filename: "rio_pao_acucar.jpg",
                path: "images/cidades/rio_pao_acucar.jpg",
                uploadDate: "2024-01-20",
                views: 2100,
                favorites: 156,
                tags: ["rio de janeiro", "pão de açúcar", "praia", "brasil", "turismo"]
            },
            {
                id: 3,
                title: "Brasília - Congresso Nacional",
                description: "A arquitetura modernista de Oscar Niemeyer no Congresso Nacional, símbolo da capital brasileira e patrimônio da humanidade.",
                category: "cidades",
                filename: "brasilia_congresso.jpg",
                path: "images/cidades/brasilia_congresso.jpg",
                uploadDate: "2024-01-25",
                views: 890,
                favorites: 67,
                tags: ["brasília", "congresso", "niemeyer", "arquitetura", "modernismo"]
            },
            {
                id: 4,
                title: "Salvador - Pelourinho",
                description: "As coloridas casas coloniais do centro histórico de Salvador, patrimônio mundial da UNESCO, em uma tarde ensolarada.",
                category: "cidades",
                filename: "salvador_pelourinho.jpg",
                path: "images/cidades/salvador_pelourinho.jpg",
                uploadDate: "2024-02-01",
                views: 1450,
                favorites: 112,
                tags: ["salvador", "pelourinho", "colonial", "unesco", "bahia"]
            },

            // Natureza
            {
                id: 5,
                title: "Floresta Amazônica",
                description: "Vista aérea da densa floresta amazônica, mostrando a biodiversidade e a importância desta floresta tropical para o planeta.",
                category: "natureza",
                filename: "amazonia_floresta.jpg",
                path: "images/natureza/amazonia_floresta.jpg",
                uploadDate: "2024-01-18",
                views: 3200,
                favorites: 245,
                tags: ["amazônia", "floresta", "biodiversidade", "brasil", "natureza"]
            },
            {
                id: 6,
                title: "Pantanal - Vida Selvagem",
                description: "Um jacaré descansando nas águas calmas do Pantanal, a maior planície alagável do mundo e santuário da vida selvagem.",
                category: "natureza",
                filename: "pantanal_jacare.jpg",
                path: "images/natureza/pantanal_jacare.jpg",
                uploadDate: "2024-01-22",
                views: 1800,
                favorites: 134,
                tags: ["pantanal", "jacaré", "vida selvagem", "brasil", "wetland"]
            },
            {
                id: 7,
                title: "Cerrado - Ipês Amarelos",
                description: "Ipês amarelos em flor no cerrado brasileiro, mostrando a beleza única deste bioma durante a estação seca.",
                category: "natureza",
                filename: "cerrado_ipes.jpg",
                path: "images/natureza/cerrado_ipes.jpg",
                uploadDate: "2024-02-05",
                views: 1100,
                favorites: 78,
                tags: ["cerrado", "ipê", "flores", "brasil", "bioma"]
            },
            {
                id: 8,
                title: "Mata Atlântica - Bromélia",
                description: "Uma bromélia colorida na Mata Atlântica, representando a rica flora endêmica deste bioma ameaçado.",
                category: "natureza",
                filename: "mata_atlantica_bromelia.jpg",
                path: "images/natureza/mata_atlantica_bromelia.jpg",
                uploadDate: "2024-02-08",
                views: 950,
                favorites: 65,
                tags: ["mata atlântica", "bromélia", "flora", "brasil", "endêmica"]
            },

            // Cachoeiras
            {
                id: 9,
                title: "Cataratas do Iguaçu",
                description: "As majestosas Cataratas do Iguaçu na fronteira entre Brasil e Argentina, uma das sete maravilhas naturais do mundo.",
                category: "cachoeiras",
                filename: "iguacu_cataratas.jpg",
                path: "images/cachoeiras/iguacu_cataratas.jpg",
                uploadDate: "2024-01-12",
                views: 4500,
                favorites: 320,
                tags: ["iguaçu", "cataratas", "unesco", "brasil", "argentina"]
            },
            {
                id: 10,
                title: "Cachoeira da Fumaça - Chapada Diamantina",
                description: "A impressionante Cachoeira da Fumaça na Chapada Diamantina, com seus 340 metros de queda livre em meio ao cerrado baiano.",
                category: "cachoeiras",
                filename: "fumaca_chapada.jpg",
                path: "images/cachoeiras/fumaca_chapada.jpg",
                uploadDate: "2024-01-28",
                views: 2800,
                favorites: 198,
                tags: ["fumaça", "chapada diamantina", "bahia", "trekking", "aventura"]
            },
            {
                id: 11,
                title: "Cachoeira do Caracol - Canela",
                description: "A Cachoeira do Caracol em Canela, Rio Grande do Sul, com sua queda de 131 metros em meio à mata nativa da Serra Gaúcha.",
                category: "cachoeiras",
                filename: "caracol_canela.jpg",
                path: "images/cachoeiras/caracol_canela.jpg",
                uploadDate: "2024-02-03",
                views: 1650,
                favorites: 123,
                tags: ["caracol", "canela", "rio grande do sul", "serra gaúcha", "turismo"]
            },
            {
                id: 12,
                title: "Cachoeira Véu da Noiva - Chapada dos Guimarães",
                description: "O Véu da Noiva na Chapada dos Guimarães, Mato Grosso, uma das cachoeiras mais fotografadas do Centro-Oeste brasileiro.",
                category: "cachoeiras",
                filename: "veu_noiva_chapada.jpg",
                path: "images/cachoeiras/veu_noiva_chapada.jpg",
                uploadDate: "2024-02-10",
                views: 2200,
                favorites: 167,
                tags: ["véu da noiva", "chapada dos guimarães", "mato grosso", "cerrado", "ecoturismo"]
            }
        ];

        this.favorites = JSON.parse(localStorage.getItem('gallery_favorites') || '[]');
        this.viewCounts = JSON.parse(localStorage.getItem('gallery_views') || '{}');
        this.totalViews = parseInt(localStorage.getItem('gallery_total_views') || '0');
    }

    // Simula consulta SQL: SELECT * FROM images
    getAllImages() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.images]);
            }, 300); // Simula latência do banco
        });
    }

    // Simula consulta SQL: SELECT * FROM images WHERE category = ?
    getImagesByCategory(category) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const filtered = this.images.filter(img => img.category === category);
                resolve(filtered);
            }, 200);
        });
    }

    // Simula consulta SQL: SELECT * FROM images WHERE title LIKE ? OR description LIKE ?
    searchImages(query) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const searchTerm = query.toLowerCase();
                const filtered = this.images.filter(img => 
                    img.title.toLowerCase().includes(searchTerm) ||
                    img.description.toLowerCase().includes(searchTerm) ||
                    img.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
                resolve(filtered);
            }, 250);
        });
    }

    // Simula consulta SQL: SELECT * FROM images WHERE id = ?
    getImageById(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const image = this.images.find(img => img.id === id);
                resolve(image);
            }, 100);
        });
    }

    // Simula UPDATE: UPDATE images SET views = views + 1 WHERE id = ?
    incrementViews(imageId) {
        const image = this.images.find(img => img.id === imageId);
        if (image) {
            image.views++;
            this.totalViews++;
            this.viewCounts[imageId] = (this.viewCounts[imageId] || 0) + 1;
            localStorage.setItem('gallery_views', JSON.stringify(this.viewCounts));
            localStorage.setItem('gallery_total_views', this.totalViews.toString());
        }
    }

    // Gerenciamento de favoritos (localStorage simula tabela de relacionamento)
    toggleFavorite(imageId) {
        const index = this.favorites.indexOf(imageId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(imageId);
        }
        localStorage.setItem('gallery_favorites', JSON.stringify(this.favorites));
        return this.favorites.includes(imageId);
    }

    isFavorite(imageId) {
        return this.favorites.includes(imageId);
    }

    getFavoriteImages() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const favoriteImages = this.images.filter(img => this.favorites.includes(img.id));
                resolve(favoriteImages);
            }, 200);
        });
    }

    // Estatísticas do banco
    getStats() {
        return {
            totalImages: this.images.length,
            totalViews: this.totalViews,
            totalFavorites: this.favorites.length,
            categoryCounts: {
                cidades: this.images.filter(img => img.category === 'cidades').length,
                natureza: this.images.filter(img => img.category === 'natureza').length,
                cachoeiras: this.images.filter(img => img.category === 'cachoeiras').length
            }
        };
    }

    // Simula inserção de nova imagem (para futuras expansões)
    insertImage(imageData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newId = Math.max(...this.images.map(img => img.id)) + 1;
                const newImage = {
                    id: newId,
                    uploadDate: new Date().toISOString().split('T')[0],
                    views: 0,
                    favorites: 0,
                    ...imageData
                };
                this.images.push(newImage);
                resolve(newImage);
            }, 400);
        });
    }

    // Simula conexão com banco H2
    connect() {
        return new Promise((resolve) => {
            console.log('🔌 Conectando ao banco H2...');
            setTimeout(() => {
                console.log('✅ Conexão estabelecida com sucesso!');
                console.log(`📊 Banco contém ${this.images.length} imagens`);
                resolve(true);
            }, 500);
        });
    }

    // Simula backup do banco
    backup() {
        const backupData = {
            images: this.images,
            favorites: this.favorites,
            viewCounts: this.viewCounts,
            totalViews: this.totalViews,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(backupData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `gallery_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        console.log('💾 Backup realizado com sucesso!');
    }
}

// Instância global do banco de dados
window.imageDB = new ImageDatabase();

