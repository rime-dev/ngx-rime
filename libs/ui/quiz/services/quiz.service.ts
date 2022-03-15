import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Question, QuizMode} from '../models/quiz.model';

@Injectable()
export class QuizService {
  private mode$: BehaviorSubject<QuizMode> = new BehaviorSubject<QuizMode>('exam');
  private questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  getMode(): QuizMode {
    return this.mode$.value;
  }
  setMode(value: QuizMode): void {
    this.mode$.next(value);
  }
  getQuestions(): Question[] {
    return this.questions$.value;
  }
  setQuestions(value: Question[]): void {
    this.questions$.next(value);
  }
}
