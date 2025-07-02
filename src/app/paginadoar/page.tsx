'use client';

import * as React from "react";
import { useState, useRef } from "react";   
export default function PaginaDoarPage() {

const [tipoDoacao, setTipoDoacao] = useState('');
const [fromDados, setfromDados] = useState('');
  const handleSubmit = (data: any) => {
    console.log("Dados enviados:", data);
  };
    const renderFormulario = () => {
    switch (tipoDoacao) {
      case 'Roupa':  

       
        return (   
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Formulário para Doação de Roupas</h3>
         
          </div>
        );
      case 'Alimento': 
        return (
          <div className="mt-6">  
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Formulário para Doação de Alimentos</h3>
         
          </div>
        );
      case 'Outro':
        return (
            <div className="mt-6">  
            <h3 className="text-xl font-semibold text-blue-700 mb-4"> Formulário para Outros Tipos de Doação</h3>
          
          </div>
        );
      default:
        return null;
    }
  };


  return (
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen text-center">
      <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-xl bg-white relative">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-10 tracking-tight">
          Escolha o Tipo de Doação
        </h2> 

        <div className="mb-8 flex justify-center">
         
        </div>

        {renderFormulario()}
      </div>
    </section>
  );
}
