import fs from 'fs';

class InputOutput {
    constructor(this) {
        this.commands = [];
    }

    readCommands(filePath) {
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                console.error("Error:", error);
                return;
            }
            const lines = data.split('\n');
            for (let line of lines) {
                const command = line.trim().toUpperCase(); 
                this.commands.push(command)
            }
        });
    }

    write(data, filePath) {
        fs.appendFile(filePath, `${data}\n`, (error) => {
                if (error) console.error("Error writing to file:", error);
        });
    }
}

class Game {
    constructor(this) {
        this.inputOutput = new InputOutput()
    }

    evaluate(userChoice) {
        const choices = ['R', 'P', 'S'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        console.log(`You chose: ${userChoice}`);
        console.log(`Computer chose: ${computerChoice}`);
        if (userChoice === computerChoice) return 'draw';
        if ((userChoice === 'R' && computerChoice === 'S') ||
            (userChoice === 'P' && computerChoice === 'R') ||
            (userChoice === 'S' && computerChoice === 'P')) {
            return 'won';
        }
        return 'lost';
    }

    run () {
        this.inputOutput.readCommands('commands.txt')
        let commands = this.inputOutput.commands;
        for (let i = 0; i < commands.length(); i ++) {
            let command = commands[i]
            this.inputOutput.write(this.evaluate(command), 'results1.txt')
        }
    }
}

function main() {
    g = Game()
    g.run()
}
