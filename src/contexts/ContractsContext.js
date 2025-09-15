// src/contexts/ContractsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ContractsContext = createContext();

export const useContracts = () => {
  const context = useContext(ContractsContext);
  if (!context) {
    throw new Error('useContracts must be used within ContractsProvider');
  }
  return context;
};

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    risk: 'All'
  });

  const fetchContracts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/contracts.json');
      if (!response.ok) throw new Error('Failed to fetch contracts');
      const data = await response.json();
      setContracts(data.contracts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getContractById = (id) => {
    return contracts.find(contract => contract.id === id);
  };

  const getFilteredContracts = () => {
    return contracts.filter(contract => {
      const matchesSearch = contract.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           contract.parties.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'All' || contract.status === filters.status;
      const matchesRisk = filters.risk === 'All' || contract.risk === filters.risk;
      
      return matchesSearch && matchesStatus && matchesRisk;
    });
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const value = {
    contracts,
    loading,
    error,
    filters,
    setFilters,
    fetchContracts,
    getContractById,
    getFilteredContracts
  };

  return (
    <ContractsContext.Provider value={value}>
      {children}
    </ContractsContext.Provider>
  );
};
