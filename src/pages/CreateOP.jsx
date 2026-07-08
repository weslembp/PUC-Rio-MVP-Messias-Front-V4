import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FeedbackMessage } from '../components/FeedbackMessage';

export function CreateOP() {
  const navigate = useNavigate();
  const [veiculos, setVeiculos] = useState([]);
  const [selectedVeiculoId, setSelectedVeiculoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch('http://localhost:5000/mockaroo/veiculos')
      .then(res => {
        if (!res.ok) throw new Error('Não foi possível carregar a lista de veículos.');
        return res.json();
      })
      .then(data => {
        const list = data && data.veiculos ? data.veiculos : (Array.isArray(data) ? data : []);
        setVeiculos(list);
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedVeiculoId) {
      setError('Por favor, selecione um veículo.');
      return;
    }

    setLoading(true);
    setError(null);
    const veiculoObj = veiculos.find(v => v.id === parseInt(selectedVeiculoId));
    if (!veiculoObj) {
      setError('Veículo inválido.');
      setLoading(false);
      return;
    }

    const payload = {
      produto_id: veiculoObj.id,
      quantidade_prevista: parseFloat(quantidade),
      veiculo: veiculoObj.Montadora || veiculoObj.veiculo,
      modelo: veiculoObj.Modelo || veiculoObj.modelo,
      facelift: `FL${veiculoObj.id}`
    };

    fetch('http://localhost:5000/ordem_producao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (!res.ok) throw new Error('Falha ao salvar Ordem de Produção no servidor.');
        return res.json();
      })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 page-entrance">
      <div>
        <h1 className="text-2xl font-bold text-messias-dark">Nova Ordem</h1>
        <p className="text-gray-500 mt-1">Crie uma nova OP selecionando a montadora e o veículo.</p>
      </div>
      
      <Card>
        <FeedbackMessage type="error" message={error} />
        <FeedbackMessage type="success" message={success ? "Ordem criada com sucesso! Redirecionando..." : null} />
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="veiculo" className="font-semibold text-gray-700">Veículo / Modelo</label>
            <select 
              id="veiculo" 
              required 
              className="glass-input p-3 w-full"
              value={selectedVeiculoId}
              onChange={(e) => setSelectedVeiculoId(e.target.value)}
              disabled={loading || success}
            >
              <option value="">Selecione na lista...</option>
              {veiculos.map(v => (
                <option key={v.id} value={v.id}>
                  {(v.Montadora || v.veiculo)} - {(v.Modelo || v.modelo)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="quantidade" className="font-semibold text-gray-700">Quantidade Planejada</label>
            <input 
              type="number" 
              id="quantidade" 
              min="1" 
              placeholder="Ex: 50" 
              required 
              className="glass-input p-3 w-full"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              disabled={loading || success}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => navigate('/')} disabled={loading || success}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={loading || success}>
              {loading ? 'Processando...' : 'Salvar Ordem'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
