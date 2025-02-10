import { NextResponse } from 'next/server';
import { graphql, buildSchema } from 'graphql';
import questionsData from '@/config/questions.json';

const schema = buildSchema(`
  type Option {
    id: String
    text: String
    isCorrect: Boolean
  }

  type Question {
    id: Int
    step: Int
    text: String
    options: [Option]
    prize: Int
    type: String
  }

  type Query {
    questions: [Question]
  }
`);

const root = {
  questions: () => questionsData.questions,
};

export async function POST(request: Request) {
  const { query, variables } = await request.json();
  const result = await graphql({
    schema,
    source: query,
    rootValue: root,
    variableValues: variables,
  });
  return NextResponse.json(result);
}
