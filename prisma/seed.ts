import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Lösche existierende Pläne
  await prisma.plan.deleteMany();

  // Erstelle Standard-Pläne
  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfekt zum Testen und für kleine Projekte',
      features: [
        '1 Umfrage',
        '50 Antworten pro Monat',
        'Basis-Auswertungen',
        'Community Support',
        'Kostenlos starten',
      ],
    },
    {
      name: 'Professional',
      price: 29.99,
      description: 'Ideal für wachsende Unternehmen',
      features: [
        'Unbegrenzte Umfragen',
        '1000 Antworten pro Monat',
        'Erweiterte Auswertungen',
        'Prioritäts-Support',
        'Eigenes Branding',
      ],
    },
    {
      name: 'Enterprise',
      price: 99.99,
      description: 'Für große Organisationen',
      features: [
        'Unbegrenzte Umfragen',
        'Unbegrenzte Antworten',
        'Premium Auswertungen',
        '24/7 Support',
        'Eigenes Branding',
        'API Zugang',
        'SLA Garantie',
      ],
    },
  ];

  for (const plan of plans) {
    await prisma.plan.create({
      data: plan,
    });
  }

  console.log('Seed erfolgreich ausgeführt');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
