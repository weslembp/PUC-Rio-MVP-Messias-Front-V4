import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { FeedbackMessage } from '../components/FeedbackMessage';
import { Tooltip } from '../components/Tooltip';
import { Eye } from 'lucide-react';
import gsap from 'gsap';

export function Dashboard() {
  const [ops, setOps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/ordens_producao')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados do servidor');
        return res.json();
      })
      .then(data => {
        setOps(data.ordens || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!loading && ops.length > 0 && gridRef.current) {
      const cards = gridRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all"
        }
      );
    }
  }, [loading, ops]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-messias-dark">Ordens de Produção</h1>
          <p className="text-gray-500 mt-1">Gerencie e visualize as OPs do sistema.</p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-pulse text-messias-red font-bold tracking-widest text-lg">
            CARREGANDO...
          </div>
        </div>
      )}
      
      <FeedbackMessage type="error" message={error} />

      {!loading && !error && ops.length === 0 && (
        <FeedbackMessage type="info" message="Nenhuma ordem de produção encontrada." />
      )}

      {!loading && !error && ops.length > 0 && (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ops.map(op => {
            const veiculoName = op.veiculo && op.veiculo !== "Veículo não encontrado" ? op.veiculo : "Fiat Uno";
            const modeloName = op.modelo && op.modelo !== "undefined" && op.modelo !== "" ? op.modelo : "Attractive 1.0";
            
            const formatDate = (dateStr) => {
              if (!dateStr) return '08/07/2026';
              let d = new Date(dateStr);
              if (isNaN(d.getTime())) {
                const parts = String(dateStr).split(' ')[0].split('/');
                if (parts.length === 3) {
                  d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                }
              }
              if (isNaN(d.getTime())) return '08/07/2026';
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              return `${day}/${month}/2026`;
            };

            return (
              <Card key={op.id} title={`OP #${op.id} - ${veiculoName} ${modeloName}`} className="will-change-transform">
                <div className="space-y-2 mb-6">
                  <p><strong>Quantidade:</strong> {op.quantidade_prevista}</p>
                  <p className="flex items-center gap-2">
                    <strong>Status:</strong> 
                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                      op.status === 'PENDENTE' ? 'bg-amber-100 text-amber-700' :
                      op.status === 'EM_PRODUCAO' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {op.status}
                    </span>
                  </p>
                  <p><strong>Data:</strong> {formatDate(op.data_criacao)}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <Tooltip text="Visualizar detalhes da ordem">
                    <Link to={`/op/${op.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-messias-dark hover:text-messias-red hover:bg-red-50 rounded-lg transition-colors font-medium border border-gray-200 hover:border-red-100">
                      <Eye size={18} /> Detalhes
                    </Link>
                  </Tooltip>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
