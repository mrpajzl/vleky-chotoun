"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Kontakt
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Máte dotaz? Ozvěte se nám! Rádi vám pomůžeme s plánováním vaší návštěvy.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Areál */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-6 text-center">AREÁL INFO</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Telefon:</p>
                <a href="tel:+420721115584" className="text-blue-600 hover:underline">
                  721 115 584
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">E-mail:</p>
                <a href="mailto:info@vlekychotoun.cz" className="text-blue-600 hover:underline break-all">
                  info@vlekychotoun.cz
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Půjčovna */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-indigo-500">
          <h2 className="text-2xl font-bold mb-6 text-center">PŮJČOVNA & SERVIS</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Telefon:</p>
                <a href="tel:+420725922005" className="text-indigo-600 hover:underline">
                  725 922 005
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">E-mail:</p>
                <a href="mailto:pujcovna@vlekychotoun.cz" className="text-indigo-600 hover:underline break-all">
                  pujcovna@vlekychotoun.cz
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Škola */}
        <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold mb-6 text-center">ŠKOLA LYŽOVÁNÍ</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">Telefon:</p>
                <a href="tel:+420721230700" className="text-green-600 hover:underline">
                  721 230 700
                </a>
                <p className="text-sm text-gray-500">(9 - 17 hod.)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold">E-mail:</p>
                <a href="mailto:skolach@volny.cz" className="text-green-600 hover:underline break-all">
                  skolach@volny.cz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="max-w-2xl mx-auto bg-blue-50 border-l-4 border-blue-500 p-8 rounded mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold">Provozní doba</h2>
        </div>
        <div className="space-y-2 text-lg">
          <p><span className="font-semibold">Všední dny:</span> 9:00 - 21:00</p>
          <p><span className="font-semibold">Víkendy (so+ne):</span> 8:00 - 21:00</p>
          <p className="text-sm text-gray-600 mt-4">
            * Provozní doba se může měnit podle aktuálních podmínek. Aktuální informace najdete na hlavní stránce.
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold">Jak k nám</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2569.4427777777777!2d16.0!3d50.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDAwJzAwLjAiTiAxNsKwMDAnMDAuMCJF!5e0!3m2!1scs!2scz!4v1234567890123!5m2!1scs!2scz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2">Vleky Chotouň</h3>
            <p className="text-gray-700 mb-4">
              Lyžařský areál Chotouň se nachází v malebné krajině s výbornou dostupností.
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">
                💡 <strong>Tip:</strong> Sledujte naše webkamery před návštěvou, 
                abyste viděli aktuální podmínky a obsazenost areálu!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
