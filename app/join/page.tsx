"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

export default function JoinPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    birthDate: "",
    reason: "",
    interests: "",
    newsletter: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formState)
    toast({
      title: "Formulário enviado",
      description: "Obrigado pelo teu interesse em juntar-te ao Coletivo Ruptura. Entraremos em contacto em breve.",
    })
    // Reset form
    setFormState({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      birthDate: "",
      reason: "",
      interests: "",
      newsletter: true,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, newsletter: checked }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-red-600 to-red-900 py-20 text-white md:py-28">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">Junta-te ao Coletivo Ruptura</h1>
            <p className="mt-6 text-xl font-medium">
              Participa na construção de alternativas políticas e sociais para transformar a nossa realidade
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </section>

      {/* Join Content */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-900">Porquê juntar-se?</h2>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  O Coletivo Ruptura é formado por centenas de pessoas comprometidas com a transformação social, unidas
                  para construir um futuro melhor.
                </p>
                <p>Ao juntar-te, podes:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Participar nas assembleias e grupos de trabalho do coletivo</li>
                  <li>Envolver-te em campanhas sobre temas que te interessam</li>
                  <li>Contribuir com as tuas ideias e propostas</li>
                  <li>Aceder a formações e materiais exclusivos</li>
                  <li>Fazer parte de uma comunidade comprometida com a mudança social</li>
                </ul>
              </div>

              <div className="mt-8 relative h-64 overflow-hidden rounded-lg md:h-80">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Membros do coletivo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-8 rounded-lg bg-red-50 p-6">
                <h3 className="font-heading text-xl font-bold text-gray-900">Já és membro?</h3>
                <p className="mt-2 text-gray-600">
                  Se já és membro do Coletivo Ruptura, podes aceder à área de membros para participar nas atividades e
                  recursos exclusivos.
                </p>
                <div className="mt-4">
                  <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-100">
                    <Link href="/members">Área de Membros</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Formulário de Adesão</CardTitle>
                  <CardDescription>Preenche o formulário abaixo para te juntares ao Coletivo Ruptura</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          placeholder="O teu nome completo"
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
                          placeholder="teu@email.com"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="912 345 678"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="address">Morada</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formState.address}
                          onChange={handleChange}
                          placeholder="A tua morada"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formState.city}
                            onChange={handleChange}
                            placeholder="A tua cidade"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="postalCode">Código Postal</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formState.postalCode}
                            onChange={handleChange}
                            placeholder="1000-000"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          name="birthDate"
                          type="date"
                          value={formState.birthDate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="reason">Porque queres juntar-te ao Coletivo Ruptura?</Label>
                        <Textarea
                          id="reason"
                          name="reason"
                          value={formState.reason}
                          onChange={handleChange}
                          placeholder="Partilha as tuas motivações..."
                          rows={3}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="interests">Áreas de interesse</Label>
                        <Textarea
                          id="interests"
                          name="interests"
                          value={formState.interests}
                          onChange={handleChange}
                          placeholder="Em que áreas gostarias de colaborar..."
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formState.newsletter}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Quero receber a newsletter e informações sobre atividades do Coletivo Ruptura
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
                      Enviar Pedido de Adesão
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
