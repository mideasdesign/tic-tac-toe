// Dein "fields" Array
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
function init(){
  render();
}

// Funktion render() erzeugt das Spielfeld
function render() {
  // Zugriff auf den Div-Container
  const container = document.getElementById('content');

  // Erstelle die Tabelle
  let tableHTML = '<table>';

  // Gehe durch das Array und erstelle für jedes Feld eine Zeile und Spalte
  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let content = '';
      if (fields[index] === 'circle') {
        content = 'O'; // 'O' für den Kreis
      } else if (fields[index] === 'cross') {
        content = 'X'; // 'X' für das Kreuz
      }
      tableHTML += `<td>${content}</td>`;
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // Setze den HTML-Code der Tabelle in den Container
  container.innerHTML = tableHTML;
};