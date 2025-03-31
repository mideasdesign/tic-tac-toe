let fields = [
  null,    // 0
  'circle',// 1
  'circle',// 2
  null,    // 3
  'cross', // 4
  null,    // 5
  null,    // 6
  null,    // 7
  null     // 8
];

let currentPlayer = 'circle'; // Startspieler

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
  if (fields[index] === null) {
    fields[index] = currentPlayer; // Setzt das aktuelle Symbol ins Array
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG(); // Fügt SVG ein
    cell.onclick = null; // Entfernt das onclick-Event
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechselt den Spieler
  }
}

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
document.getElementById("content").innerHTML = generateCircleSVG();

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
}
document.getElementById("content").innerHTML = generateCrossSVG();