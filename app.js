document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const id = document.getElementById('id_busqueda').value;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/1/comments?id=${id}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results'); 
            resultsContainer.innerHTML = '';

            if (data.length > 0) {
                data.forEach(item => {
                    const resultDiv = document.createElement('div');
                    resultDiv.classList.add('result');
                    
                    resultDiv.innerHTML = `
                        <p><strong>Post ID:</strong> ${item.postId}</p>
                        <p><strong>ID:</strong> ${item.id}</p>
                        <p><strong>Name:</strong> ${item.name}</p>
                        <p><strong>Email:</strong> ${item.email}</p>
                        <p><strong>Body:</strong> ${item.body}</p>
                    `;
                    
                    resultsContainer.appendChild(resultDiv);
                });
            } else {
                resultsContainer.innerHTML = '<p>No se encontraron resultados para el ID proporcionado.</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            document.getElementById('results').innerHTML = '<p>Error al obtener los datos. Inténtelo nuevamente.</p>';
        });
});
