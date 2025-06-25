import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

export function useAgentQA(agent_id: string | null, fetchAgentQAs: () => Promise<void>) {
  const [loading, setLoading] = useState(false);

  const handleAddQA = async (question: string, answer: string, onSuccess?: () => void) => {
    if (!question.trim() || !answer.trim() || !agent_id) return;

    try {
      setLoading(true);

      const { data: existingData, error: fetchError } = await supabase
        .from('agent_training_data')
        .select('id, short_questions, short_answer')
        .eq('agent_id', agent_id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      const normalizedNewQuestion = question.trim().toLowerCase();
      const normalizedNewAnswer = answer.trim().toLowerCase();

      const newQuestionFormatted = `- ${question.trim()}`;
      const newAnswerFormatted = `- ${answer.trim()}`;

      const existingQuestionsArray = existingData?.short_questions
        ?.split('\n')
        .map(q => q.replace(/^-/, '').trim().toLowerCase()) || [];

      const existingAnswersArray = existingData?.short_answer
        ?.split('\n')
        .map(a => a.replace(/^-/, '').trim().toLowerCase()) || [];

      const questionExists = existingQuestionsArray.includes(normalizedNewQuestion);
      const answerExists = existingAnswersArray.includes(normalizedNewAnswer);

      if (questionExists && answerExists) {
        toast({
          title: "Pergunta e resposta já cadastradas",
          description: "Essa combinação já foi registrada anteriormente.",
        });
        return;
      }

      if (existingData) {
        const updatedQuestions = questionExists
          ? existingData.short_questions
          : `${existingData.short_questions?.trim() || ''}\n${newQuestionFormatted}`;

        const updatedAnswers = answerExists
          ? existingData.short_answer
          : `${existingData.short_answer?.trim() || ''}\n${newAnswerFormatted}`;

        const { error: updateError } = await supabase
          .from('agent_training_data')
          .update({
            short_questions: updatedQuestions,
            short_answer: updatedAnswers,
          })
          .eq('agent_id', agent_id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('agent_training_data')
          .insert({
            agent_id,
            short_questions: newQuestionFormatted,
            short_answer: newAnswerFormatted,
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Pergunta adicionada!",
        description: "A pergunta e resposta foram salvas com sucesso.",
      });

      await fetchAgentQAs();
      onSuccess?.();

    } catch (error) {
      console.error("Erro ao adicionar QA:", error);
      toast({ title: "Erro", description: "Não foi possível salvar a pergunta e resposta." });
    } finally {
      setLoading(false);
    }
  };

  const handleEditQA = async (index: number, question: string, answer: string) => {
    if (!agent_id) return;
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('agent_training_data')
        .select('short_questions, short_answer')
        .eq('agent_id', agent_id)
        .single();

      if (error) throw error;

      const questionsArray = data.short_questions?.split('\n- ').filter(Boolean).map(q => q.trim()) || [];
      const answersArray = data.short_answer?.split('\n- ').filter(Boolean).map(a => a.trim()) || [];

      questionsArray[index] = question.trim();
      answersArray[index] = answer.trim();

      const updatedQuestions = questionsArray.map(q => `- ${q}`).join('\n');
      const updatedAnswers = answersArray.map(a => `- ${a}`).join('\n');

      const { error: updateError } = await supabase
        .from('agent_training_data')
        .update({
          short_questions: updatedQuestions,
          short_answer: updatedAnswers,
        })
        .eq('agent_id', agent_id);

      if (updateError) throw updateError;

      toast({
        title: "Pergunta atualizada!",
        description: "A pergunta e resposta foram atualizadas com sucesso.",
      });

      await fetchAgentQAs();

    } catch (error) {
      console.error("Erro ao editar QA:", error);
      toast({ title: "Erro", description: "Não foi possível editar a pergunta e resposta." });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveQA = async (index: number) => {
    if (!agent_id) return;

    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('agent_training_data')
        .select('short_questions, short_answer')
        .eq('agent_id', agent_id)
        .single();

      if (error) throw error;

      const questionsArray = data.short_questions?.split('\n- ').filter(Boolean).map(q => q.trim()) || [];
      const answersArray = data.short_answer?.split('\n- ').filter(Boolean).map(a => a.trim()) || [];

      questionsArray.splice(index, 1);
      answersArray.splice(index, 1);

      const updatedQuestions = questionsArray.map(q => `- ${q}`).join('\n');
      const updatedAnswers = answersArray.map(a => `- ${a}`).join('\n');

      const { error: updateError } = await supabase
        .from('agent_training_data')
        .update({
          short_questions: updatedQuestions,
          short_answer: updatedAnswers,
        })
        .eq('agent_id', agent_id);

      if (updateError) throw updateError;

      toast({
        title: "Pergunta removida!",
        description: "A pergunta e resposta foram removidas com sucesso.",
      });

      await fetchAgentQAs();

    } catch (error) {
      console.error("Erro ao remover QA:", error);
      toast({ title: "Erro", description: "Não foi possível remover a pergunta e resposta." });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleAddQA,
    handleEditQA,
    handleRemoveQA,
  };
}
