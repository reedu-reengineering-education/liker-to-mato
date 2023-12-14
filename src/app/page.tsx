export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Likert-to-Mat - Ihre Umfrage-Plattform
        </h1>
        <p className="text-lg text-gray-600">
          Einfach, präzise und effizient Feedback sammeln.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Unsere Funktionen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Feature 1 */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Anpassbare Likert-Skalen</h3>
            <p>Erstellen Sie maßgeschneiderte Umfragen für Ihre Bedürfnisse.</p>
          </div>
          {/* Feature 2 */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Multimedia-Integration</h3>
            <p>Binden Sie Bilder, Videos und mehr ein.</p>
          </div>
          {/* Feature 3 */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-semibold mb-2">Zeitgesteuerte Umfragen</h3>
            <p>Automatisieren Sie den Start und das Ende Ihrer Umfragen.</p>
          </div>
          {/* Weitere Features... */}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Was unsere Nutzer sagen</h2>
        <div className="space-y-4">
          <blockquote className="italic">
            {
              '"Ein großartiges Tool für schnelles Feedback... - Prof. Dr. Bartolomeus Tomaschiski, Universität Münster"'
            }
          </blockquote>
          <blockquote className="italic">
            {
              '"Sehr benutzerfreundlich und effizient... - Dr. Jan Wahnwirth, Universität Münster"'
            }
          </blockquote>
          {/* Weitere Testimonials... */}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Jetzt starten
        </button>
      </div>
    </div>
  );
}
