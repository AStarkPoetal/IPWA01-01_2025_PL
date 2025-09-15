document.addEventListener("DOMContentLoaded", () => {
  // --- elemek ---
  const filterPanel = document.getElementById('filter');
  const tableSection = document.getElementById('table');

  // fontos: a HTML-ben ezek a name-ek legyenek:
  const companyInput     = document.querySelector('#filter input[name="company"]');
  const installationInput= document.querySelector('#filter input[name="installation"]');
  const countryInput     = document.querySelector('#filter input[name="country"]');
  const emissionsInput   = document.querySelector('#filter input[name="emissions"]');

  const table = document.querySelector("table");
  const tbody = table.querySelector("tbody");
  const headers = table.querySelectorAll("th");

  let sortColumnIndex = null;
  let sortAsc = true;

  // --- nézetkapcsolás: csak #table esetén mutasd ---
  function updatePanels() {
    const isTable = location.hash === '#table';
    filterPanel.hidden = !isTable;
    tableSection.hidden = !isTable;
  }

// alapállapot: ha nincs hash, állítsd be, majd AZONNAL frissíts
  if (!location.hash) {
    location.hash = '#table';
  }
  updatePanels(); // <<< EZ HIÁNYZOTT

  window.addEventListener('hashchange', updatePanels);

  // --- kis sanitizáló (XSS ellen) ---
  const clean = s => s.replace(/[<>"']/g, "");

  // --- SZŰRÉS: mind a 4 mezőre egyszerre (részsztring alapú) ---
  function filterRows() {
    const qCompany   = clean(companyInput?.value || "").trim().toLowerCase();
    const qInst      = clean(installationInput?.value || "").trim().toLowerCase();
    const qCountry   = clean(countryInput?.value || "").trim().toLowerCase();
    const qEmiss     = clean(emissionsInput?.value || "").trim().toLowerCase();

    tbody.querySelectorAll("tr").forEach(row => {
      const cells = row.children;
      const company   = cells[0].textContent.toLowerCase();
      const inst      = cells[1].textContent.toLowerCase();
      const country   = cells[2].textContent.toLowerCase();
      const emissions = cells[3].textContent.toLowerCase();

      const okCompany = !qCompany || company.includes(qCompany);
      const okInst    = !qInst    || inst.includes(qInst);
      const okCountry = !qCountry || country.includes(qCountry);
      const okEmiss   = !qEmiss   || emissions.includes(qEmiss); // egyszerű részsztring

      row.style.display = (okCompany && okInst && okCountry && okEmiss) ? "" : "none";
    });
  }

  // események a mezőkhöz
  [companyInput, installationInput, countryInput, emissionsInput]
    .forEach(inp => inp && inp.addEventListener("input", filterRows));

  // --- RENDEZÉS nyilakkal ---
  headers.forEach((header, index) => {
    header.style.cursor = "pointer";
    header.addEventListener("click", () => {
      const rows = Array.from(tbody.querySelectorAll("tr"))
        .filter(r => r.style.display !== "none"); // csak a látható sorok

      if (sortColumnIndex === index) {
        sortAsc = !sortAsc;
      } else {
        sortAsc = true;
        sortColumnIndex = index;
      }

      rows.sort((a, b) => {
        const aText = a.children[index].textContent.trim();
        const bText = b.children[index].textContent.trim();
        const aVal = isNaN(aText) ? aText.toLowerCase() : parseFloat(aText);
        const bVal = isNaN(bText) ? bText.toLowerCase() : parseFloat(bText);
        if (aVal < bVal) return sortAsc ? -1 : 1;
        if (aVal > bVal) return sortAsc ?  1 : -1;
        return 0;
      });

      rows.forEach(r => tbody.appendChild(r));

      // nyilak frissítése
      headers.forEach(h => h.textContent = h.textContent.replace(/ ▲| ▼/g, ""));
      header.textContent += sortAsc ? " ▲" : " ▼";
    });
  });
});
