import { Gamepad2, Mail, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-black border-t border-slate-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">GamePromo</h3>
                <p className="text-xs text-cyan-400">Cabo Verde</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              As melhores promoções de jogos para PlayStation, Xbox, Nintendo e PC em Cabo Verde.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Plataformas</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  PlayStation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Xbox
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Nintendo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  PC
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="p-2 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all duration-200 group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all duration-200 group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all duration-200 group"
              >
                <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
            <a
              href="mailto:contato@gamepromo.cv"
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              contato@gamepromo.cv
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 GamePromo Cabo Verde. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs text-center md:text-right">
              Feito com paixão para a comunidade gamer cabo-verdiana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
