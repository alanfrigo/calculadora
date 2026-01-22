import { WebhookSecretsForm } from "@/components/generators/WebhookSecretsForm";

export default function WebhookSecretsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Gerador de Webhook Secrets
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Gere secrets seguros para verificação de assinaturas de webhook
        </p>
      </div>
      <WebhookSecretsForm />
    </div>
  );
}
