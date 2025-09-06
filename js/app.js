document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector('input[name="Suche"]');
  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  const headers = table.querySelectorAll("th");
  let sortColumnIndex = null; // nyíl követéséhez
  let sortAsc = true;

  // 🔍 Kereső
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    tbody.querySelectorAll("tr").forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  });

  // 📊 Rendezés nyilakkal
  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const rows = Array.from(tbody.querySelectorAll("tr")).filter(r => r.style.display !== "none");

      // Sorrend váltás
      if (sortColumnIndex === index) {
        sortAsc = !sortAsc;
      } else {
        sortAsc = true;
        sortColumnIndex = index;
      }

      // Rendezés
      rows.sort((a, b) => {
        const aText = a.children[index].textContent.trim();
        const bText = b.children[index].textContent.trim();
        const aVal = isNaN(aText) ? aText.toLowerCase() : parseFloat(aText);
        const bVal = isNaN(bText) ? bText.toLowerCase() : parseFloat(bText);
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ? 1 : -1;
        return 0;
      });

      // Újrarajzolás
      rows.forEach(row => tbody.appendChild(row));

      // Nyíl frissítése
      headers.forEach(h => h.textContent = h.textContent.replace(/ ▲| ▼/g, ""));
      header.textContent += sortAsc ? " ▲" : " ▼";
    });
  });
});
