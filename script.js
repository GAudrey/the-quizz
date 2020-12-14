const main = document.body.querySelector('main');

fetch('https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple')
.then(response => response.json())
.then(quizz => {
    for(let elem of quizz.results){
        let section = document.createElement('section')
        main.appendChild(section)

        let category = document.createElement('span')
        section.appendChild(category)
        category.textContent = elem.category

        let type = document.createElement('span')
        section.appendChild(type)
        type.textContent = elem.type

        let difficulty = document.createElement('span')
        section.appendChild(difficulty)
        difficulty.textContent = elem.difficulty

        let question = document.createElement('p')
        section.appendChild(question)
        question.textContent = elem.question

        let div = document.createElement('div')
        section.appendChild(div)

        let goodAnswer = elem.correct_answer
        let answers = elem.incorrect_answers
        answers.push(goodAnswer)
        console.log(answers)

        for (let choice of answers){
            let i = 0;
            i++;

            let divInput = document.createElement('div')
            div.appendChild(divInput)
            let answersInput = document.createElement('input')
            divInput.appendChild(answersInput)
            answersInput.type = 'radio'
            answersInput.id = choice
            answersInput.value = choice
            answersInput.name = answers +1
            let answersLabel = document.createElement('label')
            divInput.appendChild(answersLabel)
            answersLabel.for = choice
            answersLabel.textContent = choice

            answersInput.addEventListener('change', () =>{
                // let allInput = document.querySelectorAll('input')
                if (answersLabel.textContent == elem.correct_answer){
                    answersLabel.style.backgroundColor = 'green'
                }
                else {
                    answersLabel.style.backgroundColor = 'red'
                }
            })
        }
    }

})
.catch(error => {
    console.log('There was an error!', error);
});