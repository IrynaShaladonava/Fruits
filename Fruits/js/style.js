document.getElementById('searchInput').addEventListener('input', searchFruit);

function showAllFruits() {
    fetch('https://www.fruityvice.com/api/fruit/all')
        .then(response => response.json())
        .then(data => displayFruits(data))
        .catch(error => console.error('Error fetching all fruits:', error));
}

function searchFruit() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm.trim()) {
        // showAllFruits();
        return;
    }

    fetch(`https://www.fruityvice.com/api/fruit/${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No fruit found for ${searchTerm}`);
            }
            return response.json();
        })
        .then(data => displayFruits([data])) 
        .catch(error => {
            console.error(`Error searching for ${searchTerm}:`, error);
            displayFruits([]); 
        });
}

function displayFruits(data) {
    const resultBlock = document.getElementById('resultBlock');
    resultBlock.innerHTML = '';

    if (data.length === 0) {
        resultBlock.innerHTML = '<p><i class="fa-solid fa-circle-info"></i> Sorry, fruit not found.</p>';
        resultBlock.style.textAlign='center';
        
        resultBlock.style.fontSize='20px';
        
        return;
    }

    data.forEach(fruit => {
        resultBlock.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card rounded-5">
                    <div class="card-body">
                        <h5 class="card-title">${fruit.name}</h5>
                        <p class="card-text">
                            <strong>Family:</strong> ${fruit.family} <br>
                            <strong>Genus:</strong> ${fruit.genus} <br>
                            <strong>Order:</strong> ${fruit.order} <br>
                            <strong>Nutritions:</strong> 
                            <ul>
                                <li>Protein: ${fruit.nutritions.protein}</li>
                                <li>Fat: ${fruit.nutritions.fat}</li>
                                <li>Carbohydrate: ${fruit.nutritions.carbohydrate}</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>`;
    });
}
