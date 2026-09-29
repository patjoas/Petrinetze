# Petrinetze

Lehranwendung zum **Editieren, Simulieren und Vergleichen von Petrinetzen** sowie zu den Grundlagen des **Business Process Mining**. Algorithmen werden implementiert und visuell aufbereitet, damit man ihre Arbeitsweise nachvollziehen kann.

## Ziele

- Petrinetze grafisch editieren (Stellen, Transitionen, Kanten, Markierungen)
- Netze simulieren (Markenspiel, Erreichbarkeitsgraph)
- Netze vergleichen und Gemeinsamkeiten finden
- Entwurfsmuster erkennen (z. B. Sequenz, Nebenläufigkeit, Auswahl, Schleife, Synchronisation)
- Grundlagen des Process Mining: Event-Logs, Alpha-Algorithmus, Conformance Checking

## Stand

- `src/core/petriNet.ts`: Datenmodell für P/T-Netze und Schaltregel (mit Kapazitäten)
- `src/App.tsx`: einfaches Markenspiel für ein Beispielnetz

## Entwicklung

Voraussetzung ist [Node.js](https://nodejs.org/) ab Version 20.

```bash
npm install      # Abhängigkeiten installieren
npm run dev      # Entwicklungsserver starten (http://localhost:5173)
npm test         # Unit-Tests (Vitest)
npm run build    # Produktions-Build nach dist/
```

## Tech-Stack

React, TypeScript, Vite, Vitest

## Projektstruktur

```
src/
  core/         Modell und Algorithmen (UI-unabhängig, testbar)
  components/   React-Komponenten
docs/           Notizen und Konzepte
```

## Lizenz

MIT, siehe [LICENSE](LICENSE).
