export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data;
}

export function getQuestionsFromLocalFile(examId, usedQuestionIds) {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const examData = require(`../Exams/exam${examId}.json`);

    const unusedQuestions = examData[0].questions
      .filter((question) => !usedQuestionIds[`exam${examId}`]
        .includes(question.questionId));
    if (unusedQuestions.length === 0) {
      console.warn('Você fez todas as questões.');
      usedQuestionIds[`exam${examId}`].length = 0;
    }
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const selectedQuestion = unusedQuestions[randomIndex];
    // Separa as respostas corretas e incorretas
    const { rightAnswer, alternatives, ...restOfQuestion } = selectedQuestion;
    const { questionId, question, image, questionYear } = restOfQuestion;
    // Mapeia as alternativas para o formato desejado
    const formattedAlternatives = alternatives.map((alternative) => ({
      id: alternative.id,
      description: alternative.description,
    }));
    const correctAnswer = formattedAlternatives
      .find((alternative) => alternative.id === rightAnswer);
    // Filtra as alternativas corretas e incorretas
    const incorrectAnswers = formattedAlternatives
      .filter((alternative) => alternative !== correctAnswer);
    // Retorna a questão no formato desejado
    const result = {
      results: [{
        questionId,
        question,
        correctAnswer: correctAnswer ? correctAnswer.description : '',
        incorrectAnswers: incorrectAnswers.map((alternative) => alternative.description),
        image: image || '',
        usedQuestionId: selectedQuestion.questionId,
        questionYear,
      }],
    };

    return result;
  } catch (error) {
    console.error('Erro ao obter as questões:', error);
    throw error;
  }
}
