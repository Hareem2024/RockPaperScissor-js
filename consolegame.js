import readline from 'readline';
import fs from 'fs';
const rl = readline.createInterface({ //for input output
    input: process.stdin,
    output: process.stdout
});
function playGame(userChoice) {
    const choices = ['R', 'P', 'S'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    console.log(`You chose: ${userChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    if (userChoice === computerChoice) return 'Draw';
    if ((userChoice === 'R' && computerChoice === 'S') ||
        (userChoice === 'P' && computerChoice === 'R') ||
        (userChoice === 'S' && computerChoice === 'P')) {
        return 'won';
    }
    return 'lost';
}
function startInteractiveGame() {
    rl.question("Enter R for Rock, P for Paper, or S for Scissors: ", (input) => {
        const userChoice = input.toUpperCase();
        const result = playGame(userChoice);

        console.log(result === 'won' ? "You won,congratulations" :
                    result === 'lost' ? "Oops,computer won" : "It's a draw!");

        fs.appendFile('result1.txt', `${result}\n`, (error) => {
            if (error) console.error("Error writing to file:", error);
        });

        rl.question("Play again? (y/n): ", (again) => {
            if (again.toLowerCase() === 'y') startInteractiveGame();
            else {
                console.log("Thanks for playing!");
                rl.close();
            }
        });
    });
}
fs.readFile('commands.txt', 'utf8', (error, data) => {
    if (error) {
        console.error("Error:", error);
        return;
    }
    const lines = data.split('\n');
    for (let line of lines) {
        const userChoice = line.trim().toUpperCase(); 
        if (userChoice) { 
            const result = playGame(userChoice);
            console.log(result === 'won' ? "You win!" : result === 'lost' ? "Computer wins!" : "It's a tie!");
            
            fs.appendFile('result1.txt', `${result}\n`, (error) => {
                if (error) console.error("Error writing to file:", error);
            });
        }
    }
});
startInteractiveGame();