export default {
    methods: {
        formatMovie(data) {
            return {
                id: data.id || '',
                title: data.title || '',
                cost: data.cost || 0,
                store: data.store || '',
                imdbLink: data.imdbLink || '',
                addDate: data.addDate || new Date(),
                watched: (+data.watched === 1 || data.watched === true) || false,
                format: data.format || 'br' // br o dvd
            }
        },
        getSmartDailyMovie(collection) {
            const today = new Date().getUTCDate(); // Cambia cada día
            const month = new Date().getUTCMonth();
            
            // 1. Ordenar la colección para que el índice sea predecible
            // (Importante: .sort() afecta al array original, mejor usa una copia)
            const sortedCollection = [...collection].sort((a, b) => a.id.localeCompare(b.id));

            // 2. Filtrar preferiblemente las no vistas
            const unwatched = sortedCollection.filter(m => !m.watched);
            const targetList = unwatched.length > 0 ? unwatched : sortedCollection;

            // 3. Selección determinista basada en la fecha (día + mes para variar cada año)
            const seed = today + month;
            const selectedMovie = targetList[seed % targetList.length];

            return {
                date: Date.now(),
                id: selectedMovie.id,
                isNew: !selectedMovie.watched // Meta-información útil
            };
        },
        showToast(title, text, variant) {
            this.$bvToast.toast(text, {
                title,
                variant,
                solid: true,
                toaster: 'b-toaster-top-center'
            })
        },
        obtenerKeyTienda(nombre) {
            const tiendasReferencia = {
                'amazon': 'amazon',
                'elcorteingles': 'elcorteingles',
                'eci': 'elcorteingles',
                'fnac': 'fnac',
                'cex': 'cex',
                'carrefour': 'carrefour',
                'selectavision': 'selectavision',
                'mediamarkt': 'mediamarkt',
                'game': 'game',
                'centromail': 'centromail'
            }

            // Normalizamos el nombre para buscar la key:
            // 1. Minúsculas 
            // 2. Quitamos acentos (opcional pero recomendado)
            // 3. Quitamos todos los espacios
            const keyNormalizada = nombre
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") 
                .replace(/\s+/g, '');

        return tiendasReferencia.hasOwnProperty(keyNormalizada) 
            ? tiendasReferencia[keyNormalizada]
            : '' // Vacío por defecto
        },
        obtenerTiendaYPrecioDeDescripcionImdb(descripcion) {
            const result = { // Valores por defecto
                tienda: '',
                precio: 0
            }

            if (!descripcion) return result

            // Explicación de la nueva RegEx:
            // ^(.+?)            -> Grupo 1: Captura el nombre (mínimo un carácter)
            // \s+               -> Busca el espacio antes del número
            // ([\d.,]+)         -> Grupo 2: Captura el número (precio)
            // \s*(?:€)?$        -> Ignora espacios opcionales y el símbolo € al final
            const match = descripcion.match(/^(.+?)\s+([\d.,]+)\s*(?:€)?$/);

            if (match) {
                if (match[1].trim()) {
                    result.tienda = this.obtenerKeyTienda(match[1].trim())
                }
                result.precio = parseFloat(match[2].replace(',', '.'))
            }

            return result
        },
        readImdbCSV: async function(fileData) {
            const parsed = this.csvToArray(fileData);
            
            // 1. Limpieza: Quitamos cabecera y filtramos filas sin título (columna 5)
            const validRows = parsed.slice(1).filter(movie => movie[5] && movie[5].trim() !== '');
            
            const batchSize = 100;
            
            // 2. Procesamos por lotes
            for (let i = 0; i < validRows.length; i += batchSize) {
                const chunk = validRows.slice(i, i + batchSize);
                
                // 3. Mapeamos cada fila usando formatMovie
                const moviesBatch = chunk.map(movie => {
                    const dateWatched = movie[17];
                    const title = movie[5];
                    const imdbLink = movie[7];
                    const dateAdded = movie[2];
                    const tiendaYPrecio = this.obtenerTiendaYPrecioDeDescripcionImdb(movie[4] || '');

                    // Aquí integramos tu función formatMovie
                    return this.formatMovie({
                        'cost': tiendaYPrecio.precio,
                        'store': tiendaYPrecio.tienda,
                        'addDate': new Date(dateAdded).getTime(),
                        'title': title,
                        'watched': !!dateWatched,
                        'imdbLink': imdbLink,
                        'format': 'br'
                    });
                });

                // 4. Enviamos el lote al store y esperamos a que termine
                try {
                    await this.$store.dispatch('addMoviesBatch', moviesBatch);
                    console.log(`Lote de ${moviesBatch.length} películas procesado.`);
                } catch (error) {
                    console.error("Error procesando lote:", error);
                    // Opcional: break; si quieres detener todo si un lote falla
                }
            }
            
            console.log("Importación masiva completada con éxito.");
        },
        csvToArray(text) {
            let p = '',
                row = [''],
                ret = [row],
                i = 0,
                r = 0,
                s = !0,
                l;
            for (l of text) {
                if ('"' === l) {
                    if (s && l === p) row[i] += l;
                    s = !s;
                } else if (',' === l && s) l = row[++i] = '';
                else if ('\n' === l && s) {
                    if ('\r' === p) row[i] = row[i].slice(0, -1);
                    row = ret[++r] = [l = ''];
                    i = 0;
                } else row[i] += l;
                p = l;
            }
            return ret;
        },
        round2decimals(number) {
            return Math.round((number + Number.EPSILON) * 100) / 100
        },
        jsonToCsv(json) {
            const items = json
            const replacer = (key, value) => value === null ? '' : value.toString() // specify how you want to handle null values here
            const header = Object.keys(items[0])
            const csv = encodeURI([
                header.join(','), // header row first
                ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
            ].join("\n"))
            console.log(csv)
            return csv
        }
    }
}