'use client'

import React from 'react';
import { SiInstagram, SiX, SiWhatsapp, SiFacebook, SiTelegram } from 'react-icons/si';
import { MdContentCopy } from 'react-icons/md';
import { Button } from './ui/button';

interface ShareButtonProps {
  url: string;
  title: string;
  type: 'artigo' | 'tribuna' | 'evento' | 'texto';
}

const getShareText = (type: ShareButtonProps['type'], title: string) => {
  switch (type) {
    case 'artigo':
      return `Novo artigo no Coletivo Ruptura: ${title}`;
    case 'tribuna':
      return `Nova tribuna pública no Coletivo Ruptura: ${title}`;
    case 'evento':
      return `Novo evento do Coletivo Ruptura: ${title}`;
    case 'texto':
      return `Novo texto na biblioteca do Coletivo Ruptura: ${title}`;
    default:
      return title;
  }
};

export const ShareButton: React.FC<ShareButtonProps> = ({ url, title, type }) => {
  const shareText = getShareText(type, title);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copiado!');
    } catch (error) {
      console.error('Falha ao copiar o link:', error);
      alert('Não foi possível copiar o link.');
    }
  };
  
  const handleInstagramShare = async () => {
    // A API de Partilha Web é a melhor opção para partilha em mobile, incluindo para os Stories do Instagram
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: url,
        });
      } catch (error) {
        console.error('Erro ao partilhar:', error);
      }
    } else {
      // Fallback para browsers de desktop
      alert('A partilha direta para o Instagram não é suportada no computador. Por favor, copie o link e partilhe manualmente.');
      handleCopy();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Instagram */}
      <Button size="icon" variant="ghost" title="Partilhar no Instagram" onClick={handleInstagramShare} type="button">
        <SiInstagram className="w-4 h-4" />
      </Button>
      {/* Twitter/X */}
      <Button asChild size="icon" variant="ghost" title="Partilhar no Twitter/X">
        <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <SiX className="w-4 h-4" />
        </a>
      </Button>
      {/* WhatsApp */}
      <Button asChild size="icon" variant="ghost" title="Partilhar no WhatsApp">
        <a href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <SiWhatsapp className="w-4 h-4" />
        </a>
      </Button>
      {/* Facebook */}
      <Button asChild size="icon" variant="ghost" title="Partilhar no Facebook">
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
          <SiFacebook className="w-4 h-4" />
        </a>
      </Button>
      {/* Telegram */}
      <Button asChild size="icon" variant="ghost" title="Partilhar no Telegram">
        <a href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`} target="_blank" rel="noopener noreferrer">
          <SiTelegram className="w-4 h-4" />
        </a>
      </Button>
      {/* Copiar Link */}
      <Button size="icon" variant="ghost" title="Copiar link" onClick={handleCopy} type="button">
        <MdContentCopy className="w-4 h-4" />
      </Button>
    </div>
  );
}; 