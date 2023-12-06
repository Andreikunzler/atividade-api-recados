const messagesContainer = document.querySelector('.messages-list')

async function fetchMessages() {
  try {
    const response = await api.get('/notes')
    const messages = response.data

    console.log(messages)

    messagesContainer.innerHTML = ''

    messages.forEach(message => {
      const messageCard = document.createElement('div')
      messageCard.classList.add('card')

      messageCard.innerHTML = `
        <h2 class="card-title">${message.title}</h2>
        <p class="card-description">${message.description}</p>
      `

      messagesContainer.appendChild(messageCard)
    });

    if (messages.length === 0) {
      const h3 = document.createElement('h3')
      h3.textContent = 'Nenhum recado cadastrado.'
      messagesContainer.appendChild(h3)
    }
  } catch (error) {
    console.log('Erro ao buscar mensagens', error)
  }
}

fetchMessages()

async function createNewMessage() {
  const newMessage = {
    title: 'Estudar Axios',
    description: '2h por dia',
    user_id: 1
  }

  try {
    const response = await api.post('/notes', newMessage)

    if (response.status === 201) {
      alert('Recado cadastrado com sucesso!')
    }
  } catch (error) {
    console.log('Erro ao cadastrar recado', error)
  }
}

// createNewMessage()

async function updateMessage() {
  const editMessage = {
    title: 'Novo Título',
    description: 'Uma descrição legal'
  }

  try {
    const idMessage = 156
    const response = await api.put(`/notes/${idMessage}`, editMessage)

    if(response.status === 200) {
      alert('Recado atualizado com sucesso!')
    }
  }catch (error) {
    console.log('Erro ao atualizar recado.')
  }
}

// updateMessage()

async function deleteMessage() {
  const idMessage = 109

  try {
    const response = await api.delete(`/notes/${idMessage}`)

    if (response.status === 200) {
      alert('Recado exclído com sucesso')
    }

  } catch (error) {
    console.log('Erro ao excluir recado', error)
  }
}
// deleteMessage()
// fetchMessages()