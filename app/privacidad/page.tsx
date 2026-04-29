export default function PrivacidadPage() {
    return (
        <main className="min-h-screen bg-white text-gray-800 px-6 py-12 md:px-24">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <h1 className="text-4xl font-bold mb-2">
                    Aviso de Privacidad
                </h1>

                <p className="text-sm text-gray-500 mb-10">
                    BR TECH SJR — Última actualización: 29/04/2026
                </p>

                {/* CONTENT */}
                <div className="space-y-6 leading-relaxed text-base">

                    <p>
                        En BR TECH SJR nos comprometemos con la protección de tus datos personales.
                        Este Aviso de Privacidad explica cómo recopilamos, usamos y protegemos tu información.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">1. Responsable</h2>
                    <p>
                        BR TECH SJR es responsable del tratamiento de los datos personales que se recolectan
                        a través de nuestros sistemas digitales.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">2. Datos que recopilamos</h2>
                    <p>
                        Podemos recopilar nombre, correo electrónico, datos de contacto e información técnica
                        relacionada con el uso del sistema.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">3. Uso de la información</h2>
                    <p>
                        Utilizamos los datos para mejorar servicios, soporte técnico, seguridad y experiencia de usuario.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">4. Protección</h2>
                    <p>
                        Aplicamos medidas técnicas y organizativas para proteger tu información contra accesos no autorizados.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">5. Cambios</h2>
                    <p>
                        Podemos actualizar este aviso en cualquier momento. Los cambios se publicarán en esta misma página.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">6. Contacto</h2>
                    <p>
                        Si tienes dudas, puedes contactarnos a través de nuestros canales oficiales.
                    </p>

                </div>
            </div>
        </main>
    );
}