document.addEventListener('DOMContentLoaded', function() {
    // Fonctionnalité de changement d'onglet
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Supprimer la classe active de tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Masquer tout le contenu des onglets
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Afficher le contenu de l'onglet sélectionné
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Fonctionnalité de test de regex
    document.getElementById('test-button').addEventListener('click', testRegex);
    
    // Utilisation d'exemples
    document.querySelectorAll('.use-example').forEach(button => {
        button.addEventListener('click', function() {
            const regex = this.getAttribute('data-regex');
            document.getElementById('regex').value = regex;
            
            // Basculer vers l'onglet créateur
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-tab="builder"]').classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById('builder').classList.add('active');
        });
    });
    
    // Fonctionnalité pour le sous-menu d'aide
    const helpSubMenuItems = document.querySelectorAll('.help-submenu-item');
    helpSubMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Supprimer la classe active de tous les éléments du sous-menu
            helpSubMenuItems.forEach(i => i.classList.remove('active'));
            // Ajouter la classe active à l'élément cliqué
            this.classList.add('active');
            
            // Masquer tout le contenu d'aide
            document.querySelectorAll('.help-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Afficher le contenu d'aide sélectionné
            const helpId = `${this.getAttribute('data-help')}-help`;
            document.getElementById(helpId).classList.add('active');
        });
    });
    
    // Fonctionnalité pour le générateur de médias
    const generateButton = document.getElementById('generate-button');
    const copyButton = document.getElementById('copy-button');
    const mediaTypeOptions = document.querySelectorAll('.generator-option');
    const seasonMatchCheckbox = document.getElementById('season-match');
    const seasonNumberInput = document.getElementById('season-number');

    if (seasonMatchCheckbox) {
        // Activer/désactiver le champ de numéro de saison
        seasonMatchCheckbox.addEventListener('change', function() {
            seasonNumberInput.disabled = !this.checked;
        });
    }

    if (mediaTypeOptions.length > 0) {
        // Sélection du type de média
        mediaTypeOptions.forEach(option => {
            option.addEventListener('click', function() {
                mediaTypeOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    if (generateButton) {
        // Génération de regex
        generateButton.addEventListener('click', function() {
            const mediaTitle = document.getElementById('media-title').value.trim();
            if (!mediaTitle) {
                alert('Veuillez entrer un titre de média.');
                return;
            }

            // Récupérer les options
            const mediaType = document.querySelector('.generator-option.selected').getAttribute('data-type');
            const strictMatch = document.getElementById('strict-match').checked;
            const yearMatch = document.getElementById('year-match').checked;
            const qualityMatch = document.getElementById('quality-match').checked;
            const seasonMatch = document.getElementById('season-match').checked;
            const seasonNumber = document.getElementById('season-number').value.trim();

            // Extraire le titre et l'année si présente
            let title = mediaTitle;
            let year = '';

            const yearMatch1 = mediaTitle.match(/\s*\((\d{4})\)$/);
            const yearMatch2 = mediaTitle.match(/\s+(\d{4})$/);

            if (yearMatch1) {
                title = mediaTitle.replace(yearMatch1[0], '').trim();
                year = yearMatch1[1];
            } else if (yearMatch2) {
                title = mediaTitle.replace(yearMatch2[0], '').trim();
                year = yearMatch2[1];
            }

            // Préparer le titre pour la regex
            const escapedTitle = escapeRegExp(title);
            
            // Construire la regex
            let regexPattern = '';
            let explanation = '';

            // Remplacer les espaces par ? pour les noms de fichiers
            const titleWithQuestionMarks = escapedTitle.replace(/\s+/g, '?');

            if (strictMatch) {
                // Correspondance stricte - le titre doit être exactement comme spécifié
                regexPattern = titleWithQuestionMarks;
                explanation = `Cette regex recherche exactement le titre "${title}"`;
            } else {
                // Correspondance plus souple - permet des variations autour du titre
                regexPattern = `.*${titleWithQuestionMarks}.*`;
                explanation = `Cette regex recherche des fichiers contenant "${title}" n'importe où dans le nom`;
            }

            // Ajouter l'année si demandé et disponible
            if (yearMatch && year) {
                regexPattern += `.*${year}.*`;
                explanation += ` et de l'année ${year}`;
            }

            // Ajouter des patterns spécifiques selon le type de média
            if (mediaType === 'tv' || mediaType === 'all') {
                if (seasonMatch) {
                    if (seasonNumber) {
                        const paddedSeasonNumber = seasonNumber.padStart(2, '0');
                        regexPattern += `.*S${paddedSeasonNumber}.*`;
                        explanation += `, spécifiquement pour la saison ${seasonNumber}`;
                    } else {
                        regexPattern += `.*S\\d+.*`;
                        explanation += `, pour n'importe quelle saison`;
                    }
                }
            }

            // Ajouter des patterns de qualité si demandé
            if (qualityMatch) {
                regexPattern += `.*(1080p|720p|2160p|UHD|4K).*`;
                explanation += `, avec les qualités courantes (1080p, 720p, 2160p, UHD, 4K)`;
            }

            // Afficher la regex générée
            document.getElementById('generated-regex').value = regexPattern;
            document.getElementById('explanation').innerText = explanation + '.';
        });
    }

    if (copyButton) {
        // Copier la regex générée
        copyButton.addEventListener('click', function() {
            const generatedRegex = document.getElementById('generated-regex');
            generatedRegex.select();
            document.execCommand('copy');
            
            // Changer temporairement le texte du bouton pour indiquer que la copie a fonctionné
            const originalText = this.innerText;
            this.innerText = 'Copié!';
            setTimeout(() => {
                this.innerText = originalText;
            }, 1500);
        });
    }

    // Fonctionnalités pour les macros
    setupMacroTemplates();
    setupVariablesList();
    setupMacroTester();

    function testRegex() {
        const regexPattern = document.getElementById('regex').value;
        const testStrings = document.getElementById('test-strings').value.split('\n');
        const resultsDiv = document.getElementById('results');
        
        resultsDiv.innerHTML = '<h3>Résultats :</h3>';
        
        if (!regexPattern) {
            resultsDiv.innerHTML += '<p>Veuillez entrer un modèle regex.</p>';
            return;
        }
        
        try {
            const regex = new RegExp(regexPattern);
            
            testStrings.forEach(string => {
                if (!string.trim()) return; // Ignorer les lignes vides
                
                const matches = regex.test(string);
                const resultItem = document.createElement('div');
                resultItem.className = `match-item ${matches ? 'match' : 'no-match'}`;
                resultItem.innerHTML = `
                    <strong>${string}</strong>: ${matches ? 'CORRESPOND' : 'NE CORRESPOND PAS'}
                `;
                resultsDiv.appendChild(resultItem);
            });
        } catch (error) {
            resultsDiv.innerHTML += `<p>Erreur dans le modèle regex : ${error.message}</p>`;
        }
    }

    // Fonction utilitaire pour échapper les caractères spéciaux dans les regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Configuration des templates de macros
    function setupMacroTemplates() {
        const templates = document.querySelectorAll('.macro-template');
        if (!templates.length) return;

        templates.forEach(template => {
            template.addEventListener('click', function() {
                const macroCode = this.getAttribute('data-template');
                const macroEditor = document.getElementById('macro-editor');
                if (macroEditor) {
                    macroEditor.value = macroCode;
                }
            });
        });
    }

    // Configuration de la liste des variables
    function setupVariablesList() {
        const variables = document.querySelectorAll('.variable-item');
        if (!variables.length) return;

        variables.forEach(variable => {
            variable.addEventListener('click', function() {
                const varName = this.getAttribute('data-var');
                const macroEditor = document.getElementById('macro-editor');
                if (macroEditor) {
                    insertTextAtCursor(macroEditor, varName);
                }
            });
        });
    }

    // Insérer du texte à la position du curseur
    function insertTextAtCursor(element, text) {
        const start = element.selectionStart;
        const end = element.selectionEnd;
        const value = element.value;
        
        element.value = value.substring(0, start) + text + value.substring(end);
        element.selectionStart = element.selectionEnd = start + text.length;
        element.focus();
    }

    // Configuration du testeur de macros
    function setupMacroTester() {
        const testButton = document.getElementById('test-macro-button');
        if (!testButton) return;

        testButton.addEventListener('click', function() {
            const macroCode = document.getElementById('macro-editor').value;
            const macroResult = document.getElementById('macro-result');
            
            if (!macroCode.trim()) {
                macroResult.innerHTML = '<div class="macro-error">Veuillez entrer un code de macro.</div>';
                return;
            }

            // Simuler l'évaluation de la macro (en réalité, ce serait traité par le backend autobrr)
            try {
                // Analyse simplifiée pour détecter les erreurs de syntaxe basiques
                const balanced = checkBalancedBraces(macroCode);
                if (!balanced) {
                    throw new Error("Erreur de syntaxe: accolades, parenthèses ou crochets non équilibrés.");
                }

                const result = simulateMacroExecution(macroCode);
                macroResult.innerHTML = `<div class="macro-result">Résultat simulé:<br>${result}</div>`;
            } catch (error) {
                macroResult.innerHTML = `<div class="macro-error">Erreur: ${error.message}</div>`;
            }
        });
    }

    // Vérifier si les accolades, parenthèses et crochets sont équilibrés
    function checkBalancedBraces(code) {
        const stack = [];
        const pairs = {
            '{': '}',
            '(': ')',
            '[': ']'
        };
        
        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            
            if ('{(['.includes(char)) {
                stack.push(char);
            } else if ('})]'.includes(char)) {
                const last = stack.pop();
                if (pairs[last] !== char) {
                    return false;
                }
            }
        }
        
        return stack.length === 0;
    }

    // Simuler l'exécution d'une macro (ceci est juste une simulation, pas une véritable exécution)
    function simulateMacroExecution(code) {
        // Ceci est une simulation très simplifiée
        // Dans la réalité, cela serait traité côté serveur par autobrr

        // Remplacer les variables par des valeurs simulées
        let result = code
            .replace(/{{\.TorrentName}}/g, "Exemple.Torrent.2023.1080p.BluRay.x264-GROUPE")
            .replace(/{{\.Resolution}}/g, "1080p")
            .replace(/{{\.Year}}/g, "2023")
            .replace(/{{\.Title}}/g, "Exemple Torrent")
            .replace(/{{\.Source}}/g, "BluRay")
            .replace(/{{\.Group}}/g, "GROUPE")
            .replace(/{{\.CurrentYear}}/g, new Date().getFullYear())
            .replace(/{{\.CurrentMonth}}/g, new Date().getMonth() + 1)
            .replace(/{{\.CurrentDay}}/g, new Date().getDate());

        // Simuler des opérations de base (très simpliste)
        // Note: Ce n'est pas une véritable évaluation Go templates
        if (code.includes("regexReplaceAll")) {
            result = "Exemple.Torrent.S01.1080p.BluRay.x264-GROUPE"; // Simulation de remplacement
        }
        
        if (code.includes("printf")) {
            result = result.replace(/printf "%02d"/g, "formatté en 2 chiffres");
        }

        if (code.includes("if")) {
            result = "Condition satisfaite: Exemple.Torrent.2023.1080p.BluRay.x264-GROUPE";
        }

        return result;
    }
});