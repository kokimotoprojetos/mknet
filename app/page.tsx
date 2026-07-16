'use client';

import { motion } from 'motion/react';
import { 
  Download, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Smartphone, 
  ChevronRight, 
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { User, Lock } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-blue-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-mesh pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden border border-blue-400/30 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Image 
                src="/logo.png" 
                alt="MK NET Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter">
              MK <span className="text-blue-500 uppercase">Net</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Recursos</a>
            <a href="#operators" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Operadoras</a>
            <a href="/Mknet.apk" download="Mknet.apk" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
              Download App
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-20 w-full glass border-b border-white/5 p-6 flex flex-col gap-4"
          >
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-300">Recursos</a>
            <a href="#operators" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-300">Operadoras</a>
            <a href="/Mknet.apk" download="Mknet.apk" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-blue-600 text-white rounded-xl text-center font-bold">
              Download App
            </a>
          </motion.div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Zap className="w-3 h-3" /> Ultra Velocidade Liberada
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                Navegue Sem <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-glow">
                  Limites no Brasil
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                A MK NET oferece a conexão mais estável e veloz para todas as operadoras: Vivo, Tim, Claro e Oi. 
                Segurança total e privacidade absoluta em qualquer lugar do país.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/Mknet.apk" 
                  download="Mknet.apk"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-600/25"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Baixar Agora
                </a>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl glass border border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] overflow-hidden">
                        <Image 
                          src={`https://picsum.photos/seed/user${i}/100/100`} 
                          alt="User" 
                          width={32} 
                          height={32}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-white">+10k Usuários</p>
                    <p className="text-gray-500 text-xs">Conectados hoje</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center w-full"
            >
              {/* Radial glow background */}
              <div className="absolute w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

              {/* Smartphone mockup */}
              <div className="relative z-10 w-full max-w-[320px] aspect-[9/16] rounded-[48px] border-[10px] border-neutral-900 bg-black shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Dynamic Island / Speaker notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-950 rounded-full z-30 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-neutral-800 rounded-full ml-auto mr-2" />
                </div>
                
                {/* Video container */}
                <div className="w-full h-full relative z-10">
                  <video 
                    src="/tutorial.mp4" 
                    controls 
                    playsInline
                    preload="metadata"
                    poster="/logo.png"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass p-4 rounded-2xl border border-white/10 shadow-xl z-20 flex items-center gap-3"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Vídeo Tutorial</p>
                  <p className="font-bold text-white text-xs">Aprenda a Conectar</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Por que escolher a MK NET?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Desenvolvida com tecnologia de ponta para garantir que você nunca fique offline.
              </p>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Zap className="w-8 h-8 text-blue-400" />,
                  title: "Ultra Velocidade",
                  desc: "Servidores otimizados para streaming 4K e jogos online sem lag."
                },
                {
                  icon: <Globe className="w-8 h-8 text-blue-400" />,
                  title: "Cobertura Nacional",
                  desc: "Conectividade garantida em todos os estados do Brasil."
                },
                {
                  icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
                  title: "Privacidade Total",
                  desc: "Criptografia de nível militar para proteger seus dados pessoais."
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="p-8 rounded-3xl glass border border-white/5 hover:border-blue-500/30 transition-all group"
                >
                  <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Operators Section */}
        <section id="operators" className="py-24 px-6 bg-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 blur-[120px] -z-10" />
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Conexão Especializada</h2>
              <p className="text-gray-400 text-lg mb-8">
                Nossa VPN foi calibrada especificamente para as redes das maiores operadoras do país, 
                garantindo que o tráfego seja priorizado e estável.
              </p>
              <ul className="space-y-4">
                {[
                  "Suporte total a todas as operadoras",
                  "Otimizado para Vivo, Tim, Claro e Oi",
                  "Bypass inteligente de franquia",
                  "IPs brasileiros de altíssima velocidade"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle2 className="text-blue-500 w-5 h-5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-6 w-full">
              <div className="p-8 rounded-3xl glass border border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(102,0,153,0.4)] relative">
                  <Image 
                    src="/vivo.webp" 
                    alt="Vivo Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <p className="font-bold">100% Compatível</p>
              </div>
              <div className="p-8 rounded-3xl glass border border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,47,108,0.4)] relative">
                  <Image 
                    src="/tim.webp" 
                    alt="Tim Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <p className="font-bold">100% Compatível</p>
              </div>
              <div className="p-8 rounded-3xl glass border border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(227,6,19,0.4)] relative">
                  <Image 
                    src="/claro.webp" 
                    alt="Claro Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <p className="font-bold">100% Compatível</p>
              </div>
              <div className="p-8 rounded-3xl glass border border-white/10 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(241,136,0,0.4)] relative">
                  <Image 
                    src="/oi.webp" 
                    alt="Oi Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <p className="font-bold">100% Compatível</p>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-32 px-6">
          <div className="max-w-5xl mx-auto glass rounded-[40px] border border-white/10 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">Pronto para voar?</h2>
              <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                Baixe o aplicativo oficial da MK NET e comece a navegar com ultra velocidade agora mesmo. 
                Disponível para Android.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a 
                  href="/Mknet.apk"
                  download="Mknet.apk"
                  className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-bold text-xl hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-2xl"
                >
                  <Smartphone className="w-6 h-6" />
                  Download Android
                </a>
                <p className="text-gray-500 text-sm italic">Versão 4.6.1 (Atualizada)</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10">
              <Image 
                src="/logo.png" 
                alt="MK NET Logo" 
                width={32} 
                height={32} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-xl">MK NET</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 MK NET VPN. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Termos</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
