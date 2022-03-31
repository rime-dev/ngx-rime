export class RimeQuestion {
  public index?: number;
  public title: string;
  public options:RimeQuestionOption[];
  public dirty?: boolean;
  public type: RimeQuestionType;
  public tags: string[];
  public level: number;
  public answer?: number | boolean | string;
  public response?: number;

  constructor(question: RimeQuestion) {
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
            const option: RimeQuestionOption = {text: element, index};
            this.options.push(option);
            index++;
          }
        }
      }
    }
  }
}

export type RimeQuestionType = 'single' | 'boolean' | 'multiple';

export type RimeQuizMode = 'exam' | 'solution';
export interface RimeQuestionOption {
  parentQuestion?: RimeQuestion;
  index?: number;
  text: string;
  response?: boolean;
}
