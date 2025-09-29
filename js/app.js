document.addEventListener("DOMContentLoaded", () => {
  // ---- Panelek és linkek (toggle) ----
  const filterPanel   = document.getElementById("filterPanel"); // ← új ID
  const linkFilter    = document.getElementById("link-filter");

  function toggle(panelEl, linkEl) {
    const willShow = panelEl.hidden;
    panelEl.hidden = !willShow;
    linkEl.setAttribute("aria-expanded", String(willShow));
    linkEl.classList.toggle("is-active", willShow);
  }

  linkFilter?.addEventListener("click", (e) => {
    e.preventDefault();
    toggle(filterPanel, linkFilter);
  });

  // ---- Keresés (4 mező, együttes szűrés) ----
  const companyInput      = document.querySelector('#filterPanel input[name="company"]');
  const installationInput = document.querySelector('#filterPanel input[name="installation"]');
  const countryInput      = document.querySelector('#filterPanel input[name="country"]');
  const emissionsInput    = document.querySelector('#filterPanel input[name="emissions"]');

  const table  = document.querySelector("table");
  const tbody  = table?.querySelector("tbody");
  const headers= table?.querySelectorAll("th");

  const clean = s => (s || "").replace(/[<>"']/g, "");

  function filterRows() {
    if (!tbody) return;
    const qCompany = clean(companyInput?.value).trim().toLowerCase();
    const qInst    = clean(installationInput?.value).trim().toLowerCase();
    const qCountry = clean(countryInput?.value).trim().toLowerCase();
    const qEmiss   = clean(emissionsInput?.value).trim().toLowerCase();

    tbody.querySelectorAll("tr").forEach(row => {
      const c = row.children;
      const company   = c[0].textContent.toLowerCase();
      const inst      = c[1].textContent.toLowerCase();
      const country   = c[2].textContent.toLowerCase();
      const emissions = c[3].textContent.toLowerCase();

      const ok =
        (!qCompany || company.includes(qCompany)) &&
        (!qInst    || inst.includes(qInst)) &&
        (!qCountry || country.includes(qCountry)) &&
        (!qEmiss   || emissions.includes(qEmiss));

      row.style.display = ok ? "" : "none";
    });
  }

  [companyInput, installationInput, countryInput, emissionsInput].forEach(inp => {
    inp?.addEventListener("input", filterRows);
  });

  // ---- Rendezés nyilakkal ----
  let sortColumnIndex = null;
  let sortAsc = true;

  function attachSorting() {
    if (!headers || !tbody) return;
    headers.forEach((header, index) => {
      header.style.cursor = "pointer";
      header.addEventListener("click", () => {
        const rows = Array.from(tbody.querySelectorAll("tr"))
          .filter(r => r.style.display !== "none");

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

        // nyíl frissítése (előbb töröljük a régit)
        headers.forEach(h => h.textContent = h.textContent.replace(/ ▲| ▼/g, ""));
        header.textContent += sortAsc ? " ▲" : " ▼";
      });
    });
  }

  attachSorting();
});
