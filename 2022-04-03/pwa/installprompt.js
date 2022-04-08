let defferedPrompt;
const addbtn = document.querySelector('.btn');

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    defferedPrompt = event
    addbtn.style.display = 'block';
});

addbtn.addEventListener('click', event => {

    document.querySelector(".info").innerHTML+= "click !!!<br>"

    if (defferedPrompt) {
        // hide our user interface that shows our A2HS button
        addbtn.style.display = 'none';

        defferedPrompt.prompt();

        defferedPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') {
                console.log('user accepted the prompt')
            }
            defferedPrompt = null;
        })

        document.querySelector(".info").innerHTML+= "can install<br>"

    } else {
        // Prompt not available: Display fallback instructions
    }
})
