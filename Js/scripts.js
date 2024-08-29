// script.js
const data = [];

const form = document.getElementById('crud-form');
const tableBody = document.querySelector('#data-table tbody');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');

    const newName = nameInput.value.trim(); // Elimina espacios en blanco al principio y al final
    const newDescription = descriptionInput.value.trim();

    if (newName === '' || newDescription === '') {
        alert('Por favor, completa todos los campos antes de guardar.');
        return; // No guarda datos vacíos
    }

    const newData = {
        name: newName,
        description: newDescription,
    };

    data.push(newData);
    renderTable();
    nameInput.value = '';
    descriptionInput.value = '';
});

function renderTable() {
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>
                <button class="edit" onclick="openModal(${index})">Editar</button>
                <button class="delete" onclick="deleteItem(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteItem(index) {
    data.splice(index, 1);
    renderTable();
}

function openModal(index) {
    modal.style.display = 'flex';
    modalContent.innerHTML = `
        <input type="text" id="editedName" value="${data[index].name}">
        <input type="text" id="editedDescription" value="${data[index].description}">
        <button class="modal-button" onclick="saveChanges(${index})">Guardar</button>
        <button class="modal-button modal-cancel" onclick="closeModal()">Cancelar</button>
    `;
}

function saveChanges(index) {
    const editedName = document.getElementById('editedName').value;
    const editedDescription = document.getElementById('editedDescription').value;

    data[index].name = editedName;
    data[index].description = editedDescription;
    renderTable();
    closeModal();
}

function closeModal() {
    modal.style.display = 'none';
}
