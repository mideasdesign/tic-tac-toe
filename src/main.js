let fields = [
  null, null, null,
  null, null, null,
  null, null, null
];

let currentPlayer = 'circle'; // Startspieler
let gameOver = false; // Flag, um zu verhindern, dass nach einem Sieg weitergeklickt wird

function init() {
  render();
}

// Funktion render() erzeugt das Spielfeld
function render() {
  const container = document.getElementById('content');
  let tableHTML = '<table>';

  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let content = '';

      if (fields[index] === 'circle') {
        content = generateCircleSVG();
      } else if (fields[index] === 'cross') {
        content = generateCrossSVG();
      }

      tableHTML += `<td onclick="handleClick(${index}, this)">${content}</td>`;
    }
    tableHTML += '</tr>';
  }

  tableHTML += '</table>';
  container.innerHTML = tableHTML;
}

// Funktion für das Klicken auf ein Feld
function handleClick(index, cell) {
  if (fields[index] === null && !gameOver) {
    fields[index] = currentPlayer;
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
    cell.onclick = null;

    const winningCombination = checkWin(); // Prüft, ob jemand gewonnen hat
    if (winningCombination) {
      gameOver = true;
      drawWinningLine(winningCombination);
    } else {
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
  }
}

// Prüft, ob ein Spieler gewonnen hat
function checkWin() {
  const winningPatterns = [
    [0, 1, 2], // Horizontale Reihen
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertikale Spalten
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonalen
    [2, 4, 6]
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return pattern; // Gibt das siegreiche Muster zurück
    }
  }
  return null; // Kein Gewinn
}

function drawWinningLine(pattern) {
  const table = document.querySelector("table"); // Holt die Tabelle
  const rect = table.getBoundingClientRect(); // Holt die Position der Tabelle

  // Berechnet die Koordinaten für die Linie
  const x1 = getX(pattern[0], rect);
  const y1 = getY(pattern[0], rect);
  const x2 = getX(pattern[2], rect);
  const y2 = getY(pattern[2], rect);

  // SVG für die Linie erstellen
  const lineSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  lineSVG.setAttribute("class", "winning-line");
  lineSVG.setAttribute("width", rect.width);
  lineSVG.setAttribute("height", rect.height);
  lineSVG.style.position = "absolute";
  lineSVG.style.top = `${rect.top}px`;
  lineSVG.style.left = `${rect.left}px`;
  lineSVG.style.pointerEvents = "none"; // Damit Klicks weiter zur Tabelle durchgehen

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "white");
  line.setAttribute("stroke-width", "5");
  line.setAttribute("stroke-linecap", "round");

  lineSVG.appendChild(line);
  document.body.appendChild(lineSVG); // Füge das SVG zur Seite hinzu
}

// Berechnet die X-Position eines Spielfelds
function getX(index, rect) {
  return rect.left + (index % 3) * (rect.width / 3) + rect.width / 6;
}

// Berechnet die Y-Position eines Spielfelds
function getY(index, rect) {
  return rect.top + Math.floor(index / 3) * (rect.height / 3) + rect.height / 6;
}

// Hilfsfunktionen für die Start- und Endpunkte der Linie
function getX(index) {
  return (index % 3) * 100 + 50;
}
function getY(index) {
  return Math.floor(index / 3) * 100 + 50;
}

// SVG für den Kreis
function generateCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="30" stroke="#00B0ef" stroke-width="8" fill="none"
        stroke-dasharray="188.4" stroke-dashoffset="188.4"
        transform="scale(0.5)" transform-origin="50% 50%">
        
        <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="500ms" fill="freeze" />
        <animateTransform attributeName="transform" type="scale" from="0.5" to="1" dur="500ms" fill="freeze"/>
      </circle>
    </svg>
  `;
}

// SVG für das Kreuz
function generateCrossSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 100 100">
      <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10" stroke-linecap="round"
        stroke-dasharray="84.85" stroke-dashoffset="84.85">
        <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="400ms" fill="freeze" />
      </line>
      <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10" stroke-linecap="round"
        stroke-dasharray="84.85" stroke-dashoffset="84.85">
        <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="400ms" fill="freeze" />
      </line>
    </svg>
  `;
};
function restartGame(){
    fields = [
    null, null, null,
    null, null, null,
    null, null, null
  ];

  render();
  location.reload();
  
}