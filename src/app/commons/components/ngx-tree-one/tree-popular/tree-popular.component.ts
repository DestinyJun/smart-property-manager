import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {TreeNode} from '../../api';
@Component({
  selector: 'app-tree-popular',
  templateUrl: './tree-popular.component.html',
  styleUrls: ['./tree-popular.component.scss']
})
export class TreePopularComponent implements OnInit, OnChanges {
  @ViewChild ('treePopular', {static: true}) treePopular;
  @Input() trees: TreeNode[];
  @Output() selected = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.trees) {
      this.treePopular.nativeElement.innerHTML = '';
      this.treePopular.nativeElement.appendChild(this.createHtml(this.trees), this.createHtml(this.trees));
    }
  }
  public createHtml(data: any): any {
    const that = this;
    const ul = document.createElement('ul');
    ul.className = 'list-group';
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement('li');
      const ele_div = document.createElement('div');
      const ele_i = document.createElement('i');
      const ele_span = document.createElement('span');
      const line_span = document.createElement('span');
      ele_i.className = `fa fa-sort-desc`;
      ele_span.innerText = data[i].name;
      line_span.innerText = '——';
      line_span.style.color = '#A3C0D4';
      ele_div.appendChild(line_span);
      ele_div.appendChild(ele_i);
      ele_div.appendChild(ele_span);
      li.className = 'list-group-item';
      if (data[i].styleClass) {
        li.className += `${data[i].styleClass}`;
      }
      li.appendChild(ele_div);
      ele_div.addEventListener('click', function (e) {
        e.stopPropagation();
        const div_list = that.treePopular.nativeElement.querySelectorAll('div');
        for (let j = 0; j < div_list.length; j++){
          div_list[j].style.color = 'black ';
          div_list[j].style.background = '';
        }
        this.style.color = 'white ';
        this.style.background = 'cornflowerblue';
        that.selected.emit(data[i]);
      });
      ele_i.addEventListener('click', function (e) {
        e.stopPropagation();
        const siblings = this['parentNode']['parentNode'].children[1];
        if (siblings) {
          siblings.toggleAttribute('hidden');
          if (data[i].children.length !== 0) {
            if (siblings.getAttribute('hidden') === null) {
              ele_i.style.lineHeight = `0`;
              ele_i.style.transform = `rotate(-90deg)`;
            } else {
              ele_i.style.transform = `rotate(0deg)`;
              ele_i.style.lineHeight = `20px`;
            }
          }
        }
      });
      ul.appendChild(li);
      if (data[i].children && data[i].length !== 0) {
        const a = this.createHtml(data[i].children);
        li.appendChild(a);
        const child_ul = li.children[1];
        child_ul.setAttribute('hidden', 'hidden');
      }
    }
    return ul;
  }
}
