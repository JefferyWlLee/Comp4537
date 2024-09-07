const MAXHEX = 16777215;
const HEXADECIMAL = 16;
const HEX_SYMBOL = `#`; // hex symbol for color
const MAXX = window.innerWidth - 150; // Leave 150px padding on the right
const MAXY = window.innerHeight - 150; // Leave 150px padding on the bottom

class Button {
  constructor(id, order, gameInstance) {
    this.id = id; // Unique identifier for each button
    this.order = order; // The correct order of the button
    this.buttonElement = document.createElement('button'); // Create the button element
    this.gameInstance = gameInstance; // Reference to the game instance for event handling
    this.init(); // Initialize button properties
  }

  init() {
    this.buttonElement.textContent = this.order; // Set the button text to show the number
    this.buttonElement.style.backgroundColor = this.getRandomColor(); // Set random color
    this.buttonElement.style.height = '5em';
    this.buttonElement.style.width = '10em';
    this.buttonElement.style.position = 'relative'; // Initially, position is relative for inline layout
    this.buttonElement.onclick = () => this.handleClick(); // Set click handler


  }

  handleClick() {
    // Prevent clicking while scrambling
    if (this.gameInstance.isScrambling) return;

    // Check the memory order
    this.gameInstance.checkUserMemory(this);
  }

  getRandomColor() {
    return HEX_SYMBOL+ `${Math.floor(Math.random() * MAXHEX).toString(HEXADECIMAL)}`; // Generate random color
  }

  // Method to set button at a random position within the window bounds
  placeButtonAtRandom() {
    // Calculate maximum X and Y positions, subtracting button width/height and a small padding
    

    const randomX = Math.floor(Math.random() * MAXX);
    const randomY = Math.floor(Math.random() * MAXY);

    // Set button's position
    this.buttonElement.style.left = `${randomX}px`;
    this.buttonElement.style.top = `${randomY}px`;
    this.buttonElement.style.position = 'absolute'; // Use absolute positioning after scrambling
  }

  // Method to hide the number displayed on the button
  hideNumber() {
    this.buttonElement.textContent = ''; // Hide the number
  }

  // Method to show the correct number on the button (used during checking order)
  showNumber() {
    this.buttonElement.textContent = this.order; // Show the original order number
  }

  // Method to append the button to a container (e.g., button container div)
  appendToContainer(container) {
    container.appendChild(this.buttonElement); // Append the button to the container
  }
}

class ButtonGame {
  constructor(numButtons) {
    this.numButtons = numButtons;
    this.buttons = [];
    this.originalOrder = [];
    this.currentScrambles = 0;
    this.maxScrambles = numButtons;
    this.correctClicks = 0;
    this.interval = null;
    this.isScrambling = false; // Flag to track if scrambling is in progress
  }

  startGame() {
    this.clearExistingButtons();
    this.createButtons();
    this.displayButtonsInLine();
    setTimeout(() => {
      this.isScrambling = true; // Disable clicking while scrambling
      this.scrambleButtons();
    }, this.numButtons * 1000); // Pause before scrambling
  }

  clearExistingButtons() {
    const container = document.getElementById('buttonContainer');
    container.innerHTML = ''; // Clear the container
    container.classList.remove('scramble'); // Reset container class
    this.buttons = [];
    this.originalOrder = [];
    this.correctClicks = 0; // Reset clicks
    this.currentScrambles = 0; // Reset scrambles
    clearInterval(this.interval); // Clear any previous intervals
  }

  createButtons() {
    for (let i = 0; i < this.numButtons; i++) {
      // Create a new button instance and add it to the buttons array
      const button = new Button(i, i + 1, this);
      this.buttons.push(button);
      this.originalOrder.push(i + 1); // Store the correct order
    }
  }

  displayButtonsInLine() {
    const container = document.getElementById('buttonContainer');
    container.classList.remove('scramble'); // Ensure buttons are placed in a line

    this.buttons.forEach(button => button.appendToContainer(container)); // Append buttons to the container
  }

  scrambleButtons() {
    const container = document.getElementById('buttonContainer');
    container.classList.add('scramble'); // Switch to scramble mode (absolute positioning)

    this.interval = setInterval(() => {
      this.buttons.forEach(button => button.placeButtonAtRandom()); // Scramble all buttons
      this.currentScrambles++;
      if (this.currentScrambles === this.maxScrambles) {
        clearInterval(this.interval); // Stop scrambling after n times
        this.hideButtonNumbers(); // Hide button numbers after scrambling
        this.isScrambling = false; // Enable clicking after scrambling
      }
    }, 2000);
  }

  hideButtonNumbers() {
    this.buttons.forEach(button => button.hideNumber()); // Hide numbers on all buttons
  }

  checkUserMemory(button) {
    const correctOrder = this.originalOrder[this.correctClicks]; // Get correct order based on clicks
    if (button.order === correctOrder) {
      button.showNumber(); // Reveal the correct button
      this.correctClicks++;
      if (this.correctClicks === this.numButtons) {
        alert(messages.excellentMemory); // Game won
      }
    } else {
      alert(messages.wrongOrder); // Wrong order clicked
      this.revealOriginalOrder(); // Reveal correct order
    }
  }

  revealOriginalOrder() {
    this.buttons.forEach(button => button.showNumber()); // Reveal the correct order on all buttons
  }
}

// Event listener for starting the game
document.getElementById('goButton').addEventListener('click', () => {
  const numButtons = parseInt(document.getElementById('buttonNumber').value);
  
  if (numButtons < 3 || numButtons > 7) {
    alert(messages.invalidNumber); // Alert if number out of range
    return;
  }

  const game = new ButtonGame(numButtons); // Create a new game
  game.startGame(); // Start the game
});
