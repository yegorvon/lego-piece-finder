function getLegoSet() {
    const setNumber = document.getElementById('setNumber').value;
    fetch(`/lego-set/${setNumber}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Set not found');
            }
        })
        .then(data => {
            const result = document.getElementById('result');
            result.textContent = '';

            const title = document.createElement('h2');
            title.textContent = data.name;

            const setNumber = document.createElement('p');
            setNumber.textContent = `Set Number: ${data.set_number}`;

            const year = document.createElement('p');
            year.textContent = `Year: ${data.year}`;

            const pieces = document.createElement('p');
            pieces.textContent = `Pieces: ${data.pieces}`;

            result.appendChild(title);
            result.appendChild(setNumber);
            result.appendChild(year);
            result.appendChild(pieces);
        })
        .catch(error => {
            const result = document.getElementById('result');
            result.textContent = error.message;
        });
}
