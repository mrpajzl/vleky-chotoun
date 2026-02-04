import { Package, Clock, Phone, Mail, Ruler, Users } from "lucide-react";

export default function PujcovnaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-alpine-gradient text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/20 via-transparent to-alpine-blue/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-golden-hour/20 backdrop-blur-sm border-2 border-golden-hour/50 rounded-full px-6 py-3 mb-8">
              <Package className="w-5 h-5 text-golden-hour" />
              <span className="font-mono text-sm uppercase tracking-wider">
                Půjčovna a servis
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl mb-6">
              Půjčovna<br/>
              <span className="text-golden-hour">Vybavení</span>
            </h1>

            <p className="text-xl md:text-2xl text-snow-cream/90 mb-8">
              Zapůjčení lyžařského i snowboardového vybavení a kompletní péče o vaši výstroj - najdete nás přímo u sjezdovky.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-snow-cream/20 transform origin-bottom-left -skew-y-2"></div>
      </section>

      {/* Opening Hours */}
      <section className="container mx-auto px-4 py-12 -mt-8 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Otevírací doba</h2>
          </div>
          <div className="space-y-3 text-lg">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Všední dny:</span> 
              <span>9:00 - 18:00</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Víkend:</span> 
              <span>8:00 - 18:00</span>
            </p>
            <p className="text-sm text-gray-600 mt-4">
              * Vracet vybavení je možno do 21:00 hodin
            </p>
            <p className="text-sm text-gray-600">
              * Otevřeno denně dle provozu areálu
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-12">Co nabízíme</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Ski Equipment */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-6">Lyžařské vybavení</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Velká zásoba lyžařských kompletů</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Pro nejmenší lyžaře (boty od EU24, lyže od 70cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Pro "obry" (boty do EU49, lyže 181cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Kompletní servis a broušení</span>
              </li>
            </ul>
          </div>

          {/* Snowboard Equipment */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-6">Snowboardové vybavení</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Velká zásoba snowboardových kompletů</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Pro nejmenší (boty od EU28, SNB od 86cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Pro "obry" (boty do EU48, SNB 168cm)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                <span>Profesionální servis</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
            <Users className="w-6 h-6 text-yellow-600" />
            Důležité informace
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Neprovádíme REZERVACE</strong> - máme velkou zásobu vybavení</li>
            <li>• Vybavení zapůjčujeme až na místě</li>
            <li>• Vracení vybavení možné do 21:00</li>
            <li>• Najdete nás přímo u sjezdovky</li>
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Kontakt na půjčovnu</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-600">Telefon</p>
                <a href="tel:+420725922005" className="text-xl font-bold text-blue-600 hover:underline">
                  725 922 005
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-600">Email</p>
                <a href="mailto:pujcovna@vlekychotoun.cz" className="text-xl font-bold text-green-600 hover:underline">
                  pujcovna@vlekychotoun.cz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
