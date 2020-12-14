const header = document.body.querySelector('header');
const main = document.body.querySelector('main');
let sectionScore = document.createElement('section');
let button = document.createElement('button')

fetch('https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple')
.then(response => response.json())
.then(quizz => {
    let score = 0;

    let category = document.querySelector('#category');
    header.appendChild(category);

    for(let elem of quizz.results){
        let section = document.createElement('section');
        main.appendChild(section);

        category.textContent = elem.category;

        let question = document.createElement('p');
        section.appendChild(question);
        question.textContent = elem.question;

        let div = document.createElement('div');
        section.appendChild(div);

        let goodAnswer = elem.correct_answer;
        let answers = elem.incorrect_answers;
        answers.push(goodAnswer);

        for (let choice of answers){
            let i = 0;
            i++;

            let divInput = document.createElement('div');
            div.appendChild(divInput);
            let answersInput = document.createElement('input');
            divInput.appendChild(answersInput);
            answersInput.type = 'radio';
            answersInput.id = choice;
            answersInput.value = choice;
            answersInput.name = answers +1;
            let answersLabel = document.createElement('label');
            divInput.appendChild(answersLabel);
            answersLabel.for = choice;
            answersLabel.textContent = choice;

            answersInput.addEventListener('change', () =>{
                if (answersLabel.textContent == elem.correct_answer){
                    score++;
                }
            })

            button.addEventListener('click', () =>{
                sectionScore.textContent = 'Your score is ' + score;
                answersInput.disabled = true;
            })
        }
    }

    main.appendChild(button);
    button.textContent = 'Your score';
    main.appendChild(sectionScore);
    sectionScore.id = 'score';

    // let reset = document.createElement('button')
    // main.appendChild(reset)
    // reset.textContent = 'Try again'
})

.catch(error => {
    console.log('There was an error!', error);
});