import {AfterViewInit, Component, ElementRef, Input, OnChanges} from '@angular/core';
import {curveMonotoneX, extent, line, max, min, scaleLinear, scaleTime, select} from 'd3';
@Component({
  selector: 'rng-earnings-chart',
  templateUrl: './earnings-chart.component.html',
  styleUrls: ['./earnings-chart.component.scss'],
})
export class EarningsChartComponent implements AfterViewInit, OnChanges {
  @Input() public data: any = [];

  private margin = 10;
  private height = 0;
  private width = 0;
  public svg: any;
  public svgInner: any;
  public yScale: any;
  public xScale: any;
  public xAxis: any;
  public yAxis: any;
  public lineGroup: any;
  public constructor(public chartElem: ElementRef) {}
  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('data') && this.data) {
      this.initializeChart();
      this.drawChart();
    }
  }
  ngAfterViewInit(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.height = this.chartElem.nativeElement.getBoundingClientRect().height;
    this.initializeChart();
    this.drawChart();
  }
  private initializeChart(): void {
    select(this.chartElem.nativeElement).select('.linechart').select('svg').remove();
    this.svg = select(this.chartElem.nativeElement)
      .select('.linechart')
      .append('svg')
      .attr('height', this.height);
    this.svgInner = this.svg
      .append('g')
      .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');
    const maxValue = Number(max(this.data, (d: any) => d.value));
    const minValue = Number(min(this.data, (d: any) => d.value));
    const domainArray = [maxValue + 1, minValue - 1];
    this.yScale = scaleLinear()
      .domain(domainArray)
      .range([0, this.height - 2 * this.margin]);

    this.xScale = scaleTime().domain(extent(this.data, (d: any) => new Date(d.date)) as any);
    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', '#39d353')
      .style('stroke-width', '2px');
  }

  private drawChart(): void {
    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.height = this.chartElem.nativeElement.getBoundingClientRect().height;
    this.svg.attr('width', this.width);
    this.svg.attr('height', this.height);

    this.xScale.range([this.margin, this.width - 2 * this.margin]);
    const lineBase = line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curveMonotoneX);
    const points: [number, number][] = this.data.map((d: any) => [
      this.xScale(new Date(d.date)),
      this.yScale(d.value),
    ]);
    this.lineGroup.attr('d', lineBase(points));
  }
}
