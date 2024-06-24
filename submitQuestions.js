
document.addEventListener('DOMContentLoaded', async () => {
    const categorySelect = document.getElementById('category');
    try {
        const res = await fetch('http://localhost:3000/get_categories/getCategories');
        const categories = await res.json();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.category;
            option.textContent = category.category;
            categorySelect.appendChild(option);
        });
    } catch (err) {
        console.error("error", err);
    }

    document.getElementById('getBtn').addEventListener('click', async () => {
        const category = categorySelect.value;
        const difficulty = document.getElementById('difficulty').value;
        try {
            const response = await fetch( `http://localhost:3000/get_questions/getQuestions?difficultyLevel=${difficulty}&category=${category}`);
            const questions = await response.json();
            const allQuestions = document.getElementById('allQuestions');
            allQuestions.innerHTML = questions.map((question, index) => `
                <div class="mb-4">
                    <h3 class="font-semibold text-lg">Q.${index + 1}   ${question.que}</h3>
                    <form id="form-${index}" class="mt-2">
                        ${question.options.map((option, i) => `
                            <div class="flex items-center">
                                <input type="checkbox" id="option${index}" name="option" value="${option}" class="mr-2">
                                <label for="option${index}" class="select-none">${option}</label>
                            </div>
                        `).join('')}
                        <button type="button" class="mt-2 bg-[#ffa60075] text-white px-4 py-2 rounded">Submit Answer</button>
                        
                    </form>
                </div>
            `).join('');
        } catch (err) {
            console.error('error', err);
        }
    });

});





