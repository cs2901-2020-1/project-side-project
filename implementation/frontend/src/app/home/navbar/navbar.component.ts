import { Renderer2, Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document) { }

  public ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.text = `
      var  nav = document.getElementById('nav');
      var h = 80;

      window.onscroll = function(){
        if (window.pageYOffset > h) {
            nav.style.background = "linear-gradient(to left, #8942a8, #ba382f)";
            nav.style.boxShadow = "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)";
        } else{
            nav.style.background = "transparent";
            nav.style.boxShadow = "none";
        }
      }`;

    this._renderer2.appendChild(this._document.body, script);
  }
  
  redirect(fragment: string): void {
    document.querySelector('#' + fragment).scrollIntoView({behavior: "smooth"});
  }
}
