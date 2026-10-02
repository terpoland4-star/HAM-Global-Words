export const QUOTE_STATUSES = [
  { value: "pending", label: "⏳ En attente" },
  { value: "contacted", label: "📞 Contacté" },
  { value: "sent", label: "✅ Envoyé" },
  { value: "closed", label: "🔒 Clôturé" },
];

export const PROJECT_STATUSES = [
  { value: "pending", label: "⏳ En attente" },
  { value: "in_progress", label: "🚧 En cours" },
  { value: "completed", label: "✅ Terminé" },
  { value: "cancelled", label: "❌ Annulé" },
];

export function quoteStatusLabel(status: string) {
  return QUOTE_STATUSES.find((s) => s.value === status)?.label ?? status;
}
