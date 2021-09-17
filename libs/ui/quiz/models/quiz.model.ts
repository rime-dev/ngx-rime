export interface Question {
  index?: number;
  title: string;
  options: QuestionOption[];
  dirty?: boolean;
}

export interface QuestionOption {
  index?: number;
  text: string;
  state: boolean;
  response?: boolean;
}
