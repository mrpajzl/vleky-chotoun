export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Kontakt</h3>
            <p>Areál: 721 115 584</p>
            <p>Email: info@vlekychotoun.cz</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Půjčovna & Servis</h3>
            <p>Tel: 725 922 005</p>
            <p>Email: pujcovna@vlekychotoun.cz</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Škola lyžování</h3>
            <p>Tel: 721 230 700 (9-17 hod.)</p>
            <p>Email: skolach@volny.cz</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vleky Chotouň. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
