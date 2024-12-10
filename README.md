<div align="center">
  <h1 align="center">Likert-o-mat 2.0</h1>
  <p align="center">
    Eine moderne und flexible Lösung für die Erstellung und Verwaltung von Likert-Skala-basierten Umfragen.
  </p>
  <p align="center">
    <strong>Open-Source</strong> · 100% TypeScript · <strong>Next.js</strong>
  </p>
</div>

## Über das Projekt

Likert-o-mat 2.0 ist eine Open-Source-Anwendung zur Erstellung und Verwaltung von Umfragen basierend auf der Likert-Skala. Die App wurde vollständig mit [Next.js](https://nextjs.org/) und [Prisma](https://www.prisma.io/) entwickelt und bietet eine moderne, benutzerfreundliche Oberfläche für Forscher, Pädagogen und andere Fachleute. Dieses Projekt wird von [re:edu](https://reedu.de/) entwickelt und gepflegt.

## Funktionen

- 📊 Erstellung und Verwaltung von Likert-Skala-Umfragen
- 🔐 Passwortlose Authentifizierung mit Magic Links
- 💳 Integrierte PayPal-Zahlungsabwicklung
- 📧 Integriertes E-Mail-System für Benachrichtigungen
- 📈 Echtzeit-Datenanalyse und Visualisierung
- 👥 Rollenbasierte Zugriffskontrolle (RBAC)
- 💾 Robuste Datenbankunterstützung mit PostgreSQL
- 🎨 Responsive und moderne Benutzeroberfläche
- 🌐 Mehrsprachige Unterstützung
- 📱 Mobile-First Design
- 🔄 Echtzeit-Updates und Synchronisation
- 💰 Flexibles Abrechnungsmodell mit verschiedenen Zahlungsoptionen

## Verwendete Technologien

- [Next.js](https://nextjs.org/) - React Framework
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Datenbank
- [NextAuth.js](https://next-auth.js.org/) - Authentifizierung
- [Tailwind CSS](https://tailwindcss.com/) - CSS-Framework
- [TypeScript](https://www.typescriptlang.org/) - Programmiersprache
- [Chart.js](https://www.chartjs.org/) - Datenvisualisierung
- [Docker](https://www.docker.com/) - Containerisierung
- [Resend](https://resend.com/) - E-Mail-Service
- [shadcn/ui](https://ui.shadcn.com/) - UI-Komponenten
- [PayPal SDK](https://developer.paypal.com/sdk/js/) - Zahlungsabwicklung

## Authentifizierung

Likert-o-mat 2.0 verwendet eine moderne, passwortlose Authentifizierung mit Magic Links:

1. **Magic Link Anmeldung**

   - Benutzer geben ihre E-Mail-Adresse ein
   - Ein einmaliger Anmeldelink wird per E-Mail versendet
   - Sichere, passwortlose Authentifizierung durch Klick auf den Link
   - Zeitlich begrenzte Gültigkeit der Magic Links

2. **Sicherheitsmerkmale**
   - CSRF-Schutz
   - Sichere Session-Verwaltung
   - Automatische Token-Rotation
   - IP-basierte Ratenbegrenzung

## Zahlungsintegration

Die Anwendung bietet eine nahtlose Integration mit PayPal für Zahlungen und Abonnements:

### PayPal-Integration

1. **Zahlungsoptionen**

   - Einmalige Zahlungen für Premium-Funktionen
   - Wiederkehrende Abonnements
   - Flexible Preisgestaltung und Planoptionen

2. **Implementierte Funktionen**

   - PayPal Smart Buttons
   - Automatische Zahlungsbestätigungen
   - Webhook-Integration für Zahlungsereignisse
   - Abonnementverwaltung
   - Rechnungsstellung und Quittungen

3. **Sicherheit**
   - Sichere Verarbeitung von Zahlungsinformationen
   - Verschlüsselte Transaktionen
   - Compliance mit Datenschutzbestimmungen

### Einrichtung der Zahlungsumgebung

1. **PayPal-Konfiguration**

   Fügen Sie diese Umgebungsvariablen zu Ihrer `.env`-Datei hinzu:

   ```env
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   PAYPAL_WEBHOOK_ID=your-webhook-id
   ```

2. **Webhook-Einrichtung**
   ```bash
   # Webhook-URL für Produktionsumgebung
   https://ihre-domain.com/api/webhooks/paypal
   ```

## Inhaltsverzeichnis

1. [Erste Schritte](#erste-schritte)
2. [Entwicklungsumgebung einrichten](#entwicklungsumgebung-einrichten)
3. [Produktionsumgebung einrichten](#produktionsumgebung-einrichten)
4. [Beitragen](#beitragen)
5. [Lizenz](#lizenz)
6. [Kontakt](#kontakt)

## Erste Schritte

Diese Anleitung führt Sie durch die Einrichtung sowohl der Entwicklungs- als auch der Produktionsumgebung.

### Voraussetzungen

Stellen Sie sicher, dass Sie folgende Tools installiert haben:

- [Node.js](https://nodejs.org/) (Version 20.x oder höher)
- [Docker](https://www.docker.com/get-started/)
- [yarn](https://yarnpkg.com/) oder [npm](https://www.npmjs.com/)

## Entwicklungsumgebung einrichten

1. **Klonen Sie das Repository:**

   ```bash
   git clone https://github.com/reedu-reengineering-education/likert-o-mat-2.0.git
   cd likert-o-mat-2.0
   ```

2. **Installieren Sie die Abhängigkeiten:**

   ```bash
   yarn install
   ```

3. **Erstellen Sie eine `.env`-Datei:**

   ```bash
   cp .env.example .env
   ```

4. **Konfigurieren Sie die Umgebungsvariablen:**
   Bearbeiten Sie die `.env`-Datei und setzen Sie die erforderlichen Werte:

   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/likert-o-mat
   NEXTAUTH_SECRET=your-secret-key
   RESEND_API_KEY=your-resend-api-key
   PAYPAL_CLIENT_ID=your-paypal-client-id
   PAYPAL_CLIENT_SECRET=your-paypal-client-secret
   PAYPAL_WEBHOOK_ID=your-webhook-id
   ```

5. **Starten Sie die Entwicklungsdatenbank:**

   ```bash
   docker compose up -d
   ```

6. **Führen Sie die Prisma-Migrationen aus:**

   ```bash
   npx prisma migrate dev
   ```

7. **Starten Sie die Entwicklungsumgebung:**

   ```bash
   yarn dev
   ```

## Produktionsumgebung einrichten

1. **Bauen Sie die Anwendung:**

   ```bash
   yarn build
   ```

2. **Starten Sie den Produktionsserver:**

   ```bash
   yarn start
   ```

3. **Mit Docker:**

   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

## Beitragen

Wir freuen uns über Beiträge! Wenn Sie eine Verbesserung vorschlagen möchten:

1. Forken Sie das Projekt
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie den Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der `LICENSE`-Datei.

## Kontakt

re:edu GmbH - [@reedu_de](https://twitter.com/reedu_de) - kontakt@reedu.de

Projektlink: [https://github.com/reedu-reengineering-education/likert-o-mat-2.0](https://github.com/reedu-reengineering-education/likert-o-mat-2.0)
