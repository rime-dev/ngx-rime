import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RimeQuestion, RimeQuizMode} from '../models/quiz.model';

@Injectable()
export class RimeQuizService {
  private mode$: BehaviorSubject<RimeQuizMode> = new BehaviorSubject<RimeQuizMode>('exam');
  private questions$: BehaviorSubject<RimeQuestion[]> = new BehaviorSubject<RimeQuestion[]>([]);
  getMode(): RimeQuizMode {
    return this.mode$.value;
  }
  setMode(value: RimeQuizMode): void {
    this.mode$.next(value);
  }
  getQuestions(): RimeQuestion[] {
    return this.questions$.value;
  }
  setQuestions(value: RimeQuestion[]): void {
    this.questions$.next(value);
  }
}
