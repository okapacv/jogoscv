import { useState } from 'react';
import { HelpCircle, ChevronDown, Mail, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funcionam as promoções no GamePromo?',
      answer: 'Agregamos as melhores promoções de jogos das principais plataformas digitais. Atualizamos diariamente nosso catálogo com ofertas verificadas para PlayStation, Xbox, Nintendo e PC. Você pode navegar, comparar preços e ser redirecionado diretamente para a loja oficial para efetuar a compra.',
    },
    {
      question: 'As compras são feitas no site?',
      answer: 'Não, o GamePromo é um agregador de promoções. Quando você clica em "Comprar", é redirecionado para a loja oficial do jogo (PlayStation Store, Xbox Store, Nintendo eShop, Steam, etc.). Todas as transações são realizadas diretamente nas plataformas oficiais.',
    },
    {
      question: 'Como funciona o sistema de favoritos?',
      answer: 'Ao criar uma conta, você pode marcar jogos como favoritos e receber alertas quando houver novas promoções. Basta clicar no ícone de coração nos jogos que te interessam.',
    },
    {
      question: 'As promoções são válidas em Cabo Verde?',
      answer: 'Sim! Todas as promoções exibidas são válidas para usuários em Cabo Verde. No entanto, é importante verificar se sua conta nas plataformas oficiais está configurada para a região correta.',
    },
    {
      question: 'Como posso criar uma conta?',
      answer: 'Clique no botão "Entrar" no canto superior direito e selecione "Criar Conta". Você precisará apenas de um email válido e uma senha. Com uma conta, você pode salvar favoritos, deixar avaliações e receber alertas de promoções.',
    },
    {
      question: 'Os preços mostrados incluem impostos?',
      answer: 'Os preços exibidos são os mesmos apresentados nas lojas oficiais. Dependendo da plataforma e da região, podem ou não incluir impostos. Sempre verifique o preço final na loja oficial antes de concluir a compra.',
    },
    {
      question: 'Com que frequência as promoções são atualizadas?',
      answer: 'Nosso sistema verifica e atualiza as promoções diariamente. Algumas ofertas especiais e lançamentos são adicionados em tempo real. Ative as notificações para não perder nenhuma oferta!',
    },
    {
      question: 'Posso sugerir jogos ou reportar erros?',
      answer: 'Sim! Entre em contato conosco através do email contato@gamepromo.cv ou pelas nossas redes sociais. Valorizamos muito o feedback da comunidade cabo-verdiana.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-2xl">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Perguntas Frequentes
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Tire suas dúvidas sobre o GamePromo Cabo Verde
        </p>
      </div>

      <div className="space-y-4 mb-12">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all duration-200 hover:border-cyan-500"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="text-white font-semibold pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-cyan-400 transition-transform duration-200 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 animate-fadeIn">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-500/20 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Email</h3>
              <p className="text-gray-400 text-sm">Envie-nos um email</p>
            </div>
          </div>
          <a
            href="mailto:contato@gamepromo.cv"
            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            contato@gamepromo.cv
          </a>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-500/20 p-3 rounded-lg">
              <MessageCircle className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Redes Sociais</h3>
              <p className="text-gray-400 text-sm">Siga-nos e fale conosco</p>
            </div>
          </div>
          <p className="text-gray-300">
            Facebook • Instagram • YouTube
          </p>
        </div>
      </div>
    </div>
  );
}
