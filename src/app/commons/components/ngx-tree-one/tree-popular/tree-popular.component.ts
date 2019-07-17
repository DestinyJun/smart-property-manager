import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {TreeNode} from '../../api';
@Component({
  selector: 'app-tree-popular',
  templateUrl: './tree-popular.component.html',
  styleUrls: ['./tree-popular.component.scss']
})
export class TreePopularComponent implements OnInit, OnChanges {
  @ViewChild ('treePopular', {static: true}) treePopular;
  @Input() trees: TreeNode[];
  constructor() { }

  ngOnInit() {}

  ngOnChanges(): void {
    if (this.trees) {
      this.treePopular.nativeElement.appendChild(this.createHtml(this.trees));
    }
  }
  public createHtml(data: any): any {
    const ul = document.createElement('ul');
    ul.className = 'list-group';
    for (let i = 0; i < data.length; i++) {
      const li = document.createElement('li');
      const ele_div = document.createElement('div');
      const ele_i = document.createElement('i');
      const ele_span = document.createElement('span');
      ele_i.className = `fa fa-sort-desc`;
      ele_span.innerText = data[i].name;
      ele_div.appendChild(ele_i);
      ele_div.appendChild(ele_span);
      li.className = 'list-group-item';
      if (data[i].styleClass) {
        li.className += `${data[i].styleClass}`;
      }
      li.appendChild(ele_div);
      ele_div.onclick = function(e) {
        e.stopPropagation();
        console.log(data[i]);
      };
      ele_i.onclick = function (e) {
        e.stopPropagation();
        const siblings = this['parentNode']['parentNode'].children[1];
        if (siblings) {
          siblings.toggleAttribute('hidden');
        }
      };
      ul.appendChild(li);
      if (data[i].children && data[i].length !== 0) {
        const a = this.createHtml(data[i].children);
        li.appendChild(a);
      }
    }
    return ul;
  }
}
