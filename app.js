document.getElementById('search-form').addEventListener('submit', function (event) {
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
                        <p><strong>Nombre:</strong> ${item.name}</p>
                        <p><strong>Email:</strong> ${item.email}</p>
                        <p><strong>Comentario:</strong> ${item.body}</p>
                        <button onclick="editComment(${item.id})">Editar</button>
                        <button onclick="deleteComment(${item.id})">Eliminar</button>
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

document.getElementById('crud-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const commentId = document.getElementById('comment_id').value;
    const postId = document.getElementById('post_id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const body = document.getElementById('body').value;

    const comment = {
        postId,
        name,
        email,
        body
    };

    const apiUrl = commentId ? `https://jsonplaceholder.typicode.com/comments/${commentId}` : 'https://jsonplaceholder.typicode.com/comments';
    const method = commentId ? 'PUT' : 'POST';

    fetch(apiUrl, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
        .then(data => {
            alert(`Comentario ${commentId ? 'actualizado' : 'creado'} con éxito`);
            document.getElementById('crud-form').reset();
        })
        .catch(error => {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar los datos. Inténtelo nuevamente.');
        });
});

document.getElementById('update-button').addEventListener('click', function () {
    const id = document.getElementById('id_busqueda').value;
    if (!id) {
        alert('Por favor, busque primero el comentario que desea actualizar.');
        return;
    }

    const apiUrl = `https://jsonplaceholder.typicode.com/comments/${id}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('comment_id').value = data.id;
                document.getElementById('post_id').value = data.postId;
                document.getElementById('name').value = data.name;
                document.getElementById('email').value = data.email;
                document.getElementById('body').value = data.body;
            } else {
                alert('Comentario no encontrado.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del comentario:', error);
            alert('Error al obtener los datos del comentario. Inténtelo nuevamente.');
        });
});

function editComment(id) {
    const apiUrl = `https://jsonplaceholder.typicode.com/comments/${id}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('comment_id').value = data.id;
            document.getElementById('post_id').value = data.postId;
            document.getElementById('name').value = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('body').value = data.body;
        })
        .catch(error => {
            console.error('Error al obtener los datos del comentario:', error);
            alert('Error al obtener los datos del comentario. Inténtelo nuevamente.');
        });
}

function deleteComment(id) {
    const apiUrl = `https://jsonplaceholder.typicode.com/comments/${id}`;

    fetch(apiUrl, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Comentario eliminado con éxito');
                document.getElementById('results').innerHTML = '';
            } else {
                alert('Error al eliminar el comentario. Inténtelo nuevamente.');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el comentario:', error);
            alert('Error al eliminar el comentario. Inténtelo nuevamente.');
        });
}
