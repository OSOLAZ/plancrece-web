import { ChatWidget } from './components/ChatWidget';
import { useState, FormEvent, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: '',
    stage: '',
    needs: '',
    contact: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqaojqbz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          idea: '',
          stage: '',
          needs: '',
          contact: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close any open modals or dropdowns
      }
    };
    window.addEventListener('keydown', handleEsc as any);
    return () => window.removeEventListener('keydown', handleEsc as any);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">PlanCrece</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Valida tu idea de negocio con expertos reales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            ObtÃ©n feedback profesional sobre tu modelo de negocio, mercado y estrategia de crecimiento
          </p>
        </div>

        {/* Form Section */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="px-8 py-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {submitted ? 'Â¡Gracias por tu interÃ©s!' : 'CuÃ©ntanos sobre tu idea'}
              </h3>
              <p className="mt-2 text-gray-600">
                {submitted
                  ? 'Nos pondremos en contacto contigo pronto para una sesiÃ³n gratuita de 30 minutos.'
                  : 'Completa este formulario y te contactaremos para una sesiÃ³n gratuita de 30 minutos.'}
              </p>
            </div>

            {submitted ? (
              <div className="px-8 pb-8">
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                  Enviar otra respuesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-8 pb-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
                      Describe tu idea de negocio
                    </label>
                    <textarea
                      name="idea"
                      id="idea"
                      rows={4}
                      required
                      value={formData.idea}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700">
                      Â En quÃ© etapa estÃ¡s?
                    </label>
                    <select
                      name="stage"
                      id="stage"
                      required
                      value={formData.stage}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Selecciona una opciÃ³n</option>
                      <option value="idea">Solo tengo la idea</option>
                      <option value="prototype">Tengo un prototipo</option>
                      <option value="mvp">Tengo un MVP</option>
                      <option value="launched">Ya estÃ¡ lanzado</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="needs" className="block text-sm font-medium text-gray-700">
                      Â QuÃ© necesitas mÃ¡s?
                    </label>
                    <select
                      name="needs"
                      id="needs"
                      required
                      value={formData.needs}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Selecciona una opciÃ³n</option>
                      <option value="validation">ValidaciÃ³n de mercado</option>
                      <option value="strategy">Estrategia de crecimiento</option>
                      <option value="funding">BÃºsqueda de financiamiento</option>
                      <option value="team">ConstrucciÃ³n de equipo</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                      Â Prefieres que te contactemos por?
                    </label>
                    <select
                      name="contact"
                      id="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Selecciona una opciÃ³n</option>
                      <option value="email">Email</option>
                      <option value="phone">TelÃ©fono</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar formulario'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* ChatWidget */}
      <ChatWidget />
    </div>
  );
}

export default App;