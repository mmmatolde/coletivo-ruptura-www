"use client"

import type React from "react"

import { useState } from "react"
import { AtSign, Mail, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"
import { SiFacebook, SiX, SiInstagram } from "react-icons/si"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    contactReason: "general",
    subscribe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send the form data to your server
    console.log(formState)
    toast({
      title: "Mensagem enviada",
      description: "Obrigado por contactar o Coletivo Ruptura. Responderemos o mais brevemente possível.",
    })
    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
      contactReason: "general",
      subscribe: false,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, contactReason: value }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-500 py-16 text-white md:py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Contacto</h1>
            <p className="mt-6 text-xl font-medium">Entra em contacto com o Coletivo Ruptura</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-gray-900">Informação de Contacto</h2>
                <p className="mt-2 text-gray-600">
                  Podes contactar-nos através do formulário ou utilizando os seguintes meios:
                </p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-gray-600">coletivoruptura1917@gmail.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <SiFacebook className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Facebook</h3>
                      <a href="https://www.facebook.com/rupturacoletivo/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600">facebook.com/rupturacoletivo</a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <SiX className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">X (antigo Twitter)</h3>
                      <a href="https://x.com/coletivoruptura" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600">x.com/coletivoruptura</a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <SiInstagram className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Instagram</h3>
                      <a href="https://www.instagram.com/coletivo_ruptura/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600">instagram.com/coletivo_ruptura</a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                      {/* Ícone do Telegram */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.93 7.36l-1.89 8.944c-.143.64-.52.797-1.053.497l-2.91-2.146-1.404 1.352c-.155.155-.285.285-.583.285l.21-2.98 5.423-4.9c.236-.21-.052-.327-.366-.117l-6.71 4.22-2.89-.902c-.627-.195-.64-.627.13-.927l11.29-4.36c.52-.195.973.127.81.92z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Telegram</h3>
                      <a href="https://t.me/rupturacoletivo" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600">@rupturacoletivo</a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Envia-nos uma Mensagem</CardTitle>
                  <CardDescription>Preenche o formulário e responderemos o mais brevemente possível.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="O teu nome"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="coletivoruptura1917@gmail.com"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="contactReason">Motivo de Contacto</Label>
                        <RadioGroup
                          value={formState.contactReason}
                          onValueChange={handleRadioChange}
                          className="grid grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="general" />
                            <Label htmlFor="general">Informação Geral</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="join" id="join" />
                            <Label htmlFor="join">Juntar-se ao Coletivo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="activity" id="activity" />
                            <Label htmlFor="activity">Propor Atividade</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Outro</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          placeholder="Assunto da tua mensagem"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="message">Mensagem</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          placeholder="Escreve a tua mensagem aqui..."
                          rows={5}
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                      <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-gray-900">Subscreve o Nosso Boletim</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Recebe informação sobre as nossas atividades, publicações e convocatórias
            </p>
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="relative w-full max-w-md">
                <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="email" placeholder="O teu email" className="pl-10" />
              </div>
              <Button className="bg-red-600 text-white hover:bg-red-700">Subscrever</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
