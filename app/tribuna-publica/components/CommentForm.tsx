'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface CommentFormProps {
  tribuneTitle: string;
}

export function CommentForm({ tribuneTitle }: CommentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch('/api/send-comment-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, comment, tribuneTitle }),
    });

    if (res.ok) {
      toast({
        title: 'Sucesso!',
        description: 'O seu comentário foi enviado com sucesso.',
      });
      setName('');
      setEmail('');
      setComment('');
    } else {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o seu comentário. Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Deixe um Comentário Privado</h2>
      <p className="text-gray-600 mb-6">O seu comentário será enviado diretamente para a equipa do Ruptura e não será publicado publicamente.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">Nome</label>
          <Input
            id="name"
            placeholder="O seu nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="O seu email (opcional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment" className="sr-only">Comentário</label>
          <Textarea
            id="comment"
            placeholder="O seu comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={5}
          />
        </div>
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" disabled={isSubmitting}>
          {isSubmitting ? 'A Enviar...' : 'Enviar Comentário'}
        </Button>
      </form>
    </section>
  );
}
