# CO₂-Footprint – Demo-Webapp (IPWA01-01)

Öffentliche, responsive Demo-Webseite zur transparenten Darstellung **fiktiver CO₂-Emissionsdaten** (100 Einträge, Deutschland). Die Tabelle ist **filterbar** (Mehrfeldsuche + Schnellsuche im Header) und **sortierbar** (klickbare Spaltenköpfe mit ▲/▼).

> Hinweis: Die Daten sind zufällig generiert und nicht real.

---

## Features

- **Tabelle mit 4 Spalten:** Unternehmen, Anlage, Land, tCO₂e (2024).
- **Suche/Filter:**
  - Schnellsuche im **Header** (Unternehmen)
  - **Mehrfeldsuche** im Sidebar-Panel (Unternehmen/Anlage/Land/Emissionen) – Echtzeitfilterung beim Tippen.
- **Sortierung:** Klick auf Spaltenüberschrift → auf-/absteigend, **Pfeile** (▲/▼) zeigen die Richtung.
- **Responsive Layout:** Flexbox-Layout; mobil stapelt sich der Inhalt, Sidebar rückt nach oben. **Sticky** Header/Sidebar für bessere Orientierung.
- **Usability & A11y:**
  - Hervorhebung des **aktiven** Menüpunktes
  - Sichtbarer **Fokusrahmen** für Tastaturnavigation
  - Pflege von `aria-expanded` beim Panel-Toggle.
- **Robustheit & Sicherheit:**
  - DOM-Prüfungen (optional chaining, Guards)
  - **Input-Cleaning**: Entfernt `< > " '` aus Eingaben (keine Code-Injektion).

---

## Projektstruktur

```
/
├─ index.html        # Struktur (Header + Suche, Sidebar, Tabelle, Footer)
├─ main.css          # Layout, Responsivität, Fokuszustände, Sticky
├─ js/
   └─ app.js         # Filter, Sortierung (▲/▼), Panel-Toggle, Cleaning

```

> In `index.html` sind die Verknüpfungen zur CSS- und JavaScript-Datei gesetzt.

---

## Technik

- **HTML5** – semantische Struktur (Header/Aside/Section/Footer)
- **CSS3** – responsives Layout, Sticky-Elemente, Fokus-Styles
- **JavaScript** – DOM-basierte Filterung, Sortierung, ARIA-Toggles, Input-Sanitizing

---

## Nutzung

1. Repo klonen oder als ZIP laden.
2. **`index.html` im Browser öffnen.** (Statische Seite – kein Build nötig.)
---

## Testing (Kurz)

- **Responsives Design:** Safari „Responsives Design-Modus“, Chrome/Firefox DevTools.
- **Funktionalität:** Sortierung in allen Spalten; Filterung einzeln/ kombiniert; leere Treffer testen.
- **A11y:** Tastaturnavigation prüfen; `aria-expanded` beim Toggle.

---

## Daten & Annahmen

- **Fiktive Daten**, via Python zufällig generiert (Sektoren + realistische Emissionsbereiche, 100 Einträge), anschließend als Excel exportiert und in die HTML-Tabelle übernommen.
- Einschränkung: String-basierte Suche; numerische Eingaben werden als Text verglichen (keine Operatoren wie `> 1 000 000`).

---

## Autor / Rechtliches

Die Website wurde im Rahmen des Moduls **IPWA01-01** von **Petra Lakatos** erstellt.
Die dargestellten Daten sind zufällig generiert und **nicht real**.

**Repository:** `https://github.com/AStarkPoetal/IPWA01-01_2025_PL`
