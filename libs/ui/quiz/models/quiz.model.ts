export class Question {
  public index?: number;
  public title: string;
  public options: QuestionOption[];
  public dirty?: boolean;
  public type: QuestionType;
  public tags: string[];
  public level: number;
  public answer?: any;
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
      this.options = question.options;
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

export interface QuestionOption {
  index?: number;
  text: string;
  response?: boolean;
}
