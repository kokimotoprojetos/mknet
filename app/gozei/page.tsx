'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Trash2, 
  RefreshCw, 
  ArrowLeft, 
  AlertCircle, 
  MapPin, 
  Clock, 
  Download,
  CheckCircle,
  Globe
} from 'lucide-react';
import Link from 'next/link';

interface DownloadLog {
  ip: string;
  city: string;
  region: string;
  country: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [logs, setLogs] = useState<DownloadLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isKvConnected, setIsKvConnected] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (showRefreshAnimation = false) => {
    if (showRefreshAnimation) setRefreshing(true);
    try {
      const res = await fetch('/api/get-downloads');
      const data = await res.json();
      if (data.success) {
        setLogs(data.downloads || []);
        setIsKvConnected(data.isKvConfigured);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const clearLogs = async () => {
    if (!confirm('Deseja realmente limpar todos os logs de download?')) return;
    setClearing(true);
    try {
      const res = await fetch('/api/clear-downloads', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setLogs([]);
      }
    } catch (error) {
      console.error('Erro ao limpar logs:', error);
    } finally {
      setClearing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans relative">
      {/* Background mesh glow */}
      <div className="fixed inset-0 bg-mesh pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </Link>
            <div>
              <h1 className="font-display font-black text-3xl tracking-tight uppercase">
                Painel de <span className="text-blue-500">Métricas</span>
              </h1>
              <p className="text-gray-400 text-sm">Controle de downloads e cliques do aplicativo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchStats(true)}
              disabled={loading || refreshing}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-2xl text-sm font-semibold transition-all"
            >
              <RefreshCw className={`w-4 h-4 text-blue-400 ${refreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
            <button
              onClick={clearLogs}
              disabled={loading || clearing || logs.length === 0}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-red-500/10 hover:bg-red-500/20 active:scale-95 border border-red-500/20 text-red-400 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <Trash2 className="w-4 h-4" />
              Limpar Logs
            </button>
          </div>
        </div>

        {/* Database connection status alert */}
        {!isKvConnected && (
          <div className="mb-8 p-5 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
              <div>
                <h4 className="font-bold text-amber-400 text-sm">Armazenamento em Memória (Local)</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Os cliques estão sendo salvos em memória temporária. Para não perder os dados em produção no Vercel, conecte o serviço de <strong>Storage (Vercel KV / Redis)</strong> no painel da Vercel.
                </p>
              </div>
            </div>
            <a 
              href="https://vercel.com/docs/storage/vercel-kv" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold rounded-xl transition-all"
            >
              Como Conectar
            </a>
          </div>
        )}

        {isKvConnected && (
          <div className="mb-8 p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
            <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
            <div>
              <h4 className="font-bold text-emerald-400 text-sm">Vercel KV Conectado</h4>
              <p className="text-gray-400 text-xs mt-1">
                Banco de dados Redis integrado com sucesso! Os cliques estão sendo salvos permanentemente na nuvem.
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl glass border border-white/10 flex items-center gap-5">
            <div className="p-4 bg-blue-500/10 rounded-2xl">
              <Download className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Downloads</p>
              <h3 className="font-display font-black text-4xl mt-1">{logs.length}</h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass border border-white/10 flex items-center gap-5">
            <div className="p-4 bg-purple-500/10 rounded-2xl">
              <Globe className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">IPs Únicos</p>
              <h3 className="font-display font-black text-4xl mt-1">
                {new Set(logs.map(l => l.ip)).size}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass border border-white/10 flex items-center gap-5">
            <div className="p-4 bg-amber-500/10 rounded-2xl">
              <MapPin className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cidades Atendidas</p>
              <h3 className="font-display font-black text-4xl mt-1">
                {new Set(logs.map(l => l.city).filter(c => c !== 'Localhost' && c !== 'Desconhecido')).size || (logs.length > 0 ? 1 : 0)}
              </h3>
            </div>
          </div>
        </div>

        {/* Main Logs Table / Section */}
        <div className="p-8 rounded-3xl glass border border-white/10 overflow-hidden">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-500" /> Histórico de CLIQUES
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-gray-400 text-sm">Carregando estatísticas...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-20">
              <Download className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Nenhum clique de download registrado ainda.</p>
              <p className="text-gray-600 text-xs mt-1">Os cliques aparecerão aqui em tempo real à medida que os usuários baixarem o APK.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 text-xs uppercase font-bold">
                    <th className="py-4 px-4">Horário</th>
                    <th className="py-4 px-4">Localização (Cidade/Estado)</th>
                    <th className="py-4 px-4">Endereço IP</th>
                    <th className="py-4 px-4 text-right">País</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                  {logs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono text-xs flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-amber-500/80" />
                          {log.city === 'Localhost' ? 'Localhost (Desenvolvimento)' : `${log.city}${log.region ? `, ${log.region}` : ''}`}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">
                        {log.ip}
                      </td>
                      <td className="py-4 px-4 text-right font-bold text-gray-400">
                        {log.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
