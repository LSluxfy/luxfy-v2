import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface TrainingData {
  about: string;
  products_services: string;
  faq: string;
}

export function useAgentTraining() {
  const { toast } = useToast();

  async function trainAgent(agent_id: string, trainingData: TrainingData) {
    const { about, products_services, faq } = trainingData;

    try {
      const { data: existingData, error: fetchError } = await supabase
        .from("agent_training_data")
        .select("about, products_services, faq")
        .eq("agent_id", agent_id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      const concatText = (oldText: string | null | undefined, newText: string) => {
        if (!oldText || oldText.trim() === "") return newText;
        if (!newText || newText.trim() === "") return oldText;
        return `${oldText.trim()},${newText.trim()}`;
      };

      const newAbout = concatText(existingData?.about, about);
      const newProductsServices = concatText(existingData?.products_services, products_services);
      const newFaq = concatText(existingData?.faq, faq);

      if (!existingData) {
        const { error: insertError } = await supabase
          .from("agent_training_data")
          .upsert({ agent_id, about, products_services, faq });

        if (insertError) throw insertError;

        toast({ title: "Sucesso!", description: "Agente treinado com sucesso!" });
        return;
      }

      const { error: updateError } = await supabase
        .from("agent_training_data")
        .update({ about: newAbout, products_services: newProductsServices, faq: newFaq })
        .eq("agent_id", agent_id);

      if (updateError) throw updateError;

      toast({ title: "Sucesso!", description: "Agente treinado com sucesso!" });
    } catch (error) {
      console.error("Erro ao treinar agente:", error);
      toast({ title: "Erro", description: "Ocorreu um erro ao salvar o treinamento!" });
    }
  }

  return { trainAgent };
}
