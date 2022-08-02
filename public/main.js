const myWordle = document.getElementById("words");
const Line_count = 6;
const Char_count = 5;

for (let i = 0; i < Line_count; i++) {
  const title = document.createElement("div");

  title.className = "word";

  for (let j = 0; j < Char_count; j++) {
    const title2 = document.createElement("div");
    title2.className = "char";
    title.appendChild(title2);
  }

  myWordle.appendChild(title);
}

let currentChar = 0;
let currentLine = 0;
document.addEventListener("keydown", async (event) => {
  const firstWord = myWordle.children[currentLine];

  if (event.code == "Enter") {
    if (currentChar == Char_count && currentLine < Line_count - 1) {
      const myAnswer = getcurrentLine();
      const result = await guess(myAnswer);
      colorize(result);
      console.log(result);
      currentChar = 0;
      currentLine++;
    }
  } else if (event.code == "Backspace") {
    if (currentChar > 0) {
      currentChar--;
      firstWord.children[currentChar].innerHTML = "";
    }
  } else if (currentChar < Char_count) {
    firstWord.children[currentChar].innerHTML = event.key;
    currentChar++;
  }
});

async function guess(word) {
  const request = await fetch("/guess/" + word);
  const response = await request.json();
  return response;
}
function getcurrentLine() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentLine];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}

async function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentLine].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "gray";
    }
    await animateCSS(wordDiv[i], "flipInX");
  }
}

function animateCSS(element, animation, prefix = "animate__") {
  // We create a Promise and return it
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
}
