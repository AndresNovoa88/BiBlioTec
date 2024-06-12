document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const criterio = document.getElementById('criterio_busqueda').value;
    const valor = document.getElementById('valor_busqueda').value;
    
    // URL de la API de JSONPlaceholder (cambiado para una consulta de libros simulada)
    const apiUrl = `https://jsonplaceholder.typicode.com/posts?${criterio}=${valor}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Limpiar resultados anteriores
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';
            
            // Mostrar los resultados (tomando solo los primeros 4 campos)
            data.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result');
                
                resultDiv.innerHTML = `
                    <p><strong>ID:</strong> ${item.id}</p>
                    <p><strong>Título:</strong> ${item.title}</p>
                    <p><strong>Contenido:</strong> ${item.body}</p>
                    <p><strong>Usuario ID:</strong> ${item.userId}</p>
                `;
                
                resultsContainer.appendChild(resultDiv);
            });
        })
        .catch(error => console.error('Error al obtener los datos:', error));
});
