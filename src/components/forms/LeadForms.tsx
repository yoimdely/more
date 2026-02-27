"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { sendLead } from "@/lib/sendLead";

export function HeroLeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    try {
      await sendLead({
        name,
        phone,
        source: "cta",
        message: "Главный CTA: узнать о скидках",
        hp,
      });
      setName("");
      setPhone("");
      alert("Спасибо! Заявка отправлена.");
    } catch (error) {
      console.error("Failed to send lead", error);
      alert("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={hp}
        onChange={(event) => setHp(event.target.value)}
      />
      <div className="space-y-3 font-sans text-slate-900">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Ваше имя
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Александр"
          className="w-full h-20 px-10 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none font-bold text-slate-950 transition-all text-xl placeholder:text-slate-300"
        />
      </div>
      <div className="space-y-3 font-sans text-slate-900">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
          Телефон
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+7 (___) ___-__-__"
          className="w-full h-20 px-10 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none font-bold text-slate-950 transition-all text-xl placeholder:text-slate-300"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-24 text-xl md:text-2xl rounded-[2.5rem] bg-slate-950 hover:bg-brand-accent transition-all shadow-2xl font-black uppercase tracking-widest font-display"
      >
        {loading ? "Отправка..." : "Узнать о скидках"}
        <ArrowRight size={32} className="ml-4" />
      </Button>
    </form>
  );
}

export function PricePdfLeadForm() {
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!phone.trim()) return;

    setLoading(true);
    try {
      await sendLead({
        phone,
        source: "cta",
        message: "Запрос PDF прайс-листа",
        hp,
      });
      setPhone("");
      alert("Спасибо! Заявка отправлена.");
    } catch (error) {
      console.error("Failed to send lead", error);
      alert("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        value={hp}
        onChange={(event) => setHp(event.target.value)}
      />
      <input
        type="tel"
        required
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="+7 (___) ___-__-__"
        className="w-full h-16 px-8 bg-white/5 border border-white/10 rounded-2xl focus:ring-4 focus:ring-brand-accent/20 outline-none transition-all font-bold text-white placeholder:text-slate-600"
      />
      <Button className="w-full h-16 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover shadow-2xl shadow-brand-accent/20" type="submit" disabled={loading}>
        {loading ? "Отправка..." : "Скачать PDF"}
        <ArrowRight size={20} />
      </Button>
    </form>
  );
}
