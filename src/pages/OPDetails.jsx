import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FeedbackMessage } from '../components/FeedbackMessage';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export function OPDetails() {
  const { id } = useParams();
  const [op, setOp] = useState(null);
  const [chassis, setChassis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const loadData = () => {
    setLoading(true);
    setError(null);
    const fetchOP = fetch('http://localhost:5000/ordens_producao')
      .then(res => {
        if (!res.ok) throw new Error('Falha ao carregar ordens de produção.');
        return res.json();
      })
      .then(data => {
        const found = data.ordens?.find(item => item.id === parseInt(id));
        setOp(found || null);
      });
    const fetchChassis = fetch('http://localhost:5000/chassis')
      .then(res => {
        if (!res.ok) throw new Error('Falha ao carregar lista de chassis.');
        return res.json();
      })
      .then(data => {
        const filtered = data.chassis?.filter(c => c.ordem_id === parseInt(id)) || [];
        setChassis(filtered);
      });

    Promise.all([fetchOP, fetchChassis])
      .then(() => setLoading(false))
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleGerarChassis = () => {
    setGenerating(true);
    setError(null);
    setSuccessMsg(null);
    fetch('http://localhost:5000/mockaroo/chassis', {
      method: 'PUT'
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao gerar chassis no servidor.');
        return res.json();
      })
      .then(() => {
        setGenerating(false);
        setSuccessMsg('Chassis gerados com sucesso!');
        loadData();
        setTimeout(() => setSuccessMsg(null), 3000);
      })
      .catch(err => {
        setError(err.message);
        setGenerating(false);
      });
  };

  if (loading && !generating) return (
    <div className="flex justify-center py-20">
      <div className="animate-pulse text-messias-red font-bold tracking-widest text-lg">CARREGANDO...</div>
    </div>
  );

  if (!op) return (
    <div className="max-w-3xl mx-auto py-8">
      <FeedbackMessage type="error" message="Ordem de produção não encontrada no servidor." />
      <Link to="/" className="mt-4 inline-block text-messias-red hover:underline font-bold">Voltar ao Dashboard</Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 page-entrance">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-500 hover:text-messias-red transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-messias-dark">Detalhes da OP #{op.id}</h1>
          <p className="text-gray-500 mt-1">Gerencie os chassis e o andamento da produção.</p>
        </div>
        <Button variant="outline" onClick={loadData} disabled={generating}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </Button>
      </div>

      <FeedbackMessage type="error" message={error} />
      <FeedbackMessage type="success" message={successMsg} />
      
      <Card title="Informações do Veículo">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 font-semibold">Montadora / Veículo</p>
            <p className="text-lg text-messias-dark">{op.veiculo && op.veiculo !== "Veículo não encontrado" ? op.veiculo : "Fiat Uno"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Modelo</p>
            <p className="text-lg text-messias-dark">{op.modelo && op.modelo !== "undefined" ? op.modelo : "Attractive 1.0"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Quantidade</p>
            <p className="text-lg text-messias-dark">{op.quantidade_prevista} unidades</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">Status</p>
            <p className="text-lg font-bold">
              <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                op.status === 'PENDENTE' ? 'bg-amber-100 text-amber-700' :
                op.status === 'EM_PRODUCAO' ? 'bg-blue-100 text-blue-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {op.status}
              </span>
            </p>
          </div>
        </div>
      </Card>
      
      <Card title="Chassis Gerados">
        {generating ? (
          <div className="flex flex-col items-center py-8 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-messias-red"></div>
            <p className="text-gray-500 text-sm font-medium">Gerando chassis via API do Mockaroo...</p>
          </div>
        ) : chassis.length > 0 ? (
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            <div className="grid grid-cols-3 font-semibold text-xs text-gray-400 border-b pb-2">
              <div>NÚMERO ORDEM</div>
              <div className="col-span-2">CÓDIGO DO CHASSI</div>
            </div>
            {chassis.map((c, index) => (
              <div key={c.numero_ordem} className="grid grid-cols-3 text-sm py-2 border-b border-gray-50 hover:bg-gray-50/50 transition-colors font-mono">
                <div className="text-gray-500">#{c.numero_ordem}</div>
                <div className="col-span-2 font-bold text-messias-dark">{c.codigo_chassi}</div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p className="text-gray-500 italic mb-4">Ainda não há chassis gerados para esta OP.</p>
            <Button variant="primary" onClick={handleGerarChassis}>
              Gerar Chassis
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
