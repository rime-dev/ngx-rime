export class Question {
  public index?: number;
  public title: string;
  public options: QuestionOption[];
  public dirty?: boolean;
  public type: QuestionType;
  public tags: string[];
  public level: number;
  public answer?: number | boolean;
  public response?: number;

  constructor(question: Question) {
    this.index = question.index;
    this.title = question.title;
    this.dirty = question.dirty;
    this.type = question.type;
    this.tags = question.tags;
    this.level = question.level;
    this.answer = question.answer;
    this.response = question.response;
    if (question.options) {
      if (!question.options[0].text) {
        const options = question.options
          .filter((option0) => option0 !== null && option0 !== undefined)
          .map((option0, index: number) => {
            const option1 = {text: option0 as unknown as string, index};
            return option1;
          });
        this.options = options;
      } else {
        this.options = question.options;
      }
    } else {
      this.options = [];
      let index = 0;
      for (const key in question) {
        if (Object.prototype.hasOwnProperty.call(question, key)) {
          const element = question[key as never];
          if (key.includes('option') && element !== null && element !== undefined) {
            const option: QuestionOption = {text: element, index};
            this.options.push(option);
            index++;
          }
        }
      }
    }
  }
}

export type QuestionType = 'single' | 'boolean' | 'multiple';

export type QuizMode = 'exam' | 'solution';
export interface QuestionOption {
  parentQuestion?: Question;
  index?: number;
  text: string;
  response?: boolean;
}
